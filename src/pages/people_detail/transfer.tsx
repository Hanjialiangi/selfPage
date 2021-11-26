import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

import {
  getHotelList,
  getResidentInfo,
  getTransferCommunity,
  getTransferHotel
} from '@src/api';
import { dingAlert } from '@src/dingtalkAPI';
import moment from 'moment';

export default function ExpertTransferOrder(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const param: { id: string } = useParams();
  const [type, setType] = useState(''); //隔离方式
  const [hotelList, setHotelList] = useState([]); //酒店列表
  const [hotel, setHotel] = useState(''); //选择的酒店

  const handleTransfer = async () => {
    if (hotel) {
      //送去酒店转运
      const res = await getTransferHotel(param.id, hotel);
      if (res.code === 200) {
        dingAlert('转运到酒店成功', '正确', '确认');
        window.location.href = `/detail/resident/${param.id}`;
      }
    } else {
      //转运社区
      const res = await getTransferCommunity(
        param.id,
        moment().format('YYYY-MM-DD HH:mm:ss')
      );
      if (res.code === 200) {
        dingAlert('转运到社区成功', '正确', '确认');
        window.location.href = `/detail/resident/${param.id}`;
      }
    }
  };

  //init
  const Init = async () => {
    const res = await getResidentInfo(param.id);
    if (res.code === 200) {
      res.data.map(async (item: any) => {
        if (item.key === 'resident_property') {
          if (item.value === '密接' || item.value === '次密接') {
            setType('集中隔离');
            const res = await getHotelList();
            if (res.code === 200) {
              setHotelList(res.data);
            }
          } else {
            setType('居家隔离');
          }
        }
      });
    }
  };
  useEffect(() => {
    Init(); //初始化
  }, []);

  return (
    <Page title="转运">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>隔离方式</InputLabel>
          <span
            style={{
              fontSize: '18px',
              display: 'flex',
              flexDirection: 'row-reverse'
            }}
          >
            {type}
          </span>
        </Box>
      </Paper>
      {type === '集中隔离' && (
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel required>选择隔离酒店</InputLabel>
            <Select
              value={hotel}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setHotel(e.target.value);
              }}
            >
              <option aria-label="None" value="">
                无
              </option>
              {hotelList.map((item: any) => {
                return (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </Box>
        </Paper>
      )}
      <Box marginY={1.5} padding={1.5}>
        <Button
          onClick={handleTransfer}
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
        >
          确认转运
        </Button>
      </Box>
    </Page>
  );
}
