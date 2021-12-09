import Page from '@components/layout/Page';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Typography, Paper, Button, Card } from '@material-ui/core';
import { InfoFixIcon, HotelIcon } from '@src/assets/svg/picture';
import { getURL } from '@src/utils';
import '@src/styles/modules/detail/detail.scss';
import { getHotelDetailInfo } from '@src/api';
import HotelInfoContent from '@components/hotel/HotelInfoContent';

export default function HotelDetailPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [data, setData] = useState({
    address: '',
    available_number: '',
    capacity: '',
    name: ''
  }); //酒店详细信息
  const [color, setcolor] = useState('green'); //设置状态颜色
  const [HotelState, setHotelState] = useState('启动'); //设置酒店启用状态
  const Init = async () => {
    const res = await getHotelDetailInfo(param.id);
    setData(res.data);
  };
  /*修改酒店设置*/
  const handleFixHotelInfo = () => {
    window.location.href = getURL(`/detail/hotel/${param.id}/update`);
  };

  const handleFixHotelState = () => {
    if (HotelState === '启动') {
      setHotelState('禁用');
      setcolor('red');
    } else if (HotelState === '禁用') {
      setHotelState('启动');
      setcolor('green');
    }
  };
  useEffect(() => {
    Init();
  }, []);
  return (
    <Page title="酒店详情">
      <>
        <Paper elevation={0} square>
          <Box margin={1.5} padding={1.5}>
            <Card className="infoCard">
              <Paper elevation={0} square>
                <Box margin={1.5}>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="h6">
                      <HotelIcon />
                      &nbsp;酒店的基本信息
                    </Typography>
                    <Typography variant="subtitle1" component={'span'}>
                      <span style={{ color: `${color}` }}>{HotelState}中</span>
                    </Typography>
                  </div>
                </Box>
              </Paper>
              {<HotelInfoContent info={data} />}
            </Card>
          </Box>
        </Paper>
        <Paper elevation={0}>
          <Box paddingTop={1.5} paddingBottom={1} margin={1.5}>
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleFixHotelInfo}
                fullWidth
              >
                <InfoFixIcon />
                &nbsp;修改酒店信息
              </Button>
            </Box>
          </Box>
          <Box paddingTop={1.5} paddingBottom={1} margin={1.5}>
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleFixHotelState}
                fullWidth
              >
                <InfoFixIcon />
                &nbsp;修改酒店状态
              </Button>
            </Box>
          </Box>
        </Paper>
      </>
    </Page>
  );
}
