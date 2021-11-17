import React, { useCallback, useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrderList, { Order } from '@components/OrderList/OrderList';
import useList from '@src/hooks/useList';
import { formatDateTime, getQuery } from '@src/utils';
import { searchTickets, TicketQuery } from '@src/api';
import { OrderStatus } from '@src/constants';
import useLoading from '@src/hooks/useLoading';
import commonStyle from '@styleModules/common.module.scss';
import { useSelector } from 'react-redux';
import { isAppVisibleSelector } from '@src/redux/selectors';

enum TabIndexes {
  PROCESSING,
  TIMEOUT,
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
        link: `/expert/order/${item.id}`,
        orderStatus: item.status
      };
    })
  );

  setIsLoading(false);
}

export default function ExpertOrderIndex(): JSX.Element {
  /* 页面是否可见 */
  const isAppVisible = useSelector(isAppVisibleSelector);

  /* 当前 tab 的 index */
  const [selectedTabIndex, setSelectedTabIndex] = useState(() => {
    /* QueryString 的 type 参数 */
    const type = getQuery('type');

    /* 如果 type 参数为 timeout，默认查询超时工单 */
    return type === 'timeout' ? TabIndexes.TIMEOUT : TabIndexes.PROCESSING;
  });

  /* 处理中的工单 */
  const [processingOrders, isProcessingOrdersEmpty, setProcessingOrders] =
    useList<Order>();

  /* 已超时的工单 */
  const [timeoutOrders, isTimeoutOrdersEmpty, setTimeoutOrders] =
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

  /* 页面从不可见变为可见、切换 tab 、更新查询参数之后重新加载数据 */
  useEffect(() => {
    if (!isAppVisible) {
      return;
    }

    setIsLoading(true);
    /* 查询处理中的工单 */
    if (selectedTabIndex === TabIndexes.PROCESSING) {
      updateOrderList(
        {
          type: 'EXPERT',
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

    /* 查询超时工单 */
    if (selectedTabIndex === TabIndexes.TIMEOUT) {
      updateOrderList(
        { type: 'EXPERT', status: [OrderStatus.TIMEOUT] },
        setTimeoutOrders,
        setIsLoading
      );
      return;
    }

    /* 查询已完成的工单 */
    if (selectedTabIndex === TabIndexes.FINISHED) {
      updateOrderList(
        { type: 'EXPERT', status: [OrderStatus.FINISHED] },
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
    setProcessingOrders,
    setTimeoutOrders
  ]);

  return (
    <Page title="我的任务">
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        className={commonStyle.whiteBackground}
        value={selectedTabIndex}
        onChange={handleSwitchTab}
      >
        <Tab label="处理中" />
        <Tab label="已超时" />
        <Tab label="已结束" />
      </Tabs>
      {selectedTabIndex === TabIndexes.PROCESSING && (
        <OrderList
          orders={processingOrders}
          isEmpty={!isLoading && isProcessingOrdersEmpty}
        />
      )}
      {selectedTabIndex === TabIndexes.TIMEOUT && (
        <OrderList
          orders={timeoutOrders}
          isEmpty={!isLoading && isTimeoutOrdersEmpty}
        />
      )}
      {selectedTabIndex === TabIndexes.FINISHED && (
        <OrderList
          orders={finishedOrders}
          isEmpty={!isLoading && isFinishedOrdersEmpty}
        />
      )}
    </Page>
  );
}
