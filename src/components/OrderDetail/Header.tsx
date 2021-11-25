import React, { useState, useEffect } from 'react';
import { Paper, Grid, Box, Typography, InputLabel } from '@material-ui/core';
import { MILLISECONDS, OrderStatus } from '@src/constants';
import StatusIcon from '@components/StatusIcon';
import { InfoNameIcon } from '@src/assets/svg/picture';
import WaitIcon from '@components/SvgIcons';
import { formatDateTime } from '@src/utils';
// import AccountCircleIcon from '@material-ui/icons';
type Props = {
  name: string;
  contactType: string;
  status: OrderStatus;
  isolateType: string;
  isloatePlace: string;
  fillDate: string;
  sourceAttribute: string;
  dataSource: string;
  personAttribute: string;
  relatedEvent: string;
  relatedCase: string;
  associatedContace: string;
  contactForm: string;
  lastContaceTime: string;
  IDCard: string;
  gender: string;
  age: string;
  phone: string;
};
export default function OrderDetailHeader({
  contactType,
  isolateType,
  isloatePlace,
  status,
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
  phone
}: Props): JSX.Element {
  return (
    <Box margin={1.5}>
      <Paper elevation={0} square>
        {/* <AccountCircleIcon /> */}
        <Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="h6">
                  {' '}
                  <InfoNameIcon /> {name}的基本信息
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography
                  variant="subtitle1"
                  color={'secondary'}
                  component={'span'}
                >
                  {/* 接触类型 */}
                  {contactType}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>隔离类型：</span>
                  {isolateType}
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>{isloatePlace}</span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={2}>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <StatusIcon exchangeStatus={5} status={status} />
              </Grid>
              {/* <Grid xs={8}>
                <Typography
                  variant="body2"
                  component="p"
                  color={isTimeout ? 'secondary' : 'initial'}
                >
                  {scheduleDate}
                </Typography>
              </Grid> */}
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>填报日期：</span>
                  {fillDate}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
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
          <Box margin={1.5}>
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
          <Box margin={1.5}>
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
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>接触方式：</span>
                  {contactForm}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>最后接触时间：</span>
                  {lastContaceTime}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>姓名：</span>
                  {name}
                </Typography>
              </Grid>
              <Grid xs={6}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>性别：</span>
                  {gender}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>年龄：</span>
                  {age}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>身份证号：</span>
                  {IDCard}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box margin={1.5}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Typography variant="body2">
                  <span style={{ color: 'gray' }}>联系电话：</span>
                  {phone}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
