import React, { useEffect, useState } from 'react';
import { Box, InputLabel, FormControl, Input, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { dingAlert } from '@src/dingtalkAPI';
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
export default function Agree(): JSX.Element {
  const [option, setOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  /* 从URL参数中读取工单ID */
  const { applyId }: { applyId: string } = useParams();
  const [rewardsInfo, setrewardsInfo] = useState<Apply>();
  const [pass, setpass] = useState('通过');
  const [reject, setreject] = useState('驳回');
  const initData = async () => {
    const res = await getExchangeApplyById(applyId);
    if (res.code == 200) {
      setrewardsInfo(res.data);
    }
  };
  const handleSubmit = async () => {
    if (option == '') {
      dingAlert('回复不能为空', '错误', '关闭');
      return;
    }
    const res = await updateExcheangeApply(Number(applyId), 2, option);
    if (res.code == 200) {
      window.location.href = '/admin/rewards';
    } else {
      dingAlert('回复失败', '错误', '关闭');
      window.location.href = '/admin/rewards';
    }
  };
  useEffect(() => {
    initData();
  }, []);
  return (
    <div>
      {rewardsInfo ? (
        <>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>兑奖人</InputLabel>
            <FormControl fullWidth>
              <Button disableElevation fullWidth>
                {rewardsInfo.exchange_user_name}
              </Button>
            </FormControl>
          </Box>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>奖品名称</InputLabel>
            <FormControl fullWidth>
              <Button disableElevation fullWidth>
                {rewardsInfo.prize_name}
              </Button>
            </FormControl>
          </Box>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>申请时间</InputLabel>
            <FormControl fullWidth>
              <Button disableElevation fullWidth>
                {moment(rewardsInfo.created_at).format('YYYY-MM-DD HH:mm:ss')}
              </Button>
            </FormControl>
          </Box>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>所需积分</InputLabel>
            <FormControl fullWidth>
              <Button disableElevation fullWidth>
                {rewardsInfo.need_integral}
              </Button>
            </FormControl>
          </Box>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>回复内容</InputLabel>
            <FormControl fullWidth>{rewardsInfo.feedback}</FormControl>
          </Box>
        </>
      ) : null}
    </div>
  );
}
