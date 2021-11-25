import React, { useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Input, FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { getHotelReceive } from '@src/api';
import { useParams } from 'react-router-dom';

export default function Arrive(): JSX.Element {
  const hotel_name =""; 
  const param: {id: string} = useParams(); //获取路由参数
  //点击接收功能
  const handleSubmit = async () => {
    const res = await getHotelReceive(param.id,hotel_name);
    if (res.data == 200) {
    }
  };

  const date = new Date();
  const time =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();
  const release_time = '';
  return (
    <Page title="接收并开始隔离">
      <form
        noValidate
        autoComplete="off"
        style={{ paddingBottom: '10px' }}
        onSubmit={handleSubmit}
      >
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel>隔离时间</InputLabel>
            <FormControl fullWidth>
              <Input
                defaultValue={time}
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
            <InputLabel>隔离地址</InputLabel>
            <FormControl fullWidth>
              <Input
                placeholder="请填写隔离地址"
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
            <InputLabel>隔离房间号</InputLabel>
            <FormControl fullWidth>
              <Input
                placeholder="请填写隔离房间号"
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
            <InputLabel>预计接触隔离时间</InputLabel>
            <FormControl fullWidth>
              <Input
                name=""
                placeholder="请填写预计解除隔离时间"
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
              fullWidth
            >
              确认隔离
            </Button>
          </Box>
        </Paper>
      </form>
    </Page>
  );
}
