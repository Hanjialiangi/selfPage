import Page from '@components/layout/Page';
import {
  Box,
  Button,
  Input,
  InputLabel,
  Paper,
  FormControl
} from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { transferBack } from '@src/api';
import moment from 'moment';
import { getURL } from '@src/utils';
import { dingAlert } from '@src/dingtalkAPI';

export default function TransferBack(): JSX.Element {
  const param: { id: string } = useParams();
  const [value, setValue] = useState(''); //设置属性值

  const handleSubmit = async () => {
    const res = await transferBack(
      param.id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      value
    );
    if (res.code === 200) {
      dingAlert('转归成功', '正确', '确认');
      window.location.href = getURL(`/detail/resident/${param.id}`);
    }
  };
  return (
    <Page title="转归">
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <InputLabel>
            <span style={{ color: '#1790FF' }}>*</span>转归信息:
          </InputLabel>
          <FormControl fullWidth>
            <Input
              name="overcome"
              onChange={(e: any) => {
                setValue(e.target.value);
              }}
              placeholder="请填写转归理由"
              minRows={4}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Box marginTop={4} padding={1.5}>
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
          <span style={{ fontSize: '16px' }}>确认转归</span>
        </Button>
      </Box>
    </Page>
  );
}
