import React, { useEffect } from 'react';
import Page from '@components/layout/Page';
import useList from '@src/hooks/useList';
import { formatDateTime, getQuery } from '@src/utils';
import useLoading from '@src/hooks/useLoading';
import { searchTickets } from '@src/api';
import OrderList, { Order } from '@components/OrderList/OrderList';
export default function AdminTimeoutOrder(): JSX.Element {
  /* 已超时的工单 */
  const [timeoutOrders, isTimeoutOrdersEmpty, setTimeoutOrders] =
    useList<Order>();
  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();
  const initData = async () => {
    const res = await searchTickets({ type: 'ADMIN', status: 5 });
    setTimeoutOrders(
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
  };
  useEffect(() => {
    initData();
  }, []);

  return (
    <Page title="超时工单">
      <OrderList
        orders={timeoutOrders}
        isEmpty={!isLoading && isTimeoutOrdersEmpty}
      />
    </Page>
  );
}
