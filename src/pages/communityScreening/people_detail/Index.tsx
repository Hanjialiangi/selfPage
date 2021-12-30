import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { useParams } from 'react-router';
import { Box, Typography, Paper, Button, Card } from '@material-ui/core';
import PeopleDetailContent from '@components/jk_layout/detail/PeopleDetailContent';
import style from '@styleModules/components/statusIcon.module.scss';
import Chip from '@material-ui/core/Chip';
import '@src/styles/modules/detail/detail.scss';
import {
  getResidentInfo,
  pushToStreet,
  recievePeople,
  updateCurrentState
} from '@src/api';
import {
  InfoNameIcon,
  InfoHealthIcon,
  InfoSamplingIcon,
  InfoFixIcon,
  InfoIsolateIcon,
  InfoTransfer,
  InfoDetailIcon,
  HotelIcon,
  FeedBackIcon,
  BackHomeIcon,
  PushToStreetIcon,
  StartTransferIcon
} from '@src/assets/svg/picture';
import { StatusIcon } from '@src/assets/svg/picture';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import { getURL, judgeRole } from '@src/utils';
import { dingAlert } from '@src/dingtalkAPI';

export type Properties = {
  key: string;
  key_id: number;
  key_name: string;
  value: string;
};

export default function PeopleDetailPage(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  const role = judgeRole(userInfo.role);

  const param: { id: string } = useParams(); //获取路由参数
  const [name, setName] = useState(''); //人员名字
  const [residentProperty, setResidentProperty] = useState(''); //人员属性
  const [quarantineType, setQuarantineType] = useState(''); //隔离方式
  const [current_status, setCurrent_status] = useState('未知'); //当前状态
  const [BoxHight, setBoxHeight] = useState('335px'); //点击卡片改变宽度
  const [BoxTag, setBoxtTag] = useState('查看更多'); //点击按钮收缩

  /* 是否显示接收并开始隔离 */
  const [isArriveButtonVisible, setisArriveButtonVisible] = useState(false);

  /* 是否显示转运社区 */
  const [isTransferButtonVisible, setisTransferButtonVisible] = useState(false);

  /* 是否显示推送街道和转运至酒店 */
  const [isToCenterButtonVisible, setIsToCenterButtonVisible] = useState(false);
  const [isToStreetOrHotelButtonVisible, setisToStreetOrHotelButtonVisible] =
    useState(false);

  /* 是否显示上报采样结果和上报健康状况 */
  const [isSubmitButtonVisible, setisSubmitButtonVisible] = useState(false);
  /* 是否显示反馈 */
  const [isFeedaback, setisFeedback] = useState(false);

  /* 转归 */
  const [isFeedbackButtonVisible, setisFeedbackButtonVisible] = useState(false);

  /* 转运 */
  const handleTransferOrder = () => {
    window.location.href = getURL(`/detail/receive/${param.id}/edit`);
    // window.location.href = getURL(`/detail/transfer/${param.id}/edit`);
    //window.location.href = getURL(`/detail/transfercommunity/${param.id}/edit`);
  };

  /*转运到社区 */
  const handleTransferCommunity = () => {
    window.location.href = getURL(`/detail/transfercommunity/${param.id}/edit`);
  };

  /* 分配 */
  const handleCheck = () => {
    window.location.href = getURL(`/detail/check/${param.id}/edit`);
  };
  /* 分配 */
  const handleDistriute = () => {
    window.location.href = getURL(`/detail/distriute/${param.id}/edit`);
  };
  /* 修改信息 */
  const handleFixInfo = () => {
    window.location.href = getURL(`/detail/update/${param.id}/baseinfo/edit`);
  };
  /* 修改接收并开始隔离 */
  const handleArrive = () => {
    window.location.href = getURL(`/detail/arrive/${param.id}/edit`);
  };
  /* 上报采样结果 */
  const handleSamplingResult = () => {
    window.location.href = getURL(`/detail/samplingresult/${param.id}/edit`);
  };

  /* 上报健康状况 */
  const handleHealth = () => {
    window.location.href = getURL(`/detail/health/${param.id}/edit`);
  };

  /* 转院 */
  const handleTransferHospital = () => {
    window.location.href = getURL(
      `/detail/hotel_doctor/${param.id}/transfer_hospital`
    );
  };
  /* 反馈 */
  const handleFeedBack = () => {
    window.location.href = getURL(`/detail/feedback/${param.id}/edit`);
  };
  /*转归 */
  const handleTransferBack = () => {
    window.location.href = getURL(`detail/transferback/${param.id}/edit`);
  };
  /*处理推送街道 */
  const handlePush = async () => {
    const res = await pushToStreet(param.id, role); //推送街道
    if (res.code === 200) {
      dingAlert('推送成功', '正确', '确认');
    }
  };
  /*通知服务中心 */
  const handleNotice = async () => {
    const res = await recievePeople(param.id, role); //接收人
    if (res.code === 200) {
      dingAlert('通知成功', '正确', '确认');
    }
  };

  const [information, setInformation] = useState<Properties[]>();
  const Init = async (id: string) => {
    //TODO://根据id获取信息
    const res = await getResidentInfo(id, role);
    if (res.code == 200) {
      const attributeArray: Array<Properties> = [];
      res.data.map((item: Properties) => {
        if (item.key === 'name') {
          setName(item.value);
        }
        if (item.key === 'resident_property') {
          setResidentProperty(item.value);
        }
        if (item.key === 'quarantine_type') {
          setQuarantineType(item.value);
        }
        if (item.key === 'current_state') {
          setCurrent_status(item.value);
          if (
            item.value === '转运至酒店中' ||
            item.value === '转运至社区中' ||
            item.value === '转运至居家隔离酒店中'
          ) {
            setisArriveButtonVisible(true);
          }
          if (item.value === '医院治疗中' || item.value === '集中隔离中') {
            setisTransferButtonVisible(true);
          }
          if (
            item.value === '医院治疗中' ||
            item.value === '集中隔离中' ||
            item.value === '居家隔离中' ||
            item.value === '解除后居家隔离中'
          ) {
            setisSubmitButtonVisible(true);
          }
          if (item.value === '医院治疗中' || item.value === '健康监测中') {
            setisFeedbackButtonVisible(true);
          }
          if (item.value === '社区卫生服务中心接送中') {
            setisToStreetOrHotelButtonVisible(true);
            setisFeedback(true);
          }
          if (item.value === '社区卫生服务中心联合街道接送中') {
            setIsToCenterButtonVisible(true);
            setisFeedback(true);
          }
        }
        attributeArray.push(item);
      });
      setInformation(attributeArray);
    }
  };

  //点击功能
  const handleClick = () => {
    if (BoxHight === '335px') {
      setBoxHeight('100%');
      setBoxtTag('点击收回');
    }
    if (BoxHight === '100%') {
      setBoxHeight('335px');
      setBoxtTag('查看更多');
    }
  };

  //转健康监测
  const handleHealthMonitor = () => {
    window.location.href = getURL(`detail/health_monitor/${param.id}/edit`);
  };

  //管控措施
  const handleManage = () => {
    window.location.href = getURL(`detail/manage/${param.id}/edit`);
  };
  //核酸检测
  const handleDetect = () => {
    window.location.href = getURL(`detail/detect/${param.id}/edit`);
  };

  useEffect(() => {
    Init(param.id);
  }, [param.id]);

  return (
    <Page title="人员详情" paddingBottom={5}>
      <>
        <Paper elevation={0} square style={{ height: '8px' }} />
        <Box margin={1.5} padding={1.5}>
          <Card className="InfoCard">
            <Paper elevation={0} square>
              <Box
                margin={1.5}
                style={{ height: `${BoxHight}` }}
                onClick={handleClick}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="h6">
                    <InfoNameIcon />
                    &nbsp;{name}的基本信息
                  </Typography>
                  {residentProperty === '密接' ||
                  residentProperty === '次密接' ? (
                    <Typography
                      variant="subtitle1"
                      color={'secondary'}
                      component={'span'}
                    >
                      {residentProperty}
                    </Typography>
                  ) : (
                    <Typography variant="subtitle1" component={'span'}>
                      <span style={{ color: 'green' }}>{residentProperty}</span>
                    </Typography>
                  )}
                </div>
                <Typography variant="body2" style={{ marginTop: '10px' }}>
                  <span style={{ color: 'gray' }}>隔离类型：</span>
                  {quarantineType}
                </Typography>
                <div style={{ marginTop: '10px' }}>
                  <>
                    <Chip
                      icon={<StatusIcon />}
                      size="small"
                      label={current_status}
                      style={{ color: '#1790FF' }}
                      className={`${style.icon} ${style.processing}`}
                      variant="outlined"
                    />
                  </>
                </div>
                {information ? (
                  <PeopleDetailContent info={information} />
                ) : null}
              </Box>
              <Button
                onClick={handleClick}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#fff'
                }}
              >
                {BoxTag}&nbsp;
                <InfoDetailIcon />
              </Button>
            </Paper>
          </Card>
        </Box>
        <Box paddingTop={1} paddingBottom={1} margin={1.5}>
          <Box margin={1.5} className="DetailBox">
            <Button
              variant="text"
              color="primary"
              onClick={handleCheck}
              className="DetailBoxButton"
              style={{ width: '100%' }}
            >
              <StartTransferIcon />
              &nbsp;精准排查
            </Button>
          </Box>
          <Box margin={1.5} className="DetailBox">
            <Button
              variant="text"
              color="primary"
              onClick={handleManage}
              className="DetailBoxButton"
              style={{ width: '45%' }}
            >
              <StartTransferIcon />
              &nbsp;管控措施
            </Button>
            <div style={{ marginTop: '10px' }}>|</div>
            <Button
              variant="text"
              color="primary"
              onClick={handleHealthMonitor}
              className="DetailBoxButton"
              fullWidth
              style={{ width: '45%' }}
            >
              <BackHomeIcon />
              &nbsp;上报健康监测结果
            </Button>
          </Box>
          <Box margin={1.5} className="DetailBox">
            <Button
              variant="text"
              color="primary"
              onClick={handleDetect}
              className="DetailBoxButton"
              fullWidth
              style={{ width: '100%' }}
            >
              <BackHomeIcon />
              &nbsp;上报核酸检测结果
            </Button>
          </Box>
          {/* {
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleDistriute}
                className="DetailBoxButton"
                style={{ width: '100%' }}
              >
                <StartTransferIcon />
                &nbsp;发起转运任务
              </Button>
            </Box>
          } */}
          {/* {
            <Box margin={1.5} className="DetailBox">
              <>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handlePush}
                  className="DetailBoxButton"
                  style={{ width: '45%' }}
                >
                  <PushToStreetIcon />
                  &nbsp;推送街道
                </Button>
                <div className="DetailBoxDiv">|</div>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleTransferOrder}
                  className="DetailBoxButton"
                  style={{ width: '45%' }}
                >
                  <InfoTransfer />
                  &nbsp;转运至酒店
                </Button>
              </>
            </Box>
          } */}
          {/* {
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleNotice}
                className="DetailBoxButton"
                style={{ width: '100%' }}
              >
                <PushToStreetIcon />
                &nbsp;通知服务中心
              </Button>
            </Box>
          } */}
          {
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleArrive}
                className="DetailBoxButton"
                style={{ width: '100%' }}
              >
                <InfoIsolateIcon />
                &nbsp;接收并开始隔离
              </Button>
            </Box>
          }
          {
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleTransferCommunity}
                className="DetailBoxButton"
                style={{ width: '100%' }}
              >
                <InfoTransfer />
                &nbsp;转运至社区/居家隔离酒店
              </Button>
            </Box>
          }
          {/* {
            <Box>
              <Box margin={1.5} className="DetailBox">
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleSamplingResult}
                  className="DetailBoxButton"
                  style={{
                    width: `${current_status === '健康监测中' ? '45%' : '100%'}`
                  }}
                >
                  <InfoSamplingIcon />
                  &nbsp;上报采样结果
                </Button>
              </Box>
            </Box>
          } */}
          {/* {current_status === '健康监测中' && (
            <Box>
              <Box margin={1.5} className="DetailBox">
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleHealth}
                  className="DetailBoxButton"
                  style={{ width: '100%' }}
                >
                  <InfoHealthIcon />
                  &nbsp;上报健康状况
                </Button>
              </Box>
            </Box>
          )} */}
          {/* {current_status === '集中隔离中' &&
            (userInfo.role.includes('hotel_medical_team') ||
              userInfo.role.includes('sub_district') ||
              userInfo.role.includes('community_healthcare_center') ||
              userInfo.role.includes('transfer_team') ||
              userInfo.role.includes('focus_quarantine_group') ||
              userInfo.role.includes('wh_cdc') ||
              userInfo.role.includes('close_contact_team')) && (
              <Box margin={1.5} className="DetailBox">
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleTransferHospital}
                  className="DetailBoxButton"
                  fullWidth
                >
                  <HotelIcon />
                  &nbsp;转院
                </Button>
              </Box>
            )} */}
          <Box margin={1.5} className="DetailBox">
            <Button
              variant="text"
              color="primary"
              onClick={handleFixInfo}
              className="DetailBoxButton"
              fullWidth
            >
              <InfoFixIcon />
              &nbsp;修改基本信息
            </Button>
          </Box>
          {isFeedaback ? (
            <Box margin={1.5} className="DetailBox">
              <Button
                variant="text"
                color="primary"
                onClick={handleFeedBack}
                className="DetailBoxButton"
                fullWidth
              >
                <FeedBackIcon />
                &nbsp;反馈
              </Button>
            </Box>
          ) : null}
          {/* {(userInfo.role.includes('hotel_medical_team') ||
            userInfo.role.includes('community') ||
            userInfo.role.includes('sub_district') ||
            userInfo.role.includes('community_healthcare_center') ||
            userInfo.role.includes('transfer_team') ||
            userInfo.role.includes('focus_quarantine_group') ||
            userInfo.role.includes('wh_cdc') ||
            userInfo.role.includes('close_contact_team')) &&
            isFeedbackButtonVisible && (
              <Box margin={1.5} className="DetailBox">
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleTransferBack}
                  className="DetailBoxButton"
                  fullWidth
                >
                  <BackHomeIcon />
                  &nbsp;转归
                </Button>
              </Box>
            )} */}
        </Box>
      </>
    </Page>
  );
}
