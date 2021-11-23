import React, { useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Input, FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { getCreateSampling } from '@src/api';

export default function SamplingResultPage(): JSX.Element {
  const [detect, setdetect] = useState({
    detectDate: '',
    detectResult: ''
  });
  const updateDetect = (e: any) => {
    setdetect({
      ...detect,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
    const res = await getCreateSampling();
    if (res.code == 200) {
      console.log(res.data);
      console.log(111);
    }
  };
  return (
    <Page title="上报采样结果">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>检测日期</InputLabel>
          <FormControl fullWidth>
            <Input
              name="detectDate"
              onChange={updateDetect}
              placeholder="请输入检测日期"
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>检测结果</InputLabel>
          <FormControl fullWidth>
            <Input
              name="detectResult"
              //   value={option}
              onChange={updateDetect}
              placeholder="请输入检测结果"
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
          // disabled={isLoading}
          disableElevation
          fullWidth
        >
          确认提交
        </Button>
      </Box>
    </Page>
  );
}
