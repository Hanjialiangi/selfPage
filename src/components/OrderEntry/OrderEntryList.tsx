import React, { PropsWithChildren } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import OrderEntry from '@components/OrderEntry/OrderEntry';

type Props = PropsWithChildren<{
  title: string;
  orders: Array<{
    id: number | string;
    title: string;
    url: string;
  }>;
}>;

export default function OrderEntryList({
  title,
  orders,
  children
}: Props): JSX.Element {
  return (
    <Box marginBottom={1.5}>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <Typography>{title}</Typography>
          <List>
            {orders.map((order, index) => {
              return (
                <ListItem key={order.id}>
                  <OrderEntry
                    number={index + 1}
                    title={order.title}
                    url={order.url}
                  />
                </ListItem>
              );
            })}
          </List>
          {children}
        </Box>
      </Paper>
    </Box>
  );
}
