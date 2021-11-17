import React, { useState, useEffect } from 'react';
import Page from '@components/layout/Page';
import commonStyle from '@styleModules/common.module.scss';
import StatusIcon from '@components/StatusIcon';
import TextField from '@material-ui/core/TextField';
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
import {
  addExcheangeApply,
  getPrizeDetail,
  updateExcheangeApply
} from '@src/api';
import { useParams } from 'react-router-dom';
type Prize = {
  id: number;
  name: string;
  number: string;
  status: number;
  need_integral: number;
  limit_number: number;
  created_at: string;
};

export default function ApplyReward(): JSX.Element {
  const [isPassLoading, setisPassLoading] = useState(true);
  const [prizeInfo, setexchangeInfo] = useState<Prize>();
  /* 从URL参数中读取工单ID */
  const { prizeId }: { prizeId: string } = useParams();
  const [number, setNumber] = useState(1);
  const initData = async () => {
    const res = await getPrizeDetail(prizeId);
    if (res.code == 200) {
      setexchangeInfo(res.data);
    }
  };
  //点击申请 添加兑换申请
  const changePassStatus = async () => {
    if (prizeInfo) {
      if (number > prizeInfo.limit_number) {
        dingAlert('每次兑换数量不能大于限制数量', '错误', '关闭');
        return;
      }
      const res = await addExcheangeApply(
        Number(prizeId),
        prizeInfo.name,
        number,
        prizeInfo.need_integral * number
      );
      if (res.code == 200) {
        window.location.href = '/expert/rewardsindex';
      } else {
        dingAlert('申请失败', '错误', '关闭');
      }
    }
    setisPassLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Page title="兑换">
      <Box marginBottom={1.5}>
        <Paper elevation={0} square>
          <Box padding={1.5}>
            <Box marginBottom={2}>
              <Typography variant="h6">{prizeInfo?.name}</Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="subtitle1" gutterBottom>
                每份所需积分：{prizeInfo?.need_integral}
              </Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="subtitle1" gutterBottom>
                每份限制兑换数量：{prizeInfo?.limit_number}
              </Typography>
            </Box>
            <Box marginBottom={2}>
              <Typography variant="subtitle1" gutterBottom>
                兑换数量：
                <TextField
                  id="outlined-number"
                  label="请输入兑换数量"
                  onChange={e => {
                    setNumber(Number(e.target.value));
                  }}
                  type="number"
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                />
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
                {moment(prizeInfo?.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Typography>
            </Grid>
          </Box>
          <CardActions></CardActions>
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
            申请
          </Button>
        </Box>
      ) : null}
    </Page>
  );
}
