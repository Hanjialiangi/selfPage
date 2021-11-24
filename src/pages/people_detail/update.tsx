import React from 'react';
import FixInfo from '@components/jk_layout/detail/FixInfo';
import Page from '@components/layout/Page';
import { useParams } from 'react-router-dom';
export default function FixResidentInfo(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数

  return (
    <Page title="修改信息">
      <FixInfo id={param.id} />
    </Page>
  );
}
