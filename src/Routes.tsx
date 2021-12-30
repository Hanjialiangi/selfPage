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
//街道任务清单
const StreetTaskList = loadable(
  () => import('@pages/admin_jk/street_task_list/Index'),
  {
    fallback: <Fallback />
  }
); //todo:调整路由(权限)
const HealthServiceList = loadable(
  () => import('@pages/admin_jk/task_list/Index'),
  {
    fallback: <Fallback />
  }
);

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
    <Route path="/detail/hotel/:id/fix" key="fix">
      <FixPage />
    </Route>,
    <Route path="/detail/hotel/:id/update" key="update">
      <UpdatePage />
    </Route>,
    <Route path="/detail/hotel/:id" key="hotel">
      <HotelDetail />
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

//社区卫生服务中心
function HealthCenter(value: string): JSX.Element[] {
  return [
    <Route
      path={`/${value}/health_service_task_list`}
      key="community_healthcare_center"
    >
      <HealthServiceList />
    </Route>
  ];
}

//街道
function StreetTask(value: string): JSX.Element[] {
  return [
    <Route path={`/${value}/street_task_list`} key="sub_district">
      <StreetTaskList />
    </Route>
  ];
}

//社区排查
const CommunityPage = loadable(
  () => import('@pages/communityScreening/community/Index'),
  {
    fallback: <Fallback />
  }
);
const StreetPage = loadable(
  () => import('@pages/communityScreening/street/Index'),
  {
    fallback: <Fallback />
  }
);
const StaffAddPage = loadable(
  () => import('@pages/communityScreening/community/Add'),
  {
    fallback: <Fallback />
  }
);
const TransferPage = loadable(
  () => import('@pages/communityScreening/transfer/Index'),
  {
    fallback: <Fallback />
  }
);
const HotlePage = loadable(
  () => import('@pages/communityScreening/hotel/Index'),
  {
    fallback: <Fallback />
  }
);
const CheckPage = loadable(() => import('@pages/people_detail/check'), {
  fallback: <Fallback />
});

//community_screening
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
        <Route path="/community_screening/community">
          <CommunityPage />
        </Route>
        <Route path="/community_screening/street">
          <StreetPage />
        </Route>
        <Route path="/community_screening/hotel">
          <TransferPage />
        </Route>
        <Route path="/community_screening/transfer">
          <HotlePage />
        </Route>
        <Route path="/detail/resident/:id" key="detail">
          <PeopleDetailPage />
        </Route>
        <Route path="/detail/check/:id/edit" key="detail">
          <CheckPage />
        </Route>
        <Route path="/detail/health/:id/edit" key="health">
          <HealthPage />
        </Route>
        <Route path="/detail/update/:id/baseinfo/edit" key="update">
          <UserUpdatePage />
        </Route>
        <Route path="/community_screening/hotel"></Route>
        <Route path="/community_screening/transfer"></Route>
        <Route path="/staff/add">
          <StaffAddPage />
        </Route>
        <Route path="/">
          <Redirect to="/community_screening/community" />
        </Route>
        {/*{HotelDetailInfo()}
        {StreetTask('admin_jk')}
        {HealthCenter('admin_jk')}
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
        </Route>*/}
        {ErrorShow()}
      </Switch>
    );
  }

  //转运组
  if (
    userInfo.role.includes('transfer_team') &&
    !userInfo.role.includes('close_contact_team') &&
    !userInfo.role.includes('wh_cdc') &&
    !userInfo.role.includes('hotel_medical_team') &&
    !userInfo.role.includes('community')
  ) {
    //转运组
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        {userInfo.role.includes('sub_district') && StreetTask('transfer')}
        {userInfo.role.includes('community_healthcare_center') &&
          HealthCenter('transfer')}
        <Route path="/transfer/transfer_list">
          <TransferListPage />
        </Route>
        <Route path="/transfer/hotel_list">
          <HotelListPage />
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
    !userInfo.role.includes('close_contact_team') &&
    !userInfo.role.includes('transfer_team')
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        {userInfo.role.includes('sub_district') && StreetTask('hotel_doctor')}
        {userInfo.role.includes('community_healthcare_center') &&
          HealthCenter('hotel_doctor')}
        <Route path="/hotel_doctor/end_manage_list">
          <EndManagePage />
        </Route>
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
    !userInfo.role.includes('close_contact_team') &&
    !userInfo.role.includes('transfer_team')
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {userInfo.role.includes('sub_district') && StreetTask('community')}
        {userInfo.role.includes('community_healthcare_center') &&
          HealthCenter('community')}
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
    !userInfo.role.includes('close_contact_team') &&
    (userInfo.role.includes('hotel_medical_team') ||
      userInfo.role.includes('community'))
  ) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        {userInfo.role.includes('sub_district') && StreetTask('synthesis')}
        {userInfo.role.includes('community_healthcare_center') &&
          HealthCenter('synthesis')}
        <Route path="/synthesis/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/synthesis/end_manage_list">
          <EndManagePage />
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
  //集中隔离组
  if (userInfo.role.includes('focus_quarantine_group')) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {HotelDetailInfo()}
        {userInfo.role.includes('sub_district') &&
          StreetTask('focus_quarantine_group')}
        {userInfo.role.includes('community_healthcare_center') &&
          HealthCenter('focus_quarantine_group')}
        <Route path="/focus_quarantine_group/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/focus_quarantine_group/hotel_list">
          <HotelListPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/focus_quarantine_group/resident_list" />
        </Route>
      </Switch>
    );
  }

  if (userInfo.role.includes('community_healthcare_center')) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {userInfo.role.includes('sub_district') &&
          StreetTask('community_healthcare_center')}
        {userInfo.role.includes('community_healthcare_center') &&
          HealthCenter('community_healthcare_center')}
        <Route path="/community_healthcare_center/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/community_healthcare_center/test_list">
          <TestListPage />
        </Route>
        <Route path="/">
          <Redirect to="/community_healthcare_center/resident_list" />
        </Route>
      </Switch>
    );
  }
  if (userInfo.role.includes('sub_district')) {
    return (
      <Switch>
        {getUserDetailRoutes()}
        {userInfo.role.includes('sub_district') && StreetTask('sub_district')}
        <Route path="/sub_district/resident_list">
          <ResidentListPage />
        </Route>
        <Route path="/sub_district/test_list">
          <TestListPage />
        </Route>
        <Route path="/">
          <Redirect to="/sub_district/resident_list" />
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
