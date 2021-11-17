import React, { useCallback, useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrderList, { Order } from '@components/OrderList/OrderList';
import useList from '@src/hooks/useList';
import { dingOpenLink } from '@src/dingtalkAPI';
import { formatDateTime, getURL } from '@src/utils';
import { searchTickets, TicketQuery, getMyCenterData } from '@src/api';
import { OrderStatus } from '@src/constants';
import useLoading from '@src/hooks/useLoading';
import commonStyle from '@styleModules/common.module.scss';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import { isAppVisibleSelector } from '@src/redux/selectors';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, Box } from '@material-ui/core';
import theme from '@src/theme';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
});

enum TabIndexes {
  PROCESSING,
  FINISHED
}

/* 查询工单数据 */
async function updateOrderList(
  query: TicketQuery,
  setData: React.Dispatch<React.SetStateAction<Order[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const res = await searchTickets(query);
  if (res.code !== 200) {
    return;
  }

  setData(
    res.data[0].map(item => {
      return {
        id: item.id,
        title: item.title,
        createdAt: formatDateTime(item.created_at, 0, 'lll'),
        link: `/user/order/${item.id}`,
        orderStatus: item.status
      };
    })
  );

  setIsLoading(false);
}

export default function UserOrderIndex(): JSX.Element {
  const classes = useStyles();
  const userInfo = useSelector(userInfoSelector);
  const [totalCount, settotalCount] = useState({
    red_envelopes: 0,
    answer_count: 0,
    conmment_count: 0
  });

  const [honerTitle, sethonerTitle] = useState('');
  const sethonerLevel = async (score: number) => {
    if (score >= 3000) {
      const name = '至尊';
      sethonerTitle(name);
    } else if (score < 3000 && score >= 2000) {
      const name = '王者';
      sethonerTitle(name);
    } else if (score < 2000 && score >= 1500) {
      const name = '大师';
      sethonerTitle(name);
    } else if (score < 1500 && score >= 1000) {
      const name = '星耀';
      sethonerTitle(name);
    } else if (score < 1000 && score >= 500) {
      const name = '钻石';
      sethonerTitle(name);
    } else if (score < 500 && score >= 300) {
      const name = '黄金';
      sethonerTitle(name);
    } else if (score < 300 && score >= 200) {
      const name = '白银';
      sethonerTitle(name);
    } else if (score < 200 && score >= 100) {
      const name = '黑铁';
      sethonerTitle(name);
    } else {
      const name = '黑铁';
      sethonerTitle(name);
    }
  };
  /* 页面是否可见 */
  const isAppVisible = useSelector(isAppVisibleSelector);

  /* 当前 tab 的 index */
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  /* 处理中的工单 */
  const [processingOrders, isProcessingOrdersEmpty, setProcessingOrders] =
    useList<Order>();

  /* 已结束的工单 */
  const [finishedOrders, isFinishedOrdersEmpty, setFinishedOrders] =
    useList<Order>();

  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();

  /* 切换 tab 事件处理 */
  const handleSwitchTab = useCallback((_evt: unknown, tabIndex: number) => {
    setSelectedTabIndex(tabIndex);
  }, []);

  /* 点击右上角“提交工单”按钮 */
  const handleCreateOrder = useCallback(() => {
    dingOpenLink(`${getURL('user/order/create')}`);
  }, []);
  const getMyCenter = async () => {
    const res = await getMyCenterData({ role_id: 4, id: userInfo.id });
    if (res.code == 200) {
      settotalCount({
        red_envelopes: 0,
        answer_count: res.data.askNumber,
        conmment_count: res.data.evaluateNumber
      });
      sethonerLevel(res.data.askNumber);
    }
  };
  /* 页面从不可见变为可见、切换 tab 、更新查询参数之后重新加载数据 */
  useEffect(() => {
    if (!isAppVisible) {
      return;
    }
    getMyCenter();
    setIsLoading(true);
    /* 查询处理中的工单 */
    if (selectedTabIndex === TabIndexes.PROCESSING) {
      updateOrderList(
        {
          type: 'USER',
          status: [
            OrderStatus.AWAIT_SIGN,
            OrderStatus.SIGNED,
            OrderStatus.PROCESSING
          ]
        },
        setProcessingOrders,
        setIsLoading
      );
      return;
    }

    /* 查询已完成的工单 */
    if (selectedTabIndex === TabIndexes.FINISHED) {
      updateOrderList(
        { type: 'USER', status: [OrderStatus.FINISHED] },
        setFinishedOrders,
        setIsLoading
      );
      return;
    }
  }, [
    isAppVisible,
    selectedTabIndex,
    setFinishedOrders,
    setIsLoading,
    setProcessingOrders
  ]);

  return (
    <React.Fragment>
      <Page
        title="我的工单"
        navigationRigth={{ label: '提交工单', onClick: handleCreateOrder }}
      >
        <Box
          style={{
            height: '10rem',
            width: '100%',
            backgroundColor: '#428CD7',
            zIndex: -50
          }}
        ></Box>
        <Box
          display="flex"
          justifyContent="center"
          style={{ marginTop: '-10rem' }}
        >
          <Card
            className={classes.root}
            style={{ width: '92%', marginTop: '4rem', borderRadius: 10 }}
          >
            <CardContent
              style={{
                height: '15rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around'
              }}
            >
              <Typography variant="h5" component="h3">
                <Box
                  display="flex"
                  justifyContent="start"
                  style={{ marginTop: '1rem', marginLeft: '1rem' }}
                >
                  <Avatar
                    className={classes.large}
                    src={userInfo.avatar ? userInfo.avatar : userInfo.name}
                  />
                  <Box style={{ marginLeft: '1rem' }}>
                    {userInfo.name}
                    <br />
                    <h4 style={{ marginTop: '1rem' }}>{honerTitle}等级</h4>
                  </Box>
                </Box>
              </Typography>
              <Typography style={{ marginTop: '2rem' }}>
                <Box display="flex" justifyContent="space-around">
                  <Typography
                    variant="h5"
                    style={{ textAlign: 'center', width: '50%' }}
                  >
                    {totalCount.red_envelopes}
                    <br />
                    <span style={{ fontSize: '1rem', color: '#7D7D7D' }}>
                      提问数
                    </span>
                  </Typography>
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: 'center',
                      borderLeft: '1px solid #7D7D7D',
                      width: '50%'
                    }}
                  >
                    {totalCount.conmment_count}
                    <br />
                    <span style={{ fontSize: '1rem', color: '#7D7D7D' }}>
                      评论数
                    </span>
                  </Typography>
                </Box>
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={commonStyle.whiteBackground}
          value={selectedTabIndex}
          onChange={handleSwitchTab}
        >
          <Tab label="处理中" />
          <Tab label="已结束" />
        </Tabs>
        {selectedTabIndex === TabIndexes.PROCESSING && (
          <OrderList
            orders={processingOrders}
            isEmpty={!isLoading && isProcessingOrdersEmpty}
          />
        )}
        {selectedTabIndex === TabIndexes.FINISHED && (
          <OrderList
            orders={finishedOrders}
            isEmpty={!isLoading && isFinishedOrdersEmpty}
          />
        )}
      </Page>
    </React.Fragment>
  );
}
