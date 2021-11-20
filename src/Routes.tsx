import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';
import Fallback from '@pages/Fallback';
import { useSelector } from 'react-redux';
import { userInfoSelector } from './redux/selectors';
import { Role } from './constants';

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
const UserTransferPage = loadable(
  () => import('@pages/people_detail/transfer'),
  {
    fallback: <Fallback />
  }
);
const UserArrivePage = loadable(() => import('@pages/people_detail/arrive'), {
  fallback: <Fallback />
});

// function getUserRoutes(): JSX.Element[] {
//   return [
//     <Route path="/user/order/create" key="userOrderCreate">
//       <UserCreateOrderPage />
//     </Route>,
//     <Route path="/user/order/:orderId" key="userOrderDetail">
//       <UserOrderDetailPage />
//     </Route>,
//     <Route path="/user/close/order/:orderId" key="userOrderClose">
//       <UserOrderClosePage />
//     </Route>,
//     <Route path="/user/order" key="userOrderIndex">
//       <UserOrderIndexPage />
//     </Route>,
//     <Route path="/user" key="userIndex">
//       <Redirect to="/user/order" />
//     </Route>
//   ];
// }

function getUserDetailRoutes(): JSX.Element[] {
  return [
    <Route path="/detail/resident/:id/baseinfo/edit" key="update">
      <UserUpdatePage />
    </Route>,
    <Route path="/detail/transfer/:id/edit" key="transfer">
      <UserTransferPage />
    </Route>,
    <Route path="/detail/arrive/:id/edit" key="arrive">
      <UserArrivePage />
    </Route>,
    <Route path="/detail/resident/:id" key="detail">
      <PeopleDetailPage />
    </Route>
  ];
}

export default function Routes(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);

  //Todo: 临时关闭管理端，完成相关页面后再开启
  if (userInfo.role === Role.ADMIN) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        <Route path="/admin_jk/test_list">
          <TestListPage />
        </Route>
        <Route path="/admin_jk/arrive_list">
          <ArriveListPage />
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
        <Route path="/">
          <Redirect to="/admin_jk" />
        </Route>
      </Switch>
    );
  }

  if (userInfo.role === Role.TRANSFER) {
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
        <Route path="/">
          <Redirect to="/transfer" />
        </Route>
      </Switch>
    );
  }

  //Todo: 临时关闭管理端，完成相关页面后再开启
  if (userInfo.role === Role.HOTELDOCTOR) {
    return (
      <Switch>
        {getUserDetailRoutes()}
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
        <Route path="/">
          <Redirect to="/hotel_doctor" />
        </Route>
      </Switch>
    );
  }

  if (userInfo.role === Role.COMMUNITY) {
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
        <Route path="/">
          <Redirect to="/community" />
        </Route>
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
