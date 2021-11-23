import React, { useState } from 'react';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Input, FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { getCreateHotelResident } from '@src/api';

export default function Arrive(): JSX.Element {
  const [isolation, setisolation] = useState('');
  const handleSubmit = async () => {
    const res = await getCreateHotelResident();
    if (res.data == 200) {
      res.data.address = isolation;
    }
    console.log(isolation);
  };

  const date = new Date();
  const time =
    date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();

  return (
    <Page title="接收并开始隔离">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>隔离时间</InputLabel>
          <FormControl fullWidth>
            <Input
              onChange={e => {
                setisolation(e.target.value);
              }}
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
              onChange={e => {
                setisolation(e.target.value);
              }}
              placeholder="请填写隔离地址"
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      {/* <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>隔离备注</InputLabel>
          <FormControl fullWidth>
            <Input
              onChange={e => {
                setisolation(e.target.value);
              }}
              placeholder="请填写隔离备注"
              minRows={7}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper> */}
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            // disabled={isLoading}
            disableElevation
            fullWidth
          >
            确认隔离
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}
