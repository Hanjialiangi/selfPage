import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Select, FormControl } from '@material-ui/core';
import { InputLabel, TextField } from '@material-ui/core';
import { getCreateSampling } from '@src/api';
import { useParams } from 'react-router';
import moment from 'moment';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';

export default function SamplingResultPage(): JSX.Element {
  const [time, setTime] = useState(''); //统一采样时间
  const [samplingResult, setSamplingResult] = useState('阴性'); //采样结果

  const param: { id: string } = useParams(); //获取路由参数
  const handleSubmit = async () => {
    const planned_date = moment(time).format('YYYY-MM-DD HH:mm:ss');
    const sampling_date = moment(time).format('YYYY-MM-DD HH:mm:ss');
    const res = await getCreateSampling(
      param.id,
      planned_date,
      sampling_date,
      samplingResult
    );
    if (res.code === 200) {
      dingAlert('上传成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    } else {
      dingAlert(res.message, '错误', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };

  useEffect(() => {
    setTime(moment().format('YYYY-MM-DDTHH:mm'));
  }, []);
  return (
    <Page title="上报采样结果">
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>采样日期
          </InputLabel>
          <FormControl fullWidth>
            <TextField
              id="datetime-local"
              type="datetime-local"
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setTime(e.target.value);
              }}
              value={time}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>采样结果
          </InputLabel>
          <FormControl fullWidth>
            <Select
              name="sampling_result"
              value={samplingResult}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setSamplingResult(e.target.value);
              }}
            >
              <option value="阴性">阴性</option>
              <option value="阳性">阳性</option>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      <Box marginY={1.5} padding={1.5} marginTop={4}>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{
            background: '#1790FF',
            color: '#FFFFFF',
            height: '47px'
          }}
          disableElevation
          fullWidth
        >
          <span style={{ fontSize: '16px' }}>确认提交</span>
        </Button>
      </Box>
    </Page>
  );
}
