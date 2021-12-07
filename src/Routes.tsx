/* eslint-disable react/jsx-key */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Fallback from '@pages/Fallback';
import { useSelector } from 'react-redux';
import { userInfoSelector } from './redux/selectors';

const IndexPage = loadable(() => import('@pages/Index'), {
  fallback: <Fallback />
});

//jk
const AdminHomePage = loadable(() => import('@pages/admin_jk/Index'), {
  fallback: <Fallback />
});
const ResidentListPage = loadable(
  () => import('@pages/admin_jk/resident_list/Index'),
  {
    fallback: <Fallback />
  }
);
const TransferListPage = loadable(
  () => import('@pages/admin_jk/transfer_list/Index'),
  {
    fallback: <Fallback />
  }
);
const ArriveListPage = loadable(
  () => import('@pages/admin_jk/arrive_list/Index'),
  {
    fallback: <Fallback />
  }
);
const EndManagePage = loadable(
  () => import('@pages/admin_jk/end_manage_list/Index'),
  {
    fallback: <Fallback />
  }
);
const TestListPage = loadable(() => import('@pages/admin_jk/test_list/Index'), {
  fallback: <Fallback />
});

//transfer
const TransferHomePage = loadable(() => import('@pages/transfer/Index'), {
  fallback: <Fallback />
});

//hotel_doctor
const HotelDoctorHomePage = loadable(
  () => import('@pages/hotel_doctor/Index'),
  {
    fallback: <Fallback />
  }
);

//community
const CommunityHomePage = loadable(() => import('@pages/community/Index'), {
  fallback: <Fallback />
});

//common
const PeopleDetailPage = loadable(() => import('@pages/people_detail/Index'), {
  fallback: <Fallback />
});
const UserUpdatePage = loadable(() => import('@pages/people_detail/update'), {
  fallback: <Fallback />
});
const UserDistriutePage = loadable(
  () => import('@pages/people_detail/distriute'),
  {
    fallback: <Fallback />
  }
);
const UserFeedbackPage = loadable(
  () => import('@pages/people_detail/feedback'),
  {
    fallback: <Fallback />
  }
);
const UserTransferPage = loadable(
  () => import('@pages/people_detail/transfer'),
  {
    fallback: <Fallback />
  }
);
const UserArrivePage = loadable(() => import('@pages/people_detail/arrive'), {
  fallback: <Fallback />
});
const HealthPage = loadable(() => import('@pages/people_detail/Health'), {
  fallback: <Fallback />
});
const SamplingResultPage = loadable(
  () => import('@pages/people_detail/SamplingResult'),
  {
    fallback: <Fallback />
  }
);
//新增接收模块
const ReceivePage = loadable(() => import('@pages/people_detail/receive'), {
  fallback: <Fallback />
});
//转运到社区/居家隔离酒店
const TransferCommunity = loadable(
  () => import('@pages/people_detail/TransferCommunity'),
  {
    fallback: <Fallback />
  }
);

//403
const ErrorPage = loadable(() => import('@pages/403/Error'), {
  fallback: <Fallback />
});

function getUserDetailRoutes(): JSX.Element[] {
  return [
    <Route path="/detail/receive/:id/edit" key="receive">
      <ReceivePage />
    </Route>,
    <Route path="/detail/transferback/:id/edit" key="transferback">
      <TransferBack />
    </Route>,
    <Route
      path="/detail/hotel_doctor/:id/transfer_hospital"
      key="transferhospital"
    >
      <TransferHospital />
    </Route>,
    <Route path="/detail/transfercommunity/:id/edit" key="transfercommunity">
      <TransferCommunity />
    </Route>,
    <Route path="/detail/resident/:id/baseinfo/edit" key="update">
      <UserUpdatePage />
    </Route>,
    <Route path="/detail/transfer/:id/edit" key="transfer">
      <UserTransferPage />
    </Route>,
    <Route path="/detail/distriute/:id/edit" key="distriute">
      <UserDistriutePage />
    </Route>,
    <Route path="/detail/feedback/:id/edit" key="feedback">
      <UserFeedbackPage />
    </Route>,
    <Route path="/detail/arrive/:id/edit" key="arrive">
      <UserArrivePage />
    </Route>,
    <Route path="/detail/health/:id/edit" key="health">
      <HealthPage />
    </Route>,
    <Route path="/detail/samplingresult/:id/edit" key="samplingresult">
      <SamplingResultPage />
    </Route>,
    <Route path="/detail/resident/:id" key="detail">
      <PeopleDetailPage />
    </Route>
  ];
}

//酒店管理组
const HotelListPage = loadable(
  () => import('@pages/admin_jk/hotel_list/Index'),
  {
    fallback: <Fallback />
  }
);
const HotelDetail = loadable(
  () => import('@pages/admin_jk/hotel_detail/Index'),
  {
    fallback: <Fallback />
  }
);
//转院
const TransferHospital = loadable(
  () => import('@pages/people_detail/TransferHospital'),
  {
    fallback: <Fallback />
  }
);
//转归
const TransferBack = loadable(
  () => import('@pages/people_detail/TransferBack'),
  {
    fallback: <Fallback />
  }
);
const FixPage = loadable(() => import('@pages/admin_jk/hotel_detail/fit'), {
  fallback: <Fallback />
});
const UpdatePage = loadable(
  () => import('@pages/admin_jk/hotel_detail/update'),
  {
    fallback: <Fallback />
  }
);

function HotelDetailInfo(): JSX.Element[] {
  return [
    <Route path="/detail/hotel/:id" key="hotel">
      <HotelDetail />
    </Route>,
    <Route path="/detail/hotel/:id/fix" key="fix">
      <FixPage />
    </Route>,
    <Route path="/detail/hotel/:id/update" key="update">
      <UpdatePage />
    </Route>
  ];
}

function ErrorShow(): JSX.Element[] {
  return [
    <Route path="/error" key="error">
      <ErrorPage />
    </Route>,
    <Route
      path="*"
      key="redirect"
      exact
      render={() => <Redirect to="/error"></Redirect>}
    />
  ];
}

export default function Routes(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);

  //管理员
  if (
    userInfo.role.includes('wh_cdc') ||
    userInfo.role.includes('close_contact_team')
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        <Route path="/admin_jk/hotel_list">
          <HotelListPage />
        </Route>
        <Route path="/admin_jk/test_list">
          <TestListPage />
        </Route>
        <Route path="/admin_jk/arrive_list">
          <ArriveListPage />
        </Route>
        <Route path="/admin_jk/end_manage_list">
          <EndManagePage />
        </Route>
        <Route path="/admin_jk/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/admin_jk/transfer_list">
          <TransferListPage />
        </Route>
        <Route path="/admin_jk">
          <AdminHomePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/admin_jk/transfer_list" />
        </Route>
        {ErrorShow()}
      </Switch>
    );
  }
  //转运组
  if (
    userInfo.role.includes('transfer_team') &&
    !userInfo.role.includes('wh_cdc') &&
    !userInfo.role.includes('hotel_medical_team') &&
    !userInfo.role.includes('community')
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        <Route path="/transfer/transfer_list">
          <TransferListPage />
        </Route>
        <Route path="/transfer/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/transfer">
          <TransferHomePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/transfer/transfer_list" />
        </Route>
        {ErrorShow()}
      </Switch>
    );
  }

  //酒店
  if (
    userInfo.role.includes('hotel_medical_team') &&
    !userInfo.role.includes('wh_cdc') &&
    !userInfo.role.includes('transfer_team')
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        <Route path="/hotel_doctor/hotel_list">
          <HotelListPage />
        </Route>
        <Route path="/hotel_doctor/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/hotel_doctor/arrive_list">
          <ArriveListPage />
        </Route>
        <Route path="/hotel_doctor/test_list">
          <TestListPage />
        </Route>
        <Route path="/hotel_doctor">
          <HotelDoctorHomePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/hotel_doctor/arrive_list" />
        </Route>
        {ErrorShow()}
      </Switch>
    );
  }

  //社区
  if (
    userInfo.role.includes('community') &&
    !userInfo.role.includes('wh_cdc') &&
    !userInfo.role.includes('transfer_team')
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        <Route path="/community/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/community/arrive_list">
          <ArriveListPage />
        </Route>
        <Route path="/community/test_list">
          <TestListPage />
        </Route>
        <Route path="/community">
          <CommunityHomePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/community/arrive_list" />
        </Route>
        {ErrorShow()}
      </Switch>
    );
  }

  if (
    userInfo.role.includes('transfer_team') &&
    !userInfo.role.includes('wh_cdc') &&
    (userInfo.role.includes('hotel_medical_team') ||
      userInfo.role.includes('community'))
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        <Route path="/synthesis/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/synthesis/hotel_list">
          <HotelListPage />
        </Route>
        <Route path="/synthesis/transfer_list">
          <TransferListPage />
        </Route>
        <Route path="/synthesis/arrive_list">
          <ArriveListPage />
        </Route>
        <Route path="/synthesis/test_list">
          <TestListPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/synthesis/transfer_list" />
        </Route>
        {ErrorShow()}
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="*">
        <IndexPage />
      </Route>
    </Switch>
  );
}
