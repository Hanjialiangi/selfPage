import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

import {
  getHotelList,
  getResidentInfo,
  getSubDistrict,
  getServiceCenter,
  getTransferHotel
} from '@src/api';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL, judgeRole } from '@src/utils';
import { userInfoSelector } from '@src/redux/selectors';
import { useSelector } from 'react-redux';

type StreetType = {
  id: number;
  name: string;
  created_at?: string;
  update_at?: string;
};
export default function UserDistriutePage(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  const role = judgeRole(userInfo.role);

  const param: { id: string } = useParams();
  const [hotelList, setHotelList] = useState([]); //酒店列表
  const [hotel, setHotel] = useState(''); //选择的酒店
  const [subDistrict, setSubDistrict] = useState(''); //所属街道
  const [streetList, setStreetList] = useState<StreetType[]>(); //街道列表
  const [serviceCenterList, setServiceCenterList] = useState(['']); //设置服务中心
  const [serivice, setSerivice] = useState(''); //选择的服务中心

  const handleTransfer = async () => {
    //发起转运任务
    const res = await getTransferHotel(param.id, hotel, subDistrict, serivice);
    if (res.code === 200) {
      dingAlert('发起成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };
  //获取服务中心
  const gainService = async (value: string) => {
    const res = await getServiceCenter(value);
    if (res.code === 200) {
      setServiceCenterList(res.data.data); //设置服务中心列表
      setSerivice(res.data.data[0].name); //默认第一个
    }
  };

  //init
  const Init = async () => {
    let middleWare;
    const res = await getResidentInfo(param.id, role);
    if (res.code === 200) {
      res.data.map(async (item: any) => {
        if (item.key === 'sub_district') {
          setSubDistrict(item.value); //设置所属街道
          middleWare = item.value;
          setStreetList([{ id: 1, name: middleWare }]); //单独设置
          gainService(middleWare);
          return;
        }
      });
      const result = await getHotelList(); //获取预计隔离酒店列表
      if (result.code === 200) {
        setHotelList(result.data);
        setHotel(result.data[0].name); //默认显示第一个
      }
      if (!middleWare) {
        const resStreet = await getSubDistrict(); //获取街道信息
        if (resStreet.code === 200) {
          setStreetList(resStreet.data.data);
        }
      }
    }
  };
  useEffect(() => {
    Init(); //初始化
  }, []);

  return (
    <Page title="发起转运">
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>隔离酒店
          </InputLabel>
          <Select
            className="hotel_name"
            value={hotel}
            native
            style={{ display: 'flex' }}
            onChange={(e: any) => {
              setHotel(e.target.value);
            }}
          >
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
      <>
        <Paper elevation={0} square>
          <Box marginY={0.2} padding={1.5}>
            <InputLabel>
              <span style={{ color: '#1790FF' }}>*</span>所属街道
            </InputLabel>
            <Select
              className="sub_district"
              value={subDistrict}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setSubDistrict(e.target.value);
                gainService(e.target.value);
              }}
            >
              <option value="" key="none"></option>
              {streetList?.map((item: any) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </Box>
        </Paper>
        {subDistrict && (
          <Paper elevation={0} square>
            <Box padding={1.5}>
              <InputLabel>
                <span style={{ color: '#1790FF' }}>*</span>社区卫生服务中心
              </InputLabel>
              <Select
                className="serivice"
                value={serivice}
                native
                style={{ display: 'flex' }}
                onChange={(e: any) => {
                  setSerivice(e.target.value);
                }}
              >
                {serviceCenterList.map((item: any) => {
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
      </>
      <Box padding={1.5} marginTop={4}>
        <Button
          onClick={handleTransfer}
          variant="contained"
          disabled={!subDistrict}
          style={
            subDistrict
              ? {
                  background: '#1790FF',
                  color: '#FFFFFF',
                  height: '47px'
                }
              : { height: '47px' }
          }
          fullWidth
        >
          <span style={{ fontSize: '16px' }}>确认隔离</span>
          确认发起转运
        </Button>
      </Box>
    </Page>
  );
}
