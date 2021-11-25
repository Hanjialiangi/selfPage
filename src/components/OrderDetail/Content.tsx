import React, { useState, useEffect, useCallback } from 'react';
import { Paper, Box, Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import FileList from '@components/FileList';
import { InfoDetailIcon } from '@src/assets/svg/picture';
import { dingCopy, dingToast } from '@src/dingtalkAPI';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

type Props = {
  hotel: string;
  children: string;
  isolateMethod: string;
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
  transferAddress: string;
  homeAddress: string;
  region: string;
  street: string;
  relatedIDCard: string;
  relatedPhone: string;
};

export default function OrderDetailContent({
  children,
  hotel,
  transferAddress,
  homeAddress,
  region,
  street,
  relatedIDCard,
  relatedPhone,
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
  outcome,
  isolateMethod
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
  const [showTag, setshowTag] = useState(true);
  const [CardHeight, setCardHeight] = useState('178px');
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  return (
    <Box marginBottom={1} margin={1.5}>
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
      <Paper
        style={{
          height: `${CardHeight}`,
          position: 'relative',
          paddingBottom: '10px'
        }}
        onClick={() => {
          setshowTag(!showTag);
          if (CardHeight == '178px') {
            setCardHeight('100%');
          } else if (CardHeight == '100%') {
            setCardHeight('178px');
          }
        }}
        elevation={0}
        square
      >
        <Box margin={1.5}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography variant="body2">
                <span style={{ color: 'gray' }}>转运地址：</span>
                {transferAddress}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box margin={1.5}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography variant="body2">
                <span style={{ color: 'gray' }}>家庭住址：</span>
                {homeAddress}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box margin={1.5}>
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
        <Box margin={1.5}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography variant="body2">
                <span style={{ color: 'gray' }}>关联密接身份证号：</span>
                {relatedIDCard}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box margin={1.5}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography variant="body2">
                <span style={{ color: 'gray' }}>关联密接电话号码：</span>
                {relatedPhone}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box margin={1.5}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography variant="body2">
                <span style={{ color: 'gray' }}>预计隔离酒店：</span>
                {hotel}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>隔离方式：</span>
                  {isolateMethod}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>接收异常状态：</span>
                  {abnormalState}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>纳入隔离日期：</span>
                  {isolationDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>实际入驻酒店寄房间号：</span>
                  {roomNumber}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计采样日期：</span>
                  {expectSamplingDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>实际采样日期：</span>
                  {actualSamplingDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计采样日期：</span>
                  {expectSamplingDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
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
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>转院时间：</span>
                  {transferTime}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>预计解除日期：</span>
                  {removeDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
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
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>第二天采样结果：</span>
                  {secondSamplingResult}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>第七天采样结果：</span>
                  {seventhSamplingResult}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>结束管理日期：</span>
                  {finishDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
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

        <div
          style={{
            textAlign: 'center',
            width: '100%',
            position: 'absolute',
            bottom: '-8px',
            backgroundColor: 'white'
          }}
        >
          {showTag ? '查看更多' : '收回更多'}&nbsp;
          <InfoDetailIcon />
        </div>

        {/* <FileList files={files} /> */}
      </Paper>
    </Box>
  );
}
