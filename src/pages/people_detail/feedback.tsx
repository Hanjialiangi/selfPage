import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Input,
  Paper,
  Button,
  FormControl,
  Select
} from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { useParams } from 'react-router';
// import { dingAlert } from '@src/dingtalkAPI';
// import { getURL } from '@src/utils';

export default function HealthPage(): JSX.Element {
  const param: { id: string; type: string } = useParams(); //获取参数

  const [problemType, setProblemType] = useState('不属于本区管控'); //设置问题类别
  const [otherProblem, setOtherProblem] = useState(''); //其他问题描述

  const handleSubmit = async () => {
    console.log(param.id);
  };
  useEffect(() => {
    if (param.type) {
      setProblemType('预计酒店容量不足');
    }
  }, []);
  return (
    <Page>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>问题类别</InputLabel>
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
              <option value="未找到该人员">未找到该人员</option>
              <option value="不属于本区管控">不属于本区管控</option>
              <option value="预计酒店容量不足">预计酒店容量不足</option>
              <option value="其他">其他</option>
            </Select>
          </FormControl>
        </Box>
      </Paper>
      {problemType === '其他' && (
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>问题反馈说明</InputLabel>
            <FormControl fullWidth>
              <Input
                name="describle"
                onChange={e => setOtherProblem(e.target.value)}
                placeholder="请填写问题"
                minRows={6}
                maxRows={600}
                disableUnderline
                multiline
              />
            </FormControl>
          </Box>
        </Paper>
      )}
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
