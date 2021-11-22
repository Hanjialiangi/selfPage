import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Input,
  InputLabel,
  FormControl
} from '@material-ui/core';
export default function FixInfoPage(): JSX.Element {
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
  const updateDetail = (e: any) => {
    setdetail({
      ...detail,
      [e.target.name]: e.target.value
    });
  };
  //初始化
  const initDetail = () => {};
  const signOrder = () => {};
  useEffect(() => {
    initDetail();
  });
  return (
    <div>
      {/* <Box padding={1.4}> */}
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>来源属性：</InputLabel>
          <FormControl fullWidth>
            <Input
              className="xiugai"
              name="sourceAttribute"
              onChange={updateDetail}
              value={detail.sourceAttribute}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>数据来源：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="dataSource"
              onChange={updateDetail}
              value={detail.dataSource}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>人员属性：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="personAttribute"
              onChange={updateDetail}
              value={detail.personAttribute}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>关联事件：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="relatedEvent"
              onChange={updateDetail}
              value={detail.relatedEvent}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>关联病例：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="relatedCase"
              onChange={updateDetail}
              value={detail.relatedCase}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>关联密接：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="associatedContace"
              onChange={updateDetail}
              value={detail.associatedContace}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>接触方式：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="contactForm"
              onChange={updateDetail}
              value={detail.contactForm}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>最后接触时间：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="lastContaceTime"
              onChange={updateDetail}
              value={detail.lastContaceTime}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>姓名：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="name"
              onChange={updateDetail}
              value={detail.name}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>性别：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="gender"
              onChange={updateDetail}
              value={detail.gender}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>年龄：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="age"
              onChange={updateDetail}
              value={detail.age}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>身份证号：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="IDCard"
              onChange={updateDetail}
              value={detail.IDCard}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>填报日期：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="fillDate"
              onChange={updateDetail}
              value={detail.fillDate}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>联系电话：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="phone"
              onChange={updateDetail}
              value={detail.phone}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>转运地址：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="transferAddress"
              onChange={updateDetail}
              value={detail.transferAddress}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>家庭住址：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="homeAddress"
              onChange={updateDetail}
              value={detail.homeAddress}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>所属区域：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="region"
              onChange={updateDetail}
              value={detail.region}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>所属街道：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="street"
              onChange={updateDetail}
              value={detail.street}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>预计隔离酒店：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="hotel"
              onChange={updateDetail}
              value={detail.hotel}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>管理状态：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="managementState"
              onChange={updateDetail}
              value={detail.managementState}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>接收异常状态：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="abnormalState"
              onChange={updateDetail}
              value={detail.abnormalState}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>纳入隔离日期：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="isolationDate"
              onChange={updateDetail}
              value={detail.isolationDate}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>实际入驻酒店寄房间号：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="roomNumber"
              onChange={updateDetail}
              value={detail.roomNumber}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>预计采样日期：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="expectSamplingDate"
              onChange={updateDetail}
              value={detail.expectSamplingDate}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>实际采样日期：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="actualSamplingDate"
              onChange={updateDetail}
              value={detail.actualSamplingDate}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>采样结果：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="samplingResult"
              onChange={updateDetail}
              value={detail.samplingResult}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>转院时间：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="transferTime"
              onChange={updateDetail}
              value={detail.transferTime}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>医院名称：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="Hospital"
              onChange={updateDetail}
              value={detail.Hospital}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>预计解除日期：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="removeDate"
              onChange={updateDetail}
              value={detail.removeDate}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>密接解除后纳入居家管理时间：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="homeManagementTime"
              onChange={updateDetail}
              value={detail.homeManagementTime}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>第二天采样结果：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="secondSamplingResult"
              onChange={updateDetail}
              value={detail.secondSamplingResult}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>第七天采样结果：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="seventhSamplingResult"
              onChange={updateDetail}
              value={detail.seventhSamplingResult}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>结束管理日期：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="finishDate"
              onChange={updateDetail}
              value={detail.finishDate}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>转归：</InputLabel>
          <FormControl fullWidth>
            <Input
              name="outcome"
              onChange={updateDetail}
              value={detail.outcome}
              minRows={2}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
      </Paper>
      {/* </Box> */}
      <Paper elevation={0} square>
        <Box margin={1.5} paddingTop={1.5}>
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
      </Paper>
    </div>
  );
}
