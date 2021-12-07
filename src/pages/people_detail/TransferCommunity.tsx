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
import { HotelType } from './receive';

export default function TransferCommunity(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [transferType, setTransferType] = useState('居家隔离'); //转运方式
  const [subDistrict, setSubDistrict] = useState(''); //所属街道
  const [homeQuarantineHotelList, setHomeQuarantineHotelList] =
    useState<HotelType[]>(); //居家隔离酒店列表
  const [homeHotel, setHomeHotel] = useState(''); //选择后的居家隔离酒店
  const [hotelSubDistrict, setHotelSubDistrict] = useState(''); //对应酒店的街道信息

  const handleSubmit = (e: any) => {
    e.preventDefault();
    //TODO: //调用接口
  };

  //设置列表
  const handleChange = async (e: any) => {
    setTransferType(e.target.value); //改变转运方式
    if (e.target.value === '居家隔离酒店') {
      //TODO: //获取居家隔离酒店列表
      const res = await getHotelList(); //获取酒店列表
      if (res.code === 200) {
        //TODO: //增加属性字段判断是否为居家隔离酒店，然后筛选
        setHomeQuarantineHotelList(res.data);
      }
    }
  };

  //处理对应酒店街道
  const handleHotel = async (e: any) => {
    setHomeHotel(e.target.value); //设置选择的居家隔离酒店
    homeQuarantineHotelList?.map((item: any) => {
      if (item.name === e.target.value) {
        setHotelSubDistrict(item.address); //设置街道信息TODO:无属性
      }
    });
  };
  //初始化
  const Init = async () => {
    const res = await getResidentInfo(param.id); //获取人员属性
    if (res.code === 200) {
      res.data.map((item: any) => {
        if (item.key === 'sub_district') {
          setSubDistrict(item.value);
        }
      });
    }
  };
  useEffect(() => {
    Init();
  }, []);
  return (
    <Page title="转运社区">
      <form onSubmit={handleSubmit}>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>转运方式</InputLabel>
            <FormControl fullWidth>
              <Select
                name="transfer_type"
                value={transferType}
                native
                onChange={handleChange}
              >
                <option value="居家隔离">居家隔离</option>
                <option value="居家隔离酒店">居家隔离酒店</option>
              </Select>
            </FormControl>
          </Box>
        </Paper>
        {transferType === '居家隔离酒店' && (
          <Paper elevation={0} square>
            <Box marginY={1.5} padding={1.5}>
              <InputLabel>选择居家隔离酒店</InputLabel>
              <FormControl fullWidth>
                <Select
                  name="home_hotel"
                  value={homeHotel}
                  onChange={handleHotel}
                >
                  {homeQuarantineHotelList?.map((item: any) => {
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
        )}
        {transferType === '居家隔离' ? (
          <Paper elevation={0} square>
            <Box marginY={1.5} padding={1.5}>
              <InputLabel>所属街道</InputLabel>
              <FormControl fullWidth>
                <Input value={subDistrict} disabled></Input>
              </FormControl>
            </Box>
          </Paper>
        ) : (
          <Paper elevation={0} square>
            <Box marginY={1.5} padding={1.5}>
              <InputLabel>当前酒店所属街道</InputLabel>
              <FormControl fullWidth>
                <Input value={hotelSubDistrict} disabled></Input>
              </FormControl>
            </Box>
          </Paper>
        )}
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
            >
              通知街道遣送
            </Button>
          </Box>
        </Paper>
      </form>
    </Page>
  );
}
