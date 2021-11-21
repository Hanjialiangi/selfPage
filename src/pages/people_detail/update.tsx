import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, Button, Grid, Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Page from '@components/layout/Page';
export default function FixInfo(): JSX.Element {
  const [detail, setdetail] = useState({
    fillDate: '',
    sourceAttribute: '',
    dataSource: '',
    personAttribute: '',
    relatedEvent: '',
    relatedCase: '',
    associatedContace: '',
    contactForm: '',
    lastContaceTime: '',
    name: '',
    IDCard: '',
    gender: '',
    age: '',
    phone: '',
    transferAddress: '',
    homeAddress: '',
    region: '',
    street: '',
    hotel: '',
    managementState: '',
    abnormalState: '',
    isolationDate: '',
    roomNumber: '',
    expectSamplingDate: '',
    actualSamplingDate: '',
    samplingResult: '',
    transferTime: '',
    Hospital: '',
    removeDate: '',
    homeManagementTime: '',
    secondSamplingResult: '',
    seventhSamplingResult: '',
    finishDate: '',
    outcome: ''
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateDetail = (e: any) => {
    setdetail({
      ...detail,
      [e.target.name]: e.target.value
    });
  };
  //初始化
  // const initDetail = () => {};
  const signOrder = () => {};
  useEffect(() => {
    // initDetail();
  });
  return (
    <Page title="修改信息">
      <Paper elevation={0} square>
        {/* <Box padding={1.4}> */}
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>填报日期：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    fullWidth
                    name="fillDate"
                    onChange={updateDetail}
                    value={detail.fillDate}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>来源属性：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="sourceAttribute"
                    defaultValue={detail.sourceAttribute}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>数据来源：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="dataSource"
                    defaultValue={detail.dataSource}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>人员属性：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="personAttribute"
                    defaultValue={detail.personAttribute}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>关联事件：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="relatedEvent"
                    defaultValue={detail.relatedEvent}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>关联病例：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="relatedCase"
                    defaultValue={detail.relatedCase}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>关联密接：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="associatedContace"
                    defaultValue={detail.associatedContace}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>接触方式：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="contactForm"
                    defaultValue={detail.contactForm}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>最后接触时间：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="lastContaceTime"
                    defaultValue={detail.lastContaceTime}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>姓名：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="name"
                    defaultValue={detail.name}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>性别：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="gender"
                    defaultValue={detail.gender}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>年龄：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="age"
                    defaultValue={detail.age}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>身份证号：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="IDCard"
                    defaultValue={detail.IDCard}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>联系电话：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="phone"
                    defaultValue={detail.phone}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>转运地址：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="transferAddress"
                    defaultValue={detail.transferAddress}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>家庭住址：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="homeAddress"
                    defaultValue={detail.homeAddress}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>所属区域：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="region"
                    defaultValue={detail.region}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>所属街道：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="street"
                    defaultValue={detail.street}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>预计隔离酒店：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="hotel"
                    defaultValue={detail.hotel}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>管理状态：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="managementState"
                    defaultValue={detail.managementState}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>接收异常状态：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="abnormalState"
                    defaultValue={detail.abnormalState}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>纳入隔离日期：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="isolationDate"
                    defaultValue={detail.isolationDate}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>实际入驻酒店寄房间号：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="roomNumber"
                    defaultValue={detail.roomNumber}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>预计采样日期：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="expectSamplingDate"
                    defaultValue={detail.expectSamplingDate}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>实际采样日期：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="actualSamplingDate"
                    defaultValue={detail.actualSamplingDate}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>采样结果：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="samplingResult"
                    defaultValue={detail.samplingResult}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>转院时间：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="transferTime"
                    defaultValue={detail.transferTime}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>医院名称：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="Hospital"
                    defaultValue={detail.Hospital}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>预计解除日期：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="removeDate"
                    defaultValue={detail.removeDate}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>
                    密接解除后纳入居家管理时间：
                  </span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="homeManagementTime"
                    defaultValue={detail.homeManagementTime}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>第二天采样结果：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="secondSamplingResult"
                    defaultValue={detail.secondSamplingResult}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>第七天采样结果：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="seventhSamplingResult"
                    defaultValue={detail.seventhSamplingResult}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>结束管理日期：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="finishDate"
                    defaultValue={detail.finishDate}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Card>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Typography variant="body1">
                  <span style={{ color: 'gray' }}>转归：</span>
                </Typography>
              </Grid>
              <Grid xs={8}>
                <Typography variant="body1">
                  <Input
                    onChange={updateDetail}
                    fullWidth
                    name="outcome"
                    defaultValue={detail.outcome}
                  />
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Card>
        {/* </Box> */}
        <Card>
          <Box margin={1.4}>
            <Button
              variant="outlined"
              color="primary"
              onClick={signOrder}
              // className={commonStyle.whiteBackground}
              // disabled={isLoading}
              fullWidth
            >
              确认并修改
            </Button>
          </Box>
        </Card>
      </Paper>
    </Page>
  );
}
