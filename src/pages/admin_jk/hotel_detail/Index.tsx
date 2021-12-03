import Page from '@components/layout/Page';
import { getHotelDetailInfo } from '@src/api';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function HotelDetailPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [data, setData] = useState(); //酒店详细信息
  const Init = async () => {
    const res = await getHotelDetailInfo(param.id);
    setData(res.data);
  };

  useEffect(() => {
    Init();
  }, []);
  return <Page title="酒店详情"></Page>;
}
