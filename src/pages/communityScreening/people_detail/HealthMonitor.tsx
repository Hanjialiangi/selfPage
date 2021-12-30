import React, { useState, useEffect } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Input,
  Paper,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import moment from 'moment';
import { InputLabel } from '@material-ui/core';
// import { getCreateHealth } from '@src/api';
// import { useParams } from 'react-router';
// import { dingAlert } from '@src/dingtalkAPI';
// import { getURL } from '@src/utils';
import StyleRadio from '@components/jk_layout/StyleRadio';

export default function HealthMonitorPage(): JSX.Element {
  //const param: { id: string } = useParams(); //获取参数
  const [time, setTime] = useState(''); //统一采样时间
  const [healthState, sethealthState] = useState({
    is_required: '是',
    others: ''
  });

  //单选框集成
  const Radio = (props: { name: string; value: string }) => {
    return (
      <RadioGroup
        row
        aria-label="gender"
        name={props.name}
        value={props.value}
        onChange={updateDetail}
      >
        <FormControlLabel value="是" control={<StyleRadio />} label="是" />
        <FormControlLabel value="否" control={<StyleRadio />} label="否" />
      </RadioGroup>
    );
  };
  const updateDetail = (e: any) => {
    sethealthState({
      ...healthState,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    setTime(moment().format('YYYY-MM-DDTHH:mm'));
  }, []);
  return (
    <Page title="上报健康状况">
      <Paper elevation={0} square>
        <Box marginY={0.2} padding={1.5}>
          <div className="flex">
            <InputLabel
              style={{
                textAlign: 'center',
                marginTop: '7px',
                color: '#000000'
              }}
            >
              <span style={{ color: '#1790FF' }}>*</span>第一次测量体温
            </InputLabel>
            <Input placeholder="请输入" disableUnderline multiline />
            <span style={{ lineHeight: '30px' }}>℃</span>
          </div>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>第一次测量时间
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
        <Box marginY={0.2} padding={1.5}>
          <div className="flex">
            <InputLabel
              style={{
                textAlign: 'center',
                marginTop: '7px',
                color: '#000000'
              }}
            >
              <span style={{ color: '#1790FF' }}>*</span>第二次测量体温
            </InputLabel>
            <Input placeholder="请输入" disableUnderline multiline />
            <span style={{ lineHeight: '30px' }}>℃</span>
          </div>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>第二次测量时间
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
        <Box marginY={0.2} padding={1.5}>
          <div className="flex">
            <InputLabel
              style={{
                textAlign: 'center',
                marginTop: '10px',
                color: '#000000'
              }}
            >
              <span style={{ color: '#1790FF' }}>*</span>是否按要求健康监测
            </InputLabel>
            <Radio name="is_required" value={healthState.is_required} />
          </div>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={0.2} padding={1.5}>
          <InputLabel style={{ color: '#000000' }}>
            <span style={{ color: '#1790FF' }}>*</span>备注
          </InputLabel>
          <FormControl fullWidth>
            <Input
              name="other_health_case"
              onChange={updateDetail}
              placeholder="请填写"
              minRows={4}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Box marginY={1.5} padding={1.5} marginTop={4}>
        <Button
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
          <span style={{ fontSize: '16px' }}>确认提交</span>
        </Button>
      </Box>
    </Page>
  );
}
