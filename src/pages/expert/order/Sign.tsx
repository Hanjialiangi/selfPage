import React, { useEffect } from 'react';
import Page from '@components/layout/Page';
import OrderList, { Order } from '@components/OrderList/OrderList';
import useList from '@src/hooks/useList';
import useLoading from '@src/hooks/useLoading';
import { formatDateTime } from '@src/utils';
import { getSignOrderList } from '@src/api';

/* 查询工单数据 */
async function updateOrderList(
  _query: Record<string, string>,
  setData: React.Dispatch<React.SetStateAction<Order[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const res = await getSignOrderList();
  if (res.code !== 200) {
    return;
  }

  setData(
    res.data.map(item => {
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

export default function ExpertSignOrder(): JSX.Element {
  /* 等待签收的新工单 */
  const [newOrders, isNewOrdersEmpty, setNewOrders] = useList<Order>();

  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();

  /* 切换 tab 、更新查询参数之后重新加载数据 */
  useEffect(() => {
    setIsLoading(true);
    updateOrderList({}, setNewOrders, setIsLoading);
  }, [setIsLoading, setNewOrders]);

  return (
    <Page title="抢单">
      <OrderList orders={newOrders} isEmpty={!isLoading && isNewOrdersEmpty} />
    </Page>
  );
}
