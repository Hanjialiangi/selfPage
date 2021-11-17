import React, { useCallback, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Page from '@components/layout/Page';
import ExpertHeader from '@components/ExpertHeader';
import Navigation from '@components/Navigation';
import OrderEntryList from '@components/OrderEntry/OrderEntryList';
import useList from '@src/hooks/useList';
import { EmptyIcon } from '@components/SvgIcons';
import useLoading from '@src/hooks/useLoading';
import { getSignOrderList, searchTickets, getExpertScore } from '@src/api';
import { dingOpenLink } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';
import { OrderStatus } from '@src/constants';
import Link from '@components/Link';

type NewOrder = {
  id: number | string;
  title: string;
  url: string;
};

/* 查询工单数据 */
async function getData(
  setTimeoutOrderCount: React.Dispatch<React.SetStateAction<number>>,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  setNewOrders: React.Dispatch<React.SetStateAction<NewOrder[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  /* 超时工单数量 */
  const timeoutOrderRes = await searchTickets({
    type: 'EXPERT',
    status: [OrderStatus.TIMEOUT]
  });
  if (timeoutOrderRes.code === 200) {
    setTimeoutOrderCount(timeoutOrderRes.data[0].length);
  }

  /* 当前剩余积分 */
  const scoreRes = await getExpertScore();
  if (scoreRes.code === 200) {
    setScore(scoreRes.data.integral);
  }

  /* 待签收工单数据 */
  const res = await getSignOrderList();
  if (res.code === 200) {
    setNewOrders(
      res.data.slice(0, 5).map(item => {
        return {
          id: item.id,
          title: item.title,
          url: `/expert/order/${item.id}`
        };
      })
    );
  }

  setIsLoading(false);
}

export default function ExpertKanban(): JSX.Element {
  /* 已超时工单数量 */
  const [timeoutOrderCount, setTimeoutOrderCount] = useState(0);

  /* 待签收的新工单 */
  const [newOrders, isNewOrdersEmpty, setNewOrders] = useList<NewOrder>();

  /* 专家当前积分 */
  const [score, setScore] = useState(0);

  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();

  /* 点击右上角“提交工单”按钮 */
  const handleCreateOrder = useCallback(() => {
    dingOpenLink(`${getURL('user/order')}`);
  }, []);

  /* 加载专家工单看板数据 */
  useEffect(() => {
    setIsLoading(true);

    getData(setTimeoutOrderCount, setScore, setNewOrders, setIsLoading);
  }, [setIsLoading, setNewOrders]);

  return (
    <Page
      title="工单"
      navigationRigth={{ label: '我提交的工单', onClick: handleCreateOrder }}
    >
      <ExpertHeader score={score} />
      {timeoutOrderCount > 0 && (
        <Navigation url="/expert/order?type=timeout">
          <Typography variant="body2">
            您有
            <Typography color="secondary" component="span">
              {timeoutOrderCount}
            </Typography>
            项工单已超时，请及时处理
          </Typography>
        </Navigation>
      )}
      <Navigation url="/expert/order">我的工单任务</Navigation>
      <Navigation url="expert/rewardsindex">兑换</Navigation>
      <OrderEntryList title="抢单" orders={newOrders}>
        {!isLoading && isNewOrdersEmpty && (
          <Grid direction="column" alignItems="center" container>
            <Box margin={3}>
              <EmptyIcon width="7rem" />
            </Box>
            <Typography variant="caption">暂时没有新的工单</Typography>
          </Grid>
        )}
        {!isNewOrdersEmpty && (
          <Link to="/expert/order/sign">
            <Box paddingX={2}>
              <Button variant="outlined" color="primary" fullWidth>
                浏览更多工单
              </Button>
            </Box>
          </Link>
        )}
      </OrderEntryList>
    </Page>
  );
}
