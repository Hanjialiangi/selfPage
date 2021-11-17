import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import style from '@styleModules/components/orderCard.module.scss';
import { OrderStatus } from '@src/constants';
import StatusIcon from '@components/StatusIcon';
import Link from '@components/Link';

type Props = {
  title: string;
  createdAt: string;
  link: string;
  orderStatus: OrderStatus;
};

export default function OrderCard({
  title,
  createdAt,
  link,
  orderStatus
}: Props): JSX.Element {
  return (
    <Link to={link}>
      <Card elevation={0}>
        <CardContent>
          <Typography className={style.time} color="textSecondary">
            {createdAt}
          </Typography>
          <Typography>{title}</Typography>
        </CardContent>
        <CardActions>
          <Grid justifyContent="space-between" alignItems="center" container>
            <StatusIcon exchangeStatus={5} status={orderStatus} />
            <IconButton size="small">
              <ChevronRightIcon color="action" />
            </IconButton>
          </Grid>
        </CardActions>
      </Card>
    </Link>
  );
}
