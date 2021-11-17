import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import OrderCard from '@components/OrderList/OrderCard';
import { EmptyIcon } from '@components/SvgIcons';
import { OrderStatus } from '@src/constants';

export type Order = {
  id: number | string;
  title: string;
  createdAt: string;
  link: string;
  orderStatus: OrderStatus;
};

type Props<OrderType> = {
  orders: OrderType[];
  isEmpty: boolean;
};

export default function OrderList<OrderType extends Order>({
  orders,
  isEmpty
}: Props<OrderType>): JSX.Element {
  return (
    <div>
      {orders.map(order => (
        <Box key={order.id} marginX={1} marginY={1.5}>
          <OrderCard
            link={order.link}
            title={order.title}
            createdAt={order.createdAt}
            orderStatus={order.orderStatus}
          />
        </Box>
      ))}
      {isEmpty && (
        <Grid container justifyContent="center">
          <Box margin={3}>
            <EmptyIcon width="10rem" />
          </Box>
        </Grid>
      )}
    </div>
  );
}
