import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Select } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

import { getHotelList, getResidentInfo, getSubDistrict } from '@src/api';
// import { dingAlert } from '@src/dingtalkAPI';
// import { getURL } from '@src/utils';

type StreetType = {
  id: number;
  name: string;
  created_at?: string;
  update_at?: string;
};
export default function ExpertTransferOrder(): JSX.Element {
  const param: { id: string } = useParams();
  const [hotelList, setHotelList] = useState([]); //酒店列表
  const [hotel, setHotel] = useState(''); //选择的酒店
  const [subDistrict, setSubDistrict] = useState(''); //所属街道
  const [streetList, setStreetList] = useState<StreetType[]>(); //街道列表
  const [serviceCenterList, setServiceCenterList] = useState(['']); //设置服务中心
  const [serivice, setSerivice] = useState(''); //选择的服务中心

  const handleTransfer = async () => {
    //TODO: 发起转运任务
    console.log(param.id, hotel, subDistrict, serivice);
  };

  //init
  const Init = async () => {
    let middleWare;
    const res = await getResidentInfo(param.id);
    if (res.code === 200) {
      res.data.map(async (item: any) => {
        if (item.key === 'sub_district') {
          setSubDistrict(item.value); //设置所属街道
          //TODO: //根据所属街道设置对应服务中心,isArray判断
          middleWare = item.value;
          setStreetList([{ id: 1, name: middleWare }]); //单独设置
          setServiceCenterList(['xxx服务中心']);
          setSerivice('xxx服务中心');
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
        <Box marginY={1.5} padding={1.5}>
          <InputLabel required>选择预计隔离酒店</InputLabel>
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
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>所属街道</InputLabel>
            <Select
              className="sub_district"
              value={subDistrict}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setSubDistrict(e.target.value);
              }}
            >
              <option value=""></option>
              {streetList?.map((item: any) => {
                return (
                  <option value={item.name} key={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </Box>
        </Paper>
        {subDistrict && (
          <Paper elevation={0} square>
            <Box marginY={1.5} padding={1.5}>
              <InputLabel>通知所属社区服务中心</InputLabel>
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
                    <option value="xxx服务中心" key="1">
                      xxx服务中心
                    </option>
                  );
                })}
              </Select>
            </Box>
          </Paper>
        )}
      </>
      <Box marginY={1.5} padding={1.5}>
        <Button
          onClick={handleTransfer}
          variant="contained"
          color="primary"
          disabled={!subDistrict}
          fullWidth
        >
          确认发起转运
        </Button>
      </Box>
    </Page>
  );
}
