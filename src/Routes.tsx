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

/* Admin */
const AdminKanbanPage = loadable(() => import('@pages/admin/Kanban'), {
  fallback: <Fallback />
});
const AdminDispatchOrderPage = loadable(
  () => import('@pages/admin/order/Dispatch'),
  {
    fallback: <Fallback />
  }
);
const AdminTimeoutOrderPage = loadable(
  () => import('@pages/admin/order/Timeout'),
  {
    fallback: <Fallback />
  }
);
const AdminTransferOrderPage = loadable(
  () => import('@pages/admin/order/Transfer'),
  {
    fallback: <Fallback />
  }
);
const AdminUrgentOrderPage = loadable(
  () => import('@pages/admin/order/Urgent'),
  {
    fallback: <Fallback />
  }
);
const AdminOrderDetailPage = loadable(
  () => import('@pages/admin/order/Detail'),
  {
    fallback: <Fallback />
  }
);
const AdminRewardsIndexPage = loadable(
  () => import('@pages/admin/rewards/index'),
  {
    fallback: <Fallback />
  }
);
const AdminRewardsDetail = loadable(
  () => import('@pages/admin/rewards/AdminExchangeDetail'),
  {
    fallback: <Fallback />
  }
);
const AdminRewardsAgreePage = loadable(
  () => import('@pages/admin/rewards/Agree'),
  {
    fallback: <Fallback />
  }
);
const AdminExchangeListPage = loadable(
  () => import('@pages/admin/rewards/ExchangeList'),
  {
    fallback: <Fallback />
  }
);
/* Expert */
const ExpertCenterPage = loadable(() => import('@pages/expert/expertCenter'), {
  fallback: <Fallback />
});
const ExpertKanbanPage = loadable(() => import('@pages/expert/Kanban'), {
  fallback: <Fallback />
});
const ExpertOrderIndexPage = loadable(
  () => import('@pages/expert/order/Index'),
  {
    fallback: <Fallback />
  }
);
const ExpertSignOrderPage = loadable(() => import('@pages/expert/order/Sign'), {
  fallback: <Fallback />
});
const ExpertTransferOrderPage = loadable(
  () => import('@pages/expert/order/Transfer'),
  {
    fallback: <Fallback />
  }
);
const ExpertOrderDetailPage = loadable(
  () => import('@pages/expert/order/Detail'),
  {
    fallback: <Fallback />
  }
);
const ExpertScoreIndexPage = loadable(
  () => import('@pages/expert/score/Index'),
  {
    fallback: <Fallback />
  }
);
const ExpertScoreDetailPage = loadable(
  () => import('@pages/expert/score/Detail'),
  {
    fallback: <Fallback />
  }
);
const ExpertUsedScorePage = loadable(() => import('@pages/expert/score/Used'), {
  fallback: <Fallback />
});
const ExpertApplyDetailPage = loadable(
  () => import('@components/uersAndExportRewards/ApplyDetail'),
  {
    fallback: <Fallback />
  }
);

const ExpertSettingPage = loadable(() => import('@pages/expert/Setting'), {
  fallback: <Fallback />
});
const RewardsIndexPage = loadable(() => import('@pages/expert/rewards/index'), {
  fallback: <Fallback />
});

const ApplyRewardsPage = loadable(
  () => import('@components/uersAndExportRewards/ApplyReward'),
  {
    fallback: <Fallback />
  }
);

/* User */
const UserOrderIndexPage = loadable(() => import('@pages/user/order/Index'), {
  fallback: <Fallback />
});
const UserCreateOrderPage = loadable(() => import('@pages/user/order/Create'), {
  fallback: <Fallback />
});
const UserOrderDetailPage = loadable(() => import('@pages/user/order/Detail'), {
  fallback: <Fallback />
});
const UserOrderClosePage = loadable(() => import('@pages/user/order/Close'), {
  fallback: <Fallback />
});

function getUserRoutes(): JSX.Element[] {
  return [
    <Route path="/user/order/create" key="userOrderCreate">
      <UserCreateOrderPage />
    </Route>,
    <Route path="/user/order/:orderId" key="userOrderDetail">
      <UserOrderDetailPage />
    </Route>,
    <Route path="/user/close/order/:orderId" key="userOrderClose">
      <UserOrderClosePage />
    </Route>,
    <Route path="/user/order" key="userOrderIndex">
      <UserOrderIndexPage />
    </Route>,
    <Route path="/user" key="userIndex">
      <Redirect to="/user/order" />
    </Route>
  ];
}

export default function Routes(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);

  //Todo: 临时关闭管理端，完成相关页面后再开启
  if (userInfo.role === Role.ADMIN) {
    return (
      <Switch>
        <Route path="/expert/expertCenter">
          <ExpertCenterPage />
        </Route>
        <Route path="/amdin/exchange/list">
          <AdminExchangeListPage />
        </Route>
        <Route path="/admin/kanban">
          <AdminKanbanPage />
        </Route>
        <Route path="/admin/order/:orderId/:transfer">
          <AdminTransferOrderPage />
        </Route>
        <Route path="/admin/order/dispatch">
          <AdminDispatchOrderPage />
        </Route>
        <Route path="/admin/order/timeout">
          <AdminTimeoutOrderPage />
        </Route>
        <Route path="/admin/order/urgent">
          <AdminUrgentOrderPage />
        </Route>
        <Route path="/admin/order/:orderId/:action">
          <AdminOrderDetailPage />
        </Route>
        <Route path="/admin/order/:orderId">
          <AdminOrderDetailPage />
        </Route>
        <Route path="/admin/rewards">
          <AdminRewardsIndexPage />
        </Route>
        <Route path="/admin/prize/detail/:applyId">
          <AdminRewardsDetail />
        </Route>
        <Route path="/admin/prize/agree/:applyId">
          <AdminRewardsAgreePage />
        </Route>
        <Route path="/admin/order">
          <Redirect to="/admin/order/dispatch" />
        </Route>
        <Route path="/admin">
          <Redirect to="/admin/order/dispatch" />
        </Route>
        {getUserRoutes()}
        <Route path="/order">
          <Redirect to="/admin/order/dispatch" />
        </Route>
        <Route path="/setting">
          <Redirect to="/admin/setting/expert" />
        </Route>
        <Route path="/">
          <Redirect to="/admin/kanban" />
        </Route>
      </Switch>
    );
  }

  if (userInfo.role === Role.EXPERT) {
    return (
      <Switch>
        <Route path="/expert/expertCenter">
          <ExpertCenterPage />
        </Route>
        <Route path="/expert/apply/detail/:applyId">
          <ExpertApplyDetailPage />
        </Route>
        <Route path="/expert/kanban">
          <ExpertKanbanPage />
        </Route>
        <Route path="/expert/order/sign">
          <ExpertSignOrderPage />
        </Route>
        <Route path="/expert/order/:orderId/:transfer">
          <ExpertTransferOrderPage />
        </Route>
        <Route path="/expert/order/:orderId/:action">
          <ExpertOrderDetailPage />
        </Route>
        <Route path="/expert/order/:orderId">
          <ExpertOrderDetailPage />
        </Route>
        <Route path="/expert/order">
          <ExpertOrderIndexPage />
        </Route>
        <Route path="/expert/score/detail">
          <ExpertScoreDetailPage />
        </Route>
        <Route path="/expert/score/used">
          <ExpertUsedScorePage />
        </Route>
        <Route path="/expert/score">
          <ExpertScoreIndexPage />
        </Route>
        <Route path="/expert/setting">
          <ExpertSettingPage />
        </Route>
        <Route path="/expert/rewardsindex">
          <RewardsIndexPage />
        </Route>
        <Route path="/expert/apply/prize/:prizeId">
          <ApplyRewardsPage />
        </Route>
        <Route path="/expert">
          <Redirect to="/expert/kanban" />
        </Route>
        {getUserRoutes()}
        <Route path="/order">
          <Redirect to="/expert/kanban" />
        </Route>
        <Route path="/">
          <Redirect to="/expert/kanban" />
        </Route>
      </Switch>
    );
  }

  //Todo: 临时关闭管理端，完成相关页面后再开启
  if (userInfo.role === Role.USER) {
    return (
      <Switch>
        {getUserRoutes()}
        <Route path="/expert/rewardsindex">
          <RewardsIndexPage />
        </Route>

        <Route path="/order">
          <Redirect to="/user/order" />
        </Route>
        <Route path="/">
          <Redirect to="/user/order" />
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
