import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Input, FormControl } from '@material-ui/core';
import { InputLabel, TextField } from '@material-ui/core';
import {
  getHotelReceive,
  getResidentInfo,
  getCommunityReceive,
  homeHotelRecieve
} from '@src/api';
import { useParams } from 'react-router-dom';
import { dingAlert } from '@src/dingtalkAPI';
import moment from 'moment';
import { getURL, judgeRole } from '@src/utils';
import { userInfoSelector } from '@src/redux/selectors';
import { useSelector } from 'react-redux';

export default function Arrive(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  const role = judgeRole(userInfo.role);

  const param: { id: string } = useParams(); //获取路由参数
  const [time, setTime] = useState<string>(''); //获取初始时间
  const [releaseTime, setReleaseTime] = useState(''); //获取接触时间
  const [select, setSelect] = useState(''); //选中值
  const [Type, setType] = useState(''); //类型值
  const [homeHotel, setHomeHotel] = useState(''); //居家隔离酒店
  //点击接收功能
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (select && Type === '转运至酒店中') {
      const hotel_name = select;
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
        dingAlert('酒店接收成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      } else {
        dingAlert('接收失败', '错误', '确认');
      }
    } else if (Type === '转运至社区中') {
      const res = await getCommunityReceive(param.id, time);
      if (res.code === 200) {
        dingAlert('社区接收成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      } else {
        dingAlert('接收失败', '错误', '确认');
      }
    } else if (Type === '转运至居家隔离酒店中') {
      const res = await homeHotelRecieve(param.id, homeHotel, time, role);
      if (res.code === 200) {
        dingAlert('居家隔离酒店接收成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      } else {
        dingAlert('接收失败', '错误', '确认');
      }
    }
  };
  const Init = async () => {
    const res = await getResidentInfo(param.id, role);
    if (res.code === 200) {
      res.data.map((item: any) => {
        if (item.key === 'current_state') {
          setType(item.value); //设置类型
        }
        if (item.key === 'planned_quarantine_hotel') {
          if (item.value) {
            setSelect(item.value); //酒店接收
          }
        }
        if (item.key === 'home_quarantine_hotel') {
          if (item.value) {
            setHomeHotel(item.value); //设置居家隔离酒店
          }
        }
      });
    }
  };

  useEffect(() => {
    setTime(moment().format('YYYY-MM-DDTHH:mm'));
    setReleaseTime(moment().add(14, 'days').format('YYYY-MM-DDTHH:mm')); //14天后时间
    Init();
  }, []);

  return (
    <Page title="接收并开始隔离">
      <form
        noValidate
        autoComplete="off"
        style={{ paddingBottom: '10px' }}
        onSubmit={handleSubmit}
      >
        {Type === '转运至酒店中' ? (
          <>
            <Paper elevation={0} square>
              <Box padding={1.5}>
                <InputLabel>
                  <span style={{ color: '#1790FF' }}>*</span>接收酒店地址
                </InputLabel>
                <FormControl fullWidth>
                  <Input name="hotel_name" value={select} disabled />
                </FormControl>
              </Box>
            </Paper>
            <Paper elevation={0} square>
              <Box marginY={0.2} padding={1.5}>
                <InputLabel>
                  <span style={{ color: '#1790FF' }}>*</span>接收时间
                </InputLabel>
                <FormControl fullWidth>
                  {/* <input
                    type="datetime-local"
                    onChange={(e: any) => {
                      setTime(e.target.value);
                      setReleaseTime(
                        moment(e.target.value)
                          .add(14, 'days')
                          .format('YYYY-MM-DDTHH:mm')
                      );
                    }}
                    value={time}
                  /> */}
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    onChange={(e: any) => {
                      setTime(e.target.value);
                      setReleaseTime(
                        moment(e.target.value)
                          .add(14, 'days')
                          .format('YYYY-MM-DDTHH:mm')
                      );
                    }}
                    value={time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Box>
            </Paper>
            <Paper elevation={0} square>
              <Box marginY={0.2} padding={1.5}>
                <InputLabel>
                  <span style={{ color: '#1790FF' }}>*</span>隔离房间号
                </InputLabel>
                <FormControl fullWidth>
                  <Input
                    name="room"
                    placeholder="请填写隔离房间号"
                    minRows={2}
                    maxRows={600}
                    disableUnderline
                    multiline
                  />
                </FormControl>
              </Box>
            </Paper>
            <Paper elevation={0} square>
              <Box marginY={0.2} padding={1.5}>
                <InputLabel>
                  <span style={{ color: '#1790FF' }}>*</span>预计解除隔离时间
                </InputLabel>
                <FormControl fullWidth>
                  {/* <input
                    type="datetime-local"
                    value={releaseTime}
                    onChange={(e: any) => {
                      setReleaseTime(e.target.value);
                    }}
                  /> */}
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    onChange={(e: any) => {
                      setReleaseTime(e.target.value);
                    }}
                    value={releaseTime}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Box>
            </Paper>
            <Box marginY={0.2} padding={1.5} marginTop={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
                style={{
                  background: '#1790FF',
                  color: '#FFFFFF',
                  height: '47px'
                }}
                fullWidth
              >
                确认隔离
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Paper elevation={0} square>
              <Box marginY={0.2} padding={1.5}>
                <InputLabel>
                  <span style={{ color: '#1790FF' }}>*</span>
                  {Type === '转运至社区中'
                    ? '社区接收时间'
                    : '居家隔离酒店接收时间'}
                </InputLabel>
                <FormControl fullWidth>
                  {/* <input
                    type="datetime-local"
                    onChange={(e: any) => {
                      setTime(e.target.value);
                    }}
                    value={time}
                  /> */}
                  <TextField
                    id="datetime-local"
                    type="datetime-local"
                    onChange={(e: any) => {
                      setTime(e.target.value);
                    }}
                    value={time}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </FormControl>
              </Box>
            </Paper>
            <Paper elevation={0} square>
              <Box marginY={0.2} padding={1.5} marginTop={4}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disableElevation
                  style={{
                    background: '#1790FF',
                    color: '#FFFFFF',
                    height: '47px'
                  }}
                  fullWidth
                >
                  确认隔离
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </form>
    </Page>
  );
}
