import React, { useState, useEffect } from 'react';
import Page from '@components/layout/Page';
import commonStyle from '@styleModules/common.module.scss';
import StatusIcon from '@components/StatusIcon';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CardActions,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { dingAlert } from '@src/dingtalkAPI';
import Navigation from '@components/Navigation';
import { getExchangeApplyById, updateExcheangeApply } from '@src/api';
import { useParams } from 'react-router-dom';
type Apply = {
  id: number;
  prize_id: number;
  prize_name: string;
  prize_number: number;
  need_integral: number;
  exchange_user_id: number;
  exchange_user_name: string;
  exchange_user_number: string;
  feedback: string;
  created_at: string;
  status: number;
};

export default function AdminExchangeDetail(): JSX.Element {
  const [isPassLoading, setisPassLoading] = useState(true);
  const [isRejectLoading, setisRejectLoading] = useState(true);
  const [exchangeStatus, setexchangeStatus] = useState(1);
  const [exchangeInfo, setexchangeInfo] = useState<Apply>();
  /* 从URL参数中读取工单ID */
  const { applyId }: { applyId: string } = useParams();

  const [pass, setpass] = useState('通过');
  const [reject, setreject] = useState('驳回');
  const initData = async () => {
    const res = await getExchangeApplyById(applyId);
    if (res.code == 200) {
      setexchangeInfo(res.data);
      setexchangeStatus(res.data.status);
    }
  };

  //点击通过、驳回改变状态
  const changePassStatus = () => {
    window.location.href = '/admin/prize/agree/' + applyId;
    setexchangeStatus(2);
    setpass('已通过');
    setisRejectLoading(false);
  };
  //驳回
  const changeRejectStatus = async () => {
    const res = await updateExcheangeApply(Number(applyId), 3);
    if (res.code == 200) {
      window.location.href = '/admin/rewards';
    } else {
      dingAlert('操作失败', '错误', '关闭');
      window.location.href = '/admin/rewards';
    }
    setreject('已驳回');
    setisPassLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Page title="兑换详情">
      <Box marginBottom={1.5}>
        <Paper elevation={0} square>
          <Box padding={1.5}>
            <Box marginBottom={1}>
              <Typography variant="caption">
                {exchangeInfo?.exchange_user_name}的奖品兑换
              </Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="h6">{exchangeInfo?.prize_name}</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="subtitle1" gutterBottom>
                所需积分：{exchangeInfo?.need_integral}
              </Typography>
            </Box>
            <Grid
              justifyContent="space-between"
              style={{ display: 'block' }}
              container
            >
              <Typography
                variant="body2"
                component="p"
                style={{ color: 'red' }}
              >
                {moment(exchangeInfo?.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            </Grid>
          </Box>
          <CardActions>
            <Grid justifyContent="space-between" alignItems="center" container>
              <StatusIcon exchangeStatus={exchangeStatus} status={5} />
            </Grid>
          </CardActions>
        </Paper>
      </Box>
      {isPassLoading ? (
        <Box margin={1.5}>
          <Button
            variant="outlined"
            color="primary"
            className={commonStyle.whiteBackground}
            fullWidth
            onClick={changePassStatus}
          >
            {pass}
          </Button>
        </Box>
      ) : null}
      {isRejectLoading ? (
        <Box margin={1.5}>
          <Button
            variant="outlined"
            color="primary"
            onClick={changeRejectStatus}
            className={commonStyle.whiteBackground}
            // disabled={isLoading}
            fullWidth
          >
            {reject}
          </Button>
        </Box>
      ) : null}
    </Page>
  );
}
