import React, { useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Paper, Button, FormControl, Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { useParams } from 'react-router';
import { uploadException } from '@src/api';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';

export default function HealthPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取参数

  const [problemType, setProblemType] = useState('不属于本区'); //设置问题类别

  const handleSubmit = async () => {
    const res = await uploadException(param.id, problemType);
    if (res.code === 200) {
      dingAlert('上报成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };

  return (
    <Page>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>异常类别
          </InputLabel>
          <FormControl fullWidth>
            <Select
              className="problem_type"
              value={problemType}
              native
              style={{ display: 'flex' }}
              onChange={(e: any) => {
                setProblemType(e.target.value);
              }}
            >
              <option value="联系不上">联系不上</option>
              <option value="不配合">不配合</option>
              <option value="不属于本区">不属于本区</option>
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
          style={{
            background: '#1790FF',
            color: '#FFFFFF',
            height: '47px'
          }}
          fullWidth
        >
          <span style={{ fontSize: '16px' }}>确认反馈</span>
        </Button>
      </Box>
    </Page>
  );
}
