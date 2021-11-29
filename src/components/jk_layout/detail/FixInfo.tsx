import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Input,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core';
import { getResidentInfo, getFixResidentInfo } from '@src/api';
import { Properties } from '@pages/people_detail/Index';
import { isValidKey } from '@src/utils';
import { dingAlert } from '@src/dingtalkAPI';

export default function FixInfo(props: { id: string }): JSX.Element {
  const [detail, setDetail] = useState<Properties[]>();

  const [residentValue, setResidentValue] = useState('');
  //初始化
  const initDetail = async () => {
    const res = await getResidentInfo(props.id);
    if (res.code === 200) {
      setDetail(res.data);
      res.data.map((item: Properties) => {
        if (item.key === 'resident_property') {
          setResidentValue(item.value);
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
      window.location.href = `/detail/resident/${props.id}`;
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
                <Box marginY={1.5} padding={1.5}>
                  <InputLabel>{item.key_name}</InputLabel>
                  <Select
                    name="resident_property"
                    native
                    defaultValue={residentValue}
                    onChange={handleChangeContanct}
                    style={{ marginLeft: '68%' }}
                  >
                    <option aria-label="None" value="">
                      无
                    </option>
                    <option value="密接">密切接触</option>
                    <option value="次密接">次密切接触</option>
                    <option value="一般接触者">一般接触者</option>
                    <option value="重点人员">重点人员</option>
                  </Select>
                </Box>
              </Paper>
            );
          }
          return (
            <Paper elevation={0} square key={index}>
              <Box marginY={1.5} padding={1.5}>
                <InputLabel>{item.key_name}</InputLabel>
                <FormControl fullWidth>
                  <Input
                    name={item.key}
                    placeholder="请输入内容"
                    defaultValue={item.value}
                    minRows={2}
                    maxRows={600}
                    disableUnderline
                    multiline
                  />
                </FormControl>
              </Box>
            </Paper>
          );
        })}
        {/* </Box> */}
        <Paper elevation={0} square>
          <Box margin={1.5} paddingTop={1.5}>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              确认并修改
            </Button>
          </Box>
        </Paper>
      </form>
    </div>
  );
}
