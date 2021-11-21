import React, { useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Input,
  Paper,
  Button,
  Select,
  Grid,
  MenuItem,
  FormControl
} from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
export default function HealthPage(): JSX.Element {
  //健康状态：1是 2否
  const [healthState, sethealthState] = useState({
    cough: 2,
    fever: 2,
    fatigue: 2
  });
  const [instruction, setinstruction] = useState('');
  const updateDetail = (e: any) => {
    sethealthState({
      ...healthState,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = () => {
    console.log(healthState);
    console.log(instruction);
  };
  return (
    <Page title="上报采样结果">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <Grid container spacing={2}>
            <Grid xs={5}>
              <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
                是否咳嗽症状:
              </InputLabel>
            </Grid>
            <Grid xs={6}>
              <Select defaultValue={2} name={'cough'} onChange={updateDetail}>
                <MenuItem value={1}>是</MenuItem>
                <MenuItem value={2}>否</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <Grid container spacing={2}>
            <Grid xs={5}>
              <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
                是否发烧症状:
              </InputLabel>
            </Grid>
            <Grid xs={6}>
              <Select defaultValue={2} name={'fever'} onChange={updateDetail}>
                <MenuItem value={1}>是</MenuItem>
                <MenuItem value={2}>否</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <Grid container spacing={2}>
            <Grid xs={5}>
              <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
                是否乏力症状:
              </InputLabel>
            </Grid>
            <Grid xs={6}>
              <Select defaultValue={2} name={'fatigue'} onChange={updateDetail}>
                <MenuItem value={1}>是</MenuItem>
                <MenuItem value={2}>否</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>其他健康状况说明</InputLabel>
          <FormControl fullWidth>
            <Input
              name="detectDate"
              onChange={e => {
                setinstruction(e.target.value);
              }}
              placeholder="请填写"
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
