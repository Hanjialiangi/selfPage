import Page from '@components/layout/Page';
import { Box, Button, Input, InputLabel, Paper } from '@material-ui/core';
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
        <Box marginY={1.5} padding={1.5}>
          <div className="flex">
            <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
              转归信息:
            </InputLabel>
            <Input
              name="overcome"
              placeholder="请填写转归理由"
              minRows={2}
              maxRows={600}
              disableUnderline
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
            onClick={handleSubmit}
          >
            确认转归
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}
