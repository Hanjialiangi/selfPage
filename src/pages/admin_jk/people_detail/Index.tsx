import React, { useEffect } from 'react';
import Page from '@components/layout/Page';
import { useParams } from 'react-router';

export default function PeopleDetailPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数

  useEffect(() => {
    console.log(param.id);
  }, [param.id]);
  return <Page title="人员详情"></Page>;
}
