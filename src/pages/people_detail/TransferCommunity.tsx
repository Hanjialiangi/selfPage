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
import {
  getHotelList,
  getResidentInfo,
  getServiceCenter,
  getSubDistrict,
  getTransferCommunity,
  transferHomeQuarantineHotel
} from '@src/api';
import { HotelType } from './receive';
import moment from 'moment';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';
import { userInfoSelector } from '@src/redux/selectors';
import { useSelector } from 'react-redux';
import { judgeRole } from '@src/utils';

export default function TransferCommunity(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  const role = judgeRole(userInfo.role); //拆分数组

  const param: { id: string } = useParams(); //获取路由参数
  const [transferType, setTransferType] = useState('居家隔离'); //转运方式
  const [subDistrict, setSubDistrict] = useState(''); //所属街道
  const [homeQuarantineHotelList, setHomeQuarantineHotelList] =
    useState<HotelType[]>(); //居家隔离酒店列表
  const [homeHotel, setHomeHotel] = useState(''); //选择后的居家隔离酒店
  // const [hotelSubDistrict, setHotelSubDistrict] = useState(''); //对应酒店的街道信息
  const [street, setStreet] = useState(''); //设置选择的街道
  const [subDistrictList, setSubDistrictList] = useState([]); //街道列表
  const [service, setService] = useState(''); //选择服务中心
  const [serviceList, setServiceList] = useState([]); //服务中心列表

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (transferType === '居家隔离') {
      const res = await getTransferCommunity(
        param.id,
        moment().format('YYYY-MM-DD HH:mm:ss')
      );
      if (res.code === 200) {
        dingAlert('通知成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      }
    } else {
      const res = await transferHomeQuarantineHotel(
        param.id,
        homeHotel,
        moment().format('YYYY_MM-DD HH:mm:ss'),
        role
      );
      if (res.code === 200) {
        dingAlert('通知成功', '正确', '确认');
        window.location.href = getURL(`/detail/resident/${param.id}`);
      }
    }
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
        setHomeHotel(res.data[0].name); //默认设置第一个
      }
    }
  };

  //处理对应酒店街道
  const handleHotel = async (e: any) => {
    setHomeHotel(e.target.value); //设置选择的居家隔离酒店
    // homeQuarantineHotelList?.map((item: any) => {
    //   if (item.name === e.target.value) {
    //     setHotelSubDistrict(item.address); //设置街道信息
    //   }
    // });
  };
  //处理街道
  const handleStreet = async (e: any) => {
    setStreet(e.target.value); //设置当前街道
    console.log(e.target.value);
    if (e.target.value) {
      console.log('sda');
      const res = await getServiceCenter(e.target.value); //获取服务中心
      if (res.code === 200) {
        setServiceList(res.data.data); //设置服务中心列表
        setService(res.data.data[0].name); //默认第一个
      }
    } else {
      setService(''); //置空
    }
  };

  //服务中心
  const handleService = async (e: any) => {
    setService(e.target.value); //设置选中的服务中心
  };

  //初始化
  const Init = async () => {
    const res = await getResidentInfo(param.id, role); //获取人员属性
    if (res.code === 200) {
      res.data.map((item: any) => {
        if (item.key === 'sub_district') {
          setSubDistrict(item.value); //单个街道列表
        }
      });
    }
    const resStreet = await getSubDistrict(); //获取街道列表
    if (resStreet.code === 200) {
      setSubDistrictList(resStreet.data.data); //设置街道列表
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
            <InputLabel>
              <span style={{ color: '#1790FF' }}>*</span>转运方式
            </InputLabel>
            <FormControl fullWidth>
              <Select
                name="transfer_type"
                value={transferType}
                native
                style={{ display: 'flex', borderBottom: '1px solid gray' }}
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
              <InputLabel>
                <span style={{ color: '#1790FF' }}>*</span>选择居家隔离酒店
              </InputLabel>
              <FormControl fullWidth>
                <Select
                  name="home_hotel"
                  value={homeHotel}
                  native
                  onChange={handleHotel}
                  style={{ display: 'flex', borderBottom: '1px solid gray' }}
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
          <>
            <Paper elevation={0} square>
              <Box marginY={1.5} padding={1.5}>
                <InputLabel>当前酒店所属街道</InputLabel>
                <FormControl fullWidth>
                  <Select value={street} native onChange={handleStreet}>
                    <option value=""></option>
                    {subDistrictList?.map((item: any) => {
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
            {street && (
              <Paper elevation={0} square>
                <Box marginY={1.5} padding={1.5}>
                  <InputLabel>当前酒店所属社区卫生服务中心</InputLabel>
                  <FormControl fullWidth>
                    <Select value={service} native onChange={handleService}>
                      {serviceList?.map((item: any) => {
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
          </>
        )}
        <Box marginY={1.5} padding={1.5}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
            disabled={transferType === '居家隔离酒店' && !street}
            fullWidth
            style={
              transferType === '居家隔离酒店' && !street
                ? {
                    height: '47px'
                  }
                : {
                    background: '#1790FF',
                    color: '#FFFFFF',
                    height: '47px'
                  }
            }
          >
            通知街道遣送
          </Button>
        </Box>
      </form>
    </Page>
  );
}
