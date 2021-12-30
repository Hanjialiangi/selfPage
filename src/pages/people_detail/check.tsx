import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Paper,
  Button,
  FormControl,
  Select,
  InputLabel
} from '@material-ui/core';
import { useParams } from 'react-router';

export default function TransferCommunity(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [investigation, setInvestigation] = useState(); //设置排查

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  //初始化
  const Init = async () => {
    console.log(param.id);
  };
  useEffect(() => {
    Init();
  }, []);
  return (
    <Page title="人员排查">
      <form onSubmit={handleSubmit}>
        <Paper elevation={0} square>
          <Box padding={1.5}>
            <InputLabel>
              <span style={{ color: '#1790FF' }}>*</span>社区排查
            </InputLabel>
            <FormControl fullWidth>
              <Select
                name="investigation"
                value={investigation}
                native
                style={{ display: 'flex' }}
                onChange={(e: any) => {
                  setInvestigation(e.target.value);
                }}
              >
                <option value="重点人员中移除">重点人员中移除</option>
                <option value="按重点人员处理">按重点人员处理</option>
                <option value="流转到所属社区">流转到所属社区</option>
              </Select>
            </FormControl>
          </Box>
        </Paper>
        <Box marginY={1.5} padding={1.5}>
          <Button
            type="submit"
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
            <span style={{ fontSize: '16px' }}>确认排查</span>
          </Button>
        </Box>
      </form>
    </Page>
  );
}
