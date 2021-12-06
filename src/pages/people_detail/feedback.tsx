import React, { useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Input, Paper, Button, FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { getCreateHealth } from '@src/api';
import { useParams } from 'react-router';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';

export default function HealthPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取参数

  const [Feedback, setFeedback] = useState({
    problem: ''
  });

  const updateDetail = (e: any) => {
    setFeedback({
      ...Feedback,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
    const res = await getCreateHealth(param.id, Feedback.problem);
    if (res.code === 200) {
      dingAlert('上传成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };
  return (
    <Page>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>问题反馈说明</InputLabel>
          <FormControl fullWidth>
            <Input
              name="problem"
              onChange={updateDetail}
              placeholder="请填写问题"
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Box marginY={1.5} padding={1.5}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disableElevation
          fullWidth
        >
          确认反馈
        </Button>
      </Box>
    </Page>
  );
}
