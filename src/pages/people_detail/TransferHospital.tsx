import Page from '@components/layout/Page';
import { Box, Button, Input, InputLabel, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { transferHospital } from '@src/api';
import moment from 'moment';
import { getURL } from '@src/utils';
import { dingAlert } from '@src/dingtalkAPI';

export default function TransferHospital(): JSX.Element {
  const param: { id: string } = useParams();
  const [value, setValue] = useState(''); //设置属性值

  const handleSubmit = async () => {
    //TODO:接口改变转运医院信息
    const res = await transferHospital(
      param.id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      value
    );
    if (res.code === 200) {
      dingAlert('转院成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };
  return (
    <Page title="转院">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <div className="flex">
            <InputLabel style={{ textAlign: 'center', marginTop: '8px' }}>
              <span style={{ color: '#1790FF' }}>*</span>转院信息:
            </InputLabel>
            <Input
              name="hospital"
              placeholder="请填写医院名称"
              minRows={2}
              maxRows={600}
              multiline
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
            />
          </div>
        </Box>
        <Box marginY={1.5} padding={1.5}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
            style={{
              background: '#1790FF',
              color: '#FFFFFF',
              height: '47px'
            }}
            onClick={handleSubmit}
          >
            确认转院
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}
