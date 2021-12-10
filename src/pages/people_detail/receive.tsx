import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Paper,
  Button,
  Input,
  FormControl,
  InputLabel,
  Typography
} from '@material-ui/core';
import { useParams } from 'react-router';
import { getHotelList, getResidentInfo, updateState } from '@src/api';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';
import { userInfoSelector } from '@src/redux/selectors';
import { useSelector } from 'react-redux';
import { judgeRole } from '@src/utils';

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
  const userInfo = useSelector(userInfoSelector);
  const role = judgeRole(userInfo.role); //拆分数组
  const param: { id: string } = useParams(); //获取路由参数
  const [hotel, setHotel] = useState(''); //初始化计划酒店选择
  const [available, setAvailable] = useState(0); //对应酒店剩余容量
  const [show, setShow] = useState(false); //按钮展示

  //提交动作
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (hotel) {
      const res = await updateState(param.id, '转运至酒店中', role);
      if (res.code === 200) {
        dingAlert('转运成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      }
    }
  };

  //申请转酒店
  const handleTransfer = async () => {
    //TODO: //接口缺失
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
          setShow(true);
        }
      }
    });
  };
  //初始化
  const Init = async () => {
    let middleWare = '';
    const res = await getResidentInfo(param.id, role); //获取人员属性信息
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
            <InputLabel>预计隔离酒店</InputLabel>
            <FormControl fullWidth>
              <Input name="hotel_name" value={hotel} disabled />
            </FormControl>
          </Box>
        </Paper>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>酒店剩余容量</InputLabel>
            <FormControl fullWidth>
              <Typography variant="h5" style={{ textAlign: 'center' }}>
                {available}
              </Typography>
            </FormControl>
          </Box>
        </Paper>
        <Box marginY={1.5} padding={1.5}>
          {show ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              style={{
                background: '#1790FF',
                color: '#FFFFFF',
                height: '47px'
              }}
            >
              转运至酒店
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
              style={{
                background: '#1790FF',
                color: '#FFFFFF',
                height: '47px'
              }}
              onClick={handleTransfer}
            >
              申请转运至别的酒店
            </Button>
          )}
        </Box>
      </form>
    </Page>
  );
}
