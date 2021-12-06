import Page from '@components/layout/Page';
import { Box, Button, Input, InputLabel, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import { useParams } from 'react-router';

export default function TransferHospital(): JSX.Element {
  const param: { id: string } = useParams();
  const [value, setValue] = useState(); //设置属性值

  const handleSubmit = () => {
    //TODO:接口改变转运医院信息
    console.log(param.id, value);
  };
  return (
    <Page title="转院">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <div className="flex">
            <InputLabel style={{ textAlign: 'center', marginTop: '10px' }}>
              转院信息:
            </InputLabel>
            <Input
              name="hospital"
              placeholder="请填写医院名称"
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
            确认转院
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}
