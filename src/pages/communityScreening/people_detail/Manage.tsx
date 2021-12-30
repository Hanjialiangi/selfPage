import Page from '@components/layout/Page';
import {
  Box,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Button
} from '@material-ui/core';
import React, { useState } from 'react';

export default function Manage(): JSX.Element {
  const [manage, setManage] = useState('7天居家隔离'); //默认管控措施
  const [source, setSource] = useState('境外人员'); //属性

  //处理提交
  const handleSubmit = () => {};
  return (
    <Page title="管控措施">
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>来源
          </InputLabel>
          <FormControl fullWidth>
            <Select
              name="source"
              value={source}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setSource(e.target.value);
              }}
            >
              <option value="境外人员">境外人员</option>
              <option value="中高风险">中高风险</option>
              <option value="密接/次密接">密接/次密接</option>
            </Select>
          </FormControl>
        </Box>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>管控措施
          </InputLabel>
          <FormControl fullWidth>
            <Select
              name="manage"
              value={manage}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setManage(e.target.value);
              }}
            >
              <option value="7天居家隔离">7天居家隔离</option>
              <option value="14天居家隔离">14天居家隔离</option>
              <option value="7天健康监测">7天健康监测</option>
              <option value="14天健康监测">14天健康监测</option>
            </Select>
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
          style={{
            background: '#1790FF',
            color: '#FFFFFF',
            height: '47px'
          }}
        >
          <span style={{ fontSize: '16px' }}>确认管控</span>
        </Button>
      </Box>
    </Page>
  );
}
