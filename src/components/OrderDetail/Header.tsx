import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { MILLISECONDS, OrderStatus } from '@src/constants';
import StatusIcon from '@components/StatusIcon';
import { formatDateTime } from '@src/utils';

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
    <Box marginBottom={1.5}>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <Box marginBottom={1}>
            <Typography variant="caption">{submitterName}提交的工单</Typography>
          </Box>
          <Box marginBottom={2}>
            <Typography variant="h6">{title}</Typography>
          </Box>
          <Grid
            justifyContent="space-between"
            style={{ display: 'block' }}
            container
          >
            <StatusIcon exchangeStatus={5} status={status} urgent={urgent} />
            <Typography
              variant="body2"
              component="p"
              color={isTimeout ? 'secondary' : 'initial'}
            >
              {scheduleDate}
            </Typography>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
