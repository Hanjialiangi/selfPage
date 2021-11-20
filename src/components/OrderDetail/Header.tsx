import React, { useState, useEffect } from 'react';
import { Paper, Grid, Box, Typography, InputLabel } from '@material-ui/core';
import { MILLISECONDS, OrderStatus } from '@src/constants';
import StatusIcon from '@components/StatusIcon';
import { formatDateTime } from '@src/utils';
// import AccountCircleIcon from '@material-ui/icons';

type Props = {
  title: string;
  submitterName: string;
  status: OrderStatus;
  urgent: number;
  scheduledAt: string;
  completedAt: string;
};

export default function OrderDetailHeader({
  title,
  submitterName,
  status,
  urgent,
  scheduledAt,
  completedAt
}: Props): JSX.Element {
  /* 预计完成时间 */
  const [scheduleDate, setScheduleDate] = useState('');
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    if (status === OrderStatus.AWAIT_SIGN) {
      setIsTimeout(false);
      setScheduleDate('');
      return;
    }

    if (status === OrderStatus.SIGNED) {
      setIsTimeout(Date.now() > Date.parse(scheduledAt));
      setScheduleDate(
        scheduledAt
          ? `预计于${formatDateTime(
              scheduledAt,
              MILLISECONDS.A_DAY,
              'lll'
            )}完成`
          : ''
      );
      return;
    }

    if (completedAt) {
      setIsTimeout(false);
      setScheduleDate(
        `已于${formatDateTime(completedAt, MILLISECONDS.A_DAY, 'lll')}结束`
      );
    }
  }, [status, scheduledAt, completedAt]);

  return (
    <Box>
      <Paper elevation={0} square>
        {/* <AccountCircleIcon /> */}
        <Box padding={1.5}>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="h6">小胡的基本信息</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="h6" color={'secondary'} component={'span'}>
                  密切接触
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>隔离类型：</span>
                  {title}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>维也纳酒店</span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <StatusIcon
                  exchangeStatus={5}
                  status={status}
                  urgent={urgent}
                />
              </Grid>
              {/* <Grid xs={8}>
                <Typography
                  variant="body2"
                  component="p"
                  color={isTimeout ? 'secondary' : 'initial'}
                >
                  {scheduleDate}
                </Typography>
              </Grid> */}
            </Grid>
          </Box>
          <Grid
            justifyContent="space-between"
            style={{ display: 'block' }}
            container
          ></Grid>
        </Box>
      </Paper>
    </Box>
  );
}
