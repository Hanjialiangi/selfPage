import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Input,
  FormControl,
  Select,
  Grid
} from '@material-ui/core';
import { getResidentInfo, getFixResidentInfo } from '@src/api';
import { Properties } from '@pages/people_detail/Index';
import { getURL, isValidKey } from '@src/utils';
import { dingAlert } from '@src/dingtalkAPI';

export default function FixInfo(props: {
  id: string;
  role: string;
}): JSX.Element {
  const [detail, setDetail] = useState<Properties[]>();

  const [residentValue, setResidentValue] = useState(''); //人员属性
  const [quarantineValue, setQuarantineValue] = useState(''); //隔离方式
  //初始化
  const initDetail = async () => {
    const res = await getResidentInfo(props.id, props.role);
    if (res.code === 200) {
      setDetail(res.data);
      res.data.map((item: Properties) => {
        if (item.key === 'resident_property') {
          setResidentValue(item.value);
        }
        if (item.key === 'quarantine_type') {
          setQuarantineValue(item.value);
        }
      });
    }
  };

  //提交动作
  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form: any = {};
    detail?.map(item => {
      Object.assign(form, { [item.key]: formData.get(`${item.key}`) });
    });
    const formvalue = [];
    for (const index in form) {
      if (isValidKey(index, form)) {
        formvalue.push({ key: index, value: form[index] });
      }
    }
    const res = await getFixResidentInfo(props.id, formvalue);
    if (res.code === 200) {
      dingAlert('修改成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${props.id}`);
    } else {
      dingAlert('修改失败', '错误', '确认');
    }
  };

  //修改人员属性
  const handleChangeContanct = (e: any) => {
    setResidentValue(e.target.value);
  };
  useEffect(() => {
    initDetail();
  }, []);
  return (
    <div>
      <form onSubmit={submit}>
        {detail?.map((item: Properties, index: number) => {
          if (item.key === 'current_state') {
            return null;
          }
          if (item.key === 'resident_property') {
            return (
              <Paper elevation={0} square key={index}>
                <Box marginY={0.2} padding={0.5}>
                  <Grid container spacing={2} style={{ width: '100%' }}>
                    <Grid item xs={5}>
                      <FormControl
                        style={{
                          textAlign: 'center',
                          lineHeight: '30px',
                          marginLeft: '7%'
                        }}
                      >
                        {item.key_name}
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <Select
                        name="resident_property"
                        native
                        value={residentValue}
                        onChange={handleChangeContanct}
                      >
                        <option aria-label="None" value="">
                          无
                        </option>
                        <option value="密接">密接</option>
                        <option value="次密接">次密接</option>
                      </Select>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            );
          }
          if (item.key === 'quarantine_type') {
            return (
              <Paper elevation={0} square key={index}>
                <Box marginY={0.2} padding={0.5}>
                  <Grid container spacing={2} style={{ width: '100%' }}>
                    <Grid item xs={5}>
                      <FormControl
                        style={{
                          textAlign: 'center',
                          lineHeight: '30px',
                          marginLeft: '7%'
                        }}
                      >
                        {item.key_name}
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <Select
                        name="quarantine_type"
                        native
                        value={quarantineValue}
                        onChange={(e: any) => {
                          setQuarantineValue(e.target.value);
                        }}
                      >
                        <option aria-label="None" value="">
                          无
                        </option>
                        <option value="集中隔离">集中隔离</option>
                        <option value="居家隔离">居家隔离</option>
                      </Select>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            );
          }
          return (
            <Paper elevation={0} square key={index}>
              <Box marginY={0.2} padding={0.5}>
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={5}>
                    <FormControl
                      style={{
                        lineHeight: '30px',
                        marginLeft: '7%'
                      }}
                    >
                      {item.key_name}
                    </FormControl>
                  </Grid>
                  <Grid item xs={7}>
                    <Input
                      name={item.key}
                      placeholder="请输入内容"
                      defaultValue={item.value}
                      disableUnderline
                      multiline
                      fullWidth
                      style={{ textAlign: 'center', fontSize: '16px' }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          );
        })}
        {/* </Box> */}
        <Box
          margin={0.5}
          paddingTop={0.5}
          marginBottom={5}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            type="submit"
            variant="outlined"
            style={{
              background: '#1790FF',
              color: '#FFFFFF',
              width: '95%',
              height: '47px'
            }}
          >
            确认并修改
          </Button>
        </Box>
      </form>
    </div>
  );
}
