import React, { useEffect, useCallback } from 'react';
import { Paper, Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FileList from '@components/FileList';
import { dingCopy, dingToast } from '@src/dingtalkAPI';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
  children:string;
  fillDate: string;
  sourceAttribute: string;
  dataSource: string;
  personAttribute: string;
  relatedEvent: string;
  relatedCase: string;
  associatedContace: string;
  contactForm: string;
  lastContaceTime: string;
  name: string;
  IDCard: string;
  gender: string;
  age: string;
  phone: string;
  transferAddress: string;
  homeAddress: string;
  region: string;
  street: string;
  hotel: string;
  managementState: string;
  abnormalState: string;
  isolationDate: string;
  roomNumber: string;
  expectSamplingDate: string;
  actualSamplingDate: string;
  samplingResult: string;
  transferTime: string;
  Hospital: string;
  removeDate: string;
  homeManagementTime: string;
  secondSamplingResult: string;
  seventhSamplingResult: string;
  finishDate: string;
  outcome: string;
};

export default function OrderDetailContent({
  children,
  fillDate,
  sourceAttribute,
  dataSource,
  personAttribute,
  relatedEvent,
  relatedCase,
  associatedContace,
  contactForm,
  lastContaceTime,
  name,
  IDCard,
  gender,
  age,
  phone,
  transferAddress,
  homeAddress,
  region,
  street,
  hotel,
  managementState,
  abnormalState,
  isolationDate,
  roomNumber,
  expectSamplingDate,
  actualSamplingDate,
  samplingResult,
  transferTime,
  Hospital,
  removeDate,
  homeManagementTime,
  secondSamplingResult,
  seventhSamplingResult,
  finishDate,
  outcome
}: Props): JSX.Element {
  // const handleCopySerialNumber = useCallback(async () => {
  //   try {
  //     await dingCopy(serialNumber);
  //     dingToast('复制成功');
  //   } catch (error) {
  //     console.error(error);
  //     dingToast('复制失败');
  //   }
  // }, [serialNumber]);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  return (
    <Box marginBottom={1.5}>
      {/* <Box sx={{ height: 300 }}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label="Show"
        />
        <Box
          sx={{
            '& > :not(style)': {
              display: 'flex',
              justifyContent: 'space-around',
              height: 120,
              width: 250
            }
          }}
        >
          <div>
            <Collapse in={checked} collapsedSize={60}>
              {icon}
            </Collapse>
          </div>
        </Box>
      </Box> */}
      <Paper elevation={0} square>
        <Box padding={1.5} marginTop={-3}>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>填报日期：</span>
                  {fillDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>来源属性：</span>
                  {sourceAttribute}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>数据来源：</span>
                  {dataSource}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>人员属性：</span>
                  {personAttribute}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>关联事件：</span>
                  {relatedEvent}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>关联病例：</span>
                  {relatedCase}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>关联密接：</span>
                  {associatedContace}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>接触方式：</span>
                  {contactForm}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>最后接触时间：</span>
                  {lastContaceTime}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>姓名：</span>
                  {name}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>性别：</span>
                  {gender}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>年龄：</span>
                  {age}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>身份证号：</span>
                  {IDCard}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>联系电话：</span>
                  {phone}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>转运地址：</span>
                  {transferAddress}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>家庭住址：</span>
                  {homeAddress}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>所属区域：</span>
                  {region}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>所属街道：</span>
                  {street}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>关联病例：</span>
                  {relatedCase}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>关联密接：</span>
                  {associatedContace}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计隔离酒店：</span>
                  {hotel}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>管理状态：</span>
                  {managementState}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>接收异常状态：</span>
                  {abnormalState}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>纳入隔离日期：</span>
                  {isolationDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>实际入驻酒店寄房间号：</span>
                  {roomNumber}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>接收异常状态：</span>
                  {abnormalState}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计采样日期：</span>
                  {expectSamplingDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>实际采样日期：</span>
                  {actualSamplingDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计采样日期：</span>
                  {expectSamplingDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>采样结果：</span>
                  {samplingResult}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>医院名称：</span>
                  {Hospital}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>转院时间：</span>
                  {transferTime}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计解除日期：</span>
                  {removeDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>
                    密接解除后纳入居家管理时间：
                  </span>
                  {homeManagementTime}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>第二天采样结果：</span>
                  {secondSamplingResult}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>第七天采样结果：</span>
                  {seventhSamplingResult}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>结束管理日期：</span>
                  {finishDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>转归：</span>
                  {outcome}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <FileList files={files} /> */}
      </Paper>
    </Box>
  );
}
