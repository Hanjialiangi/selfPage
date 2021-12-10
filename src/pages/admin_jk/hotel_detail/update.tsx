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
import { useParams } from 'react-router-dom';
import { dingAlert } from '@src/dingtalkAPI';
import { getURL, isValidKey } from '@src/utils';
import { getHotelDetailInfo, updateHotelInfo } from '@src/api';

export default function UpdatePage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数
  const [detail, setDetail] = useState({
    address: '',
    available_number: '',
    capacity: '',
    name: ''
  });
  const Init = async () => {
    const res = await getHotelDetailInfo(param.id);
    if (res.code === 200) {
      setDetail(res.data);
    }
  };
  //提交
  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form: any = {};
    Object.keys(detail).map(key => {
      Object.assign(form, { [key]: formData.get(`${key}`) });
    });
    const res = await updateHotelInfo(param.id, form);
    if (res.code === 200) {
      dingAlert('修改成功', '正确', '确认');
      window.location.href = getURL(`/detail/hotel/${param.id}`);
    }
  };

  useEffect(() => {
    Init();
  }, []);
  return (
    <Page title="修改酒店信息">
      <form onSubmit={submit}>
        {Object.keys(detail).map(key => {
          return (
            <Paper elevation={0} square key={key}>
              <Box marginY={0.5} padding={0.5}>
                <Grid container spacing={2} style={{ width: '100%' }}>
                  <Grid item xs={5}>
                    <FormControl
                      style={{
                        lineHeight: '30px',
                        marginLeft: '7%'
                      }}
                    >
                      {key}
                    </FormControl>
                  </Grid>
                  <Grid item xs={7}>
                    <Input
                      name={key}
                      placeholder="请输入内容"
                      defaultValue={isValidKey(key, detail) && detail[key]}
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
            color="primary"
            fullWidth
          >
            确认并修改
          </Button>
        </Box>
      </form>
    </Page>
  );
}
