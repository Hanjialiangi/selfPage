import React from 'react';
import Page from '@components/layout/Page';
import Navigation from '@components/Navigation';
import AdminHeader from '@components/AdminHeader';

export default function AdminKanban(): JSX.Element {
  return (
    <Page title="管理中心">
      <AdminHeader />
      {/* <Navigation url="/admin/score">积分管理</Navigation>
      <Navigation url="/admin/setting/expert">专家管理</Navigation> */}
      {/* <Navigation url="/admin/order/timeout">超时工单</Navigation>
      <Navigation url="/admin/order/urgent">加急工单</Navigation> */}
      {/* <Navigation url="/admin/setting/system">系统设置</Navigation> */}

      <Navigation url="/admin/order/dispatch">工单调度</Navigation>
      <Navigation url="/admin/rewards">积分管理</Navigation>
    </Page>
  );
}
