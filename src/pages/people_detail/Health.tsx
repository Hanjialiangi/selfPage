import React, { useState } from 'react';
import Page from '@components/layout/Page';
import {
  Box,
  Input,
  Paper,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { getCreateHealth } from '@src/api';
import { useParams } from 'react-router';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL } from '@src/utils';
import StyleRadio from '@components/jk_layout/StyleRadio';

export default function HealthPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取参数

  const [healthState, sethealthState] = useState({
    is_cough: '否',
    is_fever: '否',
    is_weak: '否',
    other_health_case: ''
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
  const handleSubmit = async () => {
    const res = await getCreateHealth(
      param.id,
      healthState.is_cough,
      healthState.is_fever,
      healthState.is_weak,
      healthState.other_health_case
    );
    if (res.code === 200) {
      dingAlert('上传成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };
  return (
    <Page title="上报健康状况">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <div className="flex">
            <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
              是否咳嗽症状:
            </InputLabel>
            <Radio name="is_cough" value={healthState.is_cough} />
          </div>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <div className="flex">
            <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
              是否发烧症状:
            </InputLabel>
            <Radio name="is_fever" value={healthState.is_fever} />
          </div>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <div className="flex">
            <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
              是否乏力症状:
            </InputLabel>
            <Radio name="is_weak" value={healthState.is_weak}></Radio>
          </div>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>其他健康状况说明</InputLabel>
          <FormControl fullWidth>
            <Input
              name="other_health_case"
              onChange={updateDetail}
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
          disableElevation
          fullWidth
        >
          确认提交
        </Button>
      </Box>
    </Page>
  );
}
