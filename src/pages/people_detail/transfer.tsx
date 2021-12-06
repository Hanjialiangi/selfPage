import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Paper,
  Button,
  FormControl,
  Select,
  Typography
} from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import {
  getHotelReceive,
  getHotelList,
  getResidentInfo,
  getCommunityReceive
} from '@src/api';
import { useParams } from 'react-router-dom';
import { dingAlert } from '@src/dingtalkAPI';
import moment from 'moment';
import { getURL } from '@src/utils';

export default function Arrive(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [time, setTime] = useState<string>(''); //获取初始时间
  const [releaseTime, setReleaseTime] = useState(''); //获取接触时间
  const [hotelList, setHotelList] = useState<any>([]); //酒店列表
  const [select, setSelect] = useState(''); //选中值
  const [isCommunity, setIsCommunity] = useState(false); //社区
  const [Available_number, setAvailable_number] = useState(0); //可使用房间数量
  const [IsSend, setIsSend] = useState(false);
  //点击接收功能
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (select && !isCommunity) {
      const hotel_name = formData.get('hotel_name') + '';
      const room = formData.get('room') + '';
      const finalTime = moment(time).format('YYYY-MM-DD HH:mm:ss');
      const finalReleaseTime = moment(releaseTime).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      const formvalue = {
        hotel_name,
        room,
        time: finalTime,
        releaseTime: finalReleaseTime
      };
      const res = await getHotelReceive(param.id, formvalue);
      if (res.code === 200) {
        dingAlert('接收成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      } else {
        dingAlert('接收失败', '错误', '确认');
      }
    } else {
      const res = await getCommunityReceive(param.id, time);
      if (res.code === 200) {
        dingAlert('社区接收成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      } else {
        dingAlert('接收失败', '错误', '确认');
      }
    }
  };
  const Init = async () => {
    const res = await getResidentInfo(param.id);
    if (res.code === 200) {
      res.data.map((item: any) => {
        if (item.key === 'current_state') {
          if (item.value === '转运至社区中') {
            setIsCommunity(true); //社区接收(接收)
          }
        }
        if (item.key === 'planned_quarantine_hotel') {
          if (item.value) {
            setSelect(item.value); //酒店接收
          }
        }
        // if (item.key === 'quarantine_hotel') {
        //   if (item.value) {
        //     setIsCommunity(true); //社区接收(二次接收)
        //   }
        // }
      });
    }
  };

  useEffect(() => {
    setTime(moment().format('YYYY-MM-DDTHH:mm'));
    setReleaseTime(moment().add(14, 'days').format('YYYY-MM-DDTHH:mm')); //14天后时间
    Init();
  }, []);

  //获取酒店列表
  const gainHotel = async () => {
    const res = await getHotelList();
    if (res.code === 200) {
      setHotelList(res.data);
    }
  };
  //点击更新、判断剩余房间数和
  const handleChange = (e: any) => {
    setSelect(e.target.value);
    for (let i = 0; i < hotelList.length; i++) {
      if (hotelList[i].name === e.target.value) {
        setAvailable_number(hotelList[i].available_number);
        if (hotelList[i].available_number === 0) {
          setIsSend(true);
        }
      }
    }
  };

  useEffect(() => {
    gainHotel();
  }, []);

  return (
    <Page title="接收并开始隔离">
      <form
        noValidate
        autoComplete="off"
        style={{ paddingBottom: '10px' }}
        onSubmit={handleSubmit}
      >
        <>
          <Paper elevation={0} square>
            <Box marginY={1.5} padding={1.5}>
              <InputLabel>转运酒店地址</InputLabel>
              <FormControl fullWidth>
                <Select
                  name="hotel_name"
                  value={select}
                  native
                  onChange={handleChange}
                >
                  <option aria-label="None" value="">
                    无
                  </option>
                  {hotelList?.map((item: any) => {
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
              <InputLabel>预计隔离酒店剩余房间数</InputLabel>
              <FormControl fullWidth>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  {Available_number}
                </Typography>
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
                disabled={IsSend}
                fullWidth
              >
                确认转运
              </Button>
            </Box>
          </Paper>
          <a href="/detail/feedback/:id/edit">出现问题？点击反馈</a>
        </>
      </form>
    </Page>
  );
}
