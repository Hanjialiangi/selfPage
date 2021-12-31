import Page from '@components/layout/Page';
import {
  Box,
  FormControl,
  InputLabel,
  Paper,
  TextField,
  RadioGroup,
  FormControlLabel,
  Button
} from '@material-ui/core';
import React, { useState } from 'react';
import moment from 'moment';
import StyleRadio from '@components/jk_layout/StyleRadio';

export default function Detect(): JSX.Element {
  const [checkTime, setCheckTime] = useState(
    moment().format('YYYY-MM-DDTHH:mm')
  ); //检测时间
  const [checkResult, setCheckResult] = useState('阴性'); //检测结果

  //单选框集成
  const Radio = (props: { name: string; value: string }) => {
    return (
      <RadioGroup
        style={{ justifyContent: 'end' }}
        row
        aria-label="gender"
        name={props.name}
        value={props.value}
        onChange={(e: any) => {
          setCheckResult(e.target.value);
        }}
      >
        <FormControlLabel value="阴性" control={<StyleRadio />} label="阴性" />
        <FormControlLabel value="阳性" control={<StyleRadio />} label="阳性" />
      </RadioGroup>
    );
  };

  //提交按钮
  const handleSubmit = () => {
    console.log(checkTime, checkResult);
  };
  return (
    <Page title="上报核酸检测结果">
      <Paper elevation={0} square>
        <Box padding={1.5} marginY={0.2}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>检测时间
          </InputLabel>
          <FormControl fullWidth>
            <TextField
              style={{
                textAlign: 'center',
                fontSize: '16px'
              }}
              name="check_time"
              type="datetime-local"
              onChange={(e: any) => {
                setCheckTime(e.target.value);
              }}
              value={checkTime}
              InputLabelProps={{
                shrink: true
              }}
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box padding={1.5} marginY={0.2}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>检测结果
          </InputLabel>
          <FormControl fullWidth>
            <Radio name="check_result" value={checkResult} />
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
          <span style={{ fontSize: '16px' }}>确认上报</span>
        </Button>
      </Box>
    </Page>
  );
}
