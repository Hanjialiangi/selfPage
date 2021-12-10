import React from 'react';
import FixInfo from '@components/jk_layout/detail/FixInfo';
import Page from '@components/layout/Page';
import { useParams } from 'react-router-dom';
import { userInfoSelector } from '@src/redux/selectors';
import { useSelector } from 'react-redux';
import { judgeRole } from '@src/utils';

export default function FixResidentInfo(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  const role = judgeRole(userInfo.role);

  const param: { id: string } = useParams(); //获取路由参数

  return (
    <Page title="修改信息">
      <FixInfo id={param.id} role={role} />
    </Page>
  );
}
