import Page from '@components/layout/Page';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Input,
  FormControl,
  Grid
} from '@material-ui/core';
import { Properties } from './Index';
// import { getFixResidentInfo, getResidentInfo } from '@src/api';
import { useParams } from 'react-router-dom';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL, isValidKey } from '@src/utils';

export default function UpdatePage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [detail, setdetail] = useState<Properties[]>();
  const Init = async () => {
    // const res = await getResidentInfo(param.id);
    // if (res.code === 200) {
    //   setdetail(res.data);
    // }
  };
  //提交
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
    // const res = await getFixHotel(param.id, formvalue);
    // if (res.code === 200) {
    //   dingAlert('修改成功', '正确', '确认');
    //   window.location.href = getURL('');
    // } else {
    //   dingAlert('修改失败', '错误', '确认');
    // }
  };

  useEffect(() => {
    Init();
  }, []);
  return (
    <Page title="修改酒店信息">
      <form onSubmit={submit}>
        {detail?.map((item: Properties, index: number) => {
          <Paper elevation={0} square key={index}>
            <Box marginY={0.5} padding={0.5}>
              <Grid>
                <FormControl>{item.key_name}</FormControl>
              </Grid>
              <Grid>
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
            </Box>
          </Paper>;
        })}
        <Paper elevation={0} square>
          <Box margin={0.5} paddingTop={0.5}>
            <Button type="submit" variant="outlined" color="primary" fullWidth>
              确认并修改
            </Button>
          </Box>
        </Paper>
      </form>
    </Page>
  );
}
