import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Paper,
  Button,
  Input,
  FormControl,
  Select,
  InputLabel
} from '@material-ui/core';
import { useParams } from 'react-router';
import { getHotelList, getResidentInfo } from '@src/api';

export interface HotelType {
  address: string;
  available_number: number;
  capacity: number;
  created_at: string;
  id: number;
  name: string;
  quarantine_number: number;
  requested_number: number;
  updated_at: string;
}
export default function ReceivePage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [hotel, setHotel] = useState(''); //初始化计划酒店选择
  const [hotelList, setHotelList] = useState([]); //初始化酒店列表
  const [available, setAvailable] = useState(0); //对应酒店剩余容量
  const [clickable, setClickable] = useState(false); //按钮可点击

  //改变选中值
  const handleChange = (e: any) => {
    setHotel(e.target.value); //设置当前酒店
    installCapacity(hotelList, e.target.value);
  };

  //提交动作
  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: 使用接口去通知酒店接受(open_id,hotel_name)
  };

  //设置剩余容量
  /**
   *
   * @param data 酒店列表
   * @param value 当前选择下酒店
   */
  const installCapacity = (data: Array<HotelType>, value: string) => {
    data.map((item: any) => {
      if (item.name === value) {
        item.available_number && setAvailable(item.available_number);

        if (item.available_number > 0) {
          setClickable(true);
        }
      }
    });
  };
  //初始化
  const Init = async () => {
    let middleWare = '';
    const res = await getResidentInfo(param.id); //获取人员属性信息
    if (res.code === 200) {
      res.data.map(async (item: any) => {
        if (item.key === 'planned_quarantine_hotel') {
          if (item.value) {
            setHotel(item.value);
            middleWare = item.value; //中间酒店值
          }
        }
      });
    }
    const result = await getHotelList(); //获取酒店列表
    if (result.code === 200) {
      setHotelList(result.data);
      installCapacity(result.data, middleWare); //设置容量
    }
  };
  useEffect(() => {
    Init();
  }, []);

  return (
    <Page title="通知接收">
      <form onSubmit={handleSubmit}>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>隔离酒店</InputLabel>
            <FormControl fullWidth>
              <Select
                name="hotel_name"
                value={hotel}
                native
                onChange={handleChange}
              >
                {hotelList.map((item: any) => {
                  return (
                    <option value={item.name} key={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Paper>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>酒店剩余容量</InputLabel>
            <FormControl fullWidth>
              <Input
                name="available_number"
                value={available || 0}
                disabled
              ></Input>
            </FormControl>
          </Box>
        </Paper>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              disabled={!clickable}
            >
              通知酒店接收
            </Button>
          </Box>
        </Paper>
      </form>
    </Page>
  );
}
