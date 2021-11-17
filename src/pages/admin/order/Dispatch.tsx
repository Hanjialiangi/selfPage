import React, { useCallback, useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import OrderList from '@components/OrderList/OrderList';
import useList from '@src/hooks/useList';
import { formatDateTime } from '@src/utils';
import { searchTickets, TicketQuery } from '@src/api';
import { OrderStatus } from '@src/constants';
import useLoading from '@src/hooks/useLoading';
import commonStyle from '@styleModules/common.module.scss';
import Navigation from '@components/Navigation';

type Order = {
  id: number | string;
  title: string;
  createdAt: string;
  link: string;
  orderStatus: OrderStatus;
};

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
        link: `/admin/order/${item.id}`,
        orderStatus: item.status
      };
    })
  );

  setIsLoading(false);
}

export default function AdminDispatchOrder(): JSX.Element {
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

  /* 切换 tab 、更新查询参数之后重新加载数据 */
  useEffect(() => {
    setIsLoading(true);
    //Todo: 查询条件
    if (selectedTabIndex === TabIndexes.PROCESSING) {
      updateOrderList(
        {
          type: 'ADMIN',
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

    if (selectedTabIndex === TabIndexes.FINISHED) {
      updateOrderList(
        { type: 'ADMIN', status: [OrderStatus.FINISHED] },
        setFinishedOrders,
        setIsLoading
      );
      return;
    }
  }, [selectedTabIndex, setFinishedOrders, setIsLoading, setProcessingOrders]);

  return (
    <Page title="工单调度">
      {/* <Navigation url='/admin/rewards'>兑换设置</Navigation> */}

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
  );
}
