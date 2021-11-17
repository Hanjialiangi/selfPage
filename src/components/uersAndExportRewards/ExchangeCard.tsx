import React from 'react';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import style from '@styleModules/components/orderCard.module.scss';
import StatusIcon from '@components/StatusIcon';
import Link from '@components/Link';
import { ExchangeStatus } from '@src/constants';

type Props = {
  link: string;
  rewardsName: string;
  exchangeTime: string;
  exchangeStatus?: ExchangeStatus;
};

export default function ExchangeCard({
  rewardsName,
  exchangeTime,
  link,
  exchangeStatus
}: Props): JSX.Element {
  return (
    <Box marginX={1} marginY={1.5}>
      <Link to={link}>
        <Card elevation={0}>
          <CardContent>
            <Typography className={style.time} color="textSecondary">
              {exchangeTime}
            </Typography>
            <Typography>{rewardsName}</Typography>
          </CardContent>
          <CardActions>
            {exchangeStatus ? (
              <Grid
                justifyContent="space-between"
                alignItems="center"
                container
              >
                <StatusIcon exchangeStatus={exchangeStatus} status={5} />
                <IconButton size="small">
                  <ChevronRightIcon color="action" />
                </IconButton>
              </Grid>
            ) : null}
          </CardActions>
        </Card>
      </Link>
    </Box>
  );
}
