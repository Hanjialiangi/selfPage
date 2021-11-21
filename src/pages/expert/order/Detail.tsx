import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ExpandMore from '@material-ui/icons/ExpandMore';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import MobiledataOffSharpIcon from '@material-ui/icons/MobiledataOffSharp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HealthAndSafetyIcon from '@material-ui/icons/HealthAndSafety';
import Page from '@components/layout/Page';
import OrderDetailHeader from '@components/OrderDetail/Header';
import OrderDetailContent from '@components/OrderDetail/Content';
import { OrderStatus, Role } from '@src/constants';
import useOrderDetail from '@src/hooks/useOrderDetail';
import commonStyle from '@styleModules/common.module.scss';
import { configDingtalk, getURL } from '@src/utils';
import { getDingFilePermission } from '@src/api';
import { Dingtalk } from '@src/constants';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import '@src/styles/modules/detail/detail.scss';
export default function ExpertOrderDetail(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const { orderId }: { orderId: string } = useParams();

  /* 是否显示转运按钮 */
  const [isTransferButtonVisible, setIsTransferButtonVisible] = useState(true);

  /* 是否显示接收并开始隔离 */
  const [isArriveButtonVisible, setisArriveButtonVisible] = useState(true);

  /* 钉盘空间 */
  const [dingFileSpaceId, setDingFileSpaceId] = useState('');

  /* 工单详情数据和方法 */
  const { order, isLoading } = useOrderDetail(orderId, Role.EXPERT);

  /* 转运 */
  const handleTransferOrder = useCallback(async () => {
    if (!order) {
      return;
    }
    window.location.href = `/transfer/${order.id}/edit/toExpert`;
    // dingOpenLink(getURL(`expert/order/${order.id}/toExpert`)); /transfer/:orderId/edit
  }, [order]);

  /* 修改信息 */
  const handleFixOrder = useCallback(async () => {
    if (!order) {
      return;
    }
    window.location.href = `/resident/${order.id}/baseinfo/edit`;
    // dingOpenLink(getURL(`expert/order/${order.id}/fixInfo`));
  }, [order]);
  /* 修改接收并开始隔离 */
  const handleArrive = useCallback(async () => {
    if (!order) {
      return;
    }
    window.location.href = `/arrive/${order.id}/edit`;
    // dingOpenLink(getURL(`expert/order/${order.id}/fixInfo`));
  }, [order]);
  /* 上报采样结果 */
  const handleSamplingResult = useCallback(async () => {
    if (!order) {
      return;
    }
    window.location.href = `/samplingresult/${order.id}/edit`;
    // dingOpenLink(getURL(`expert/order/${order.id}/fixInfo`));
  }, [order]);

  /* 上报健康状况 */
  const handleHealth = useCallback(async () => {
    if (!order) {
      return;
    }
    window.location.href = `/health/${order.id}/edit`;
    // dingOpenLink(getURL(`expert/order/${order.id}/fixInfo`));
  }, [order]);

  //收缩按钮
  const [showdownIcon, setshowdownIcon] = useState(true);
  const [showUpIcon, setshowUpIcon] = useState(false);

  /* 加载页面数据 */
  async function getData(
    setDingFileSpaceId: React.Dispatch<React.SetStateAction<string>>
  ) {
    const isDingtalkReady = await configDingtalk([
      'biz.util.uploadAttachment',
      'biz.clipboardData.setData',
      'biz.cspace.preview',
      'biz.chat.openSingleChat',
      'device.audio.startRecord',
      'device.audio.stopRecord',
      'device.audio.translateVoice'
    ]);
    if (!isDingtalkReady) {
      return;
    }

    const permissionRes = await getDingFilePermission('add');
    if (permissionRes.data.resoult) {
      setDingFileSpaceId(permissionRes.data.spaceId);
    }
  }
  useEffect(() => {
    if (!order) {
      return;
    }
    getData(setDingFileSpaceId);
    // configDingtalk(['biz.clipboardData.setData', 'biz.cspace.preview']);
    //判断角色功能（转运、接收并开始隔离、上报并开始采样结果）
    setIsTransferButtonVisible(true);
    setisArriveButtonVisible(true);
  }, [order]);

  return (
    <Page
      title="人员详情"
      paddingBottom={5}
      navigationRigth={
        isTransferButtonVisible
          ? { label: '转单', onClick: handleTransferOrder }
          : undefined
      }
    >
      {order && (
        <>
          <Paper elevation={0} square>
            <Box padding={1.5}>
              <Accordion>
                <AccordionSummary
                  expandIcon={showdownIcon ? <ExpandMore /> : null}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => {
                    setshowdownIcon(showUpIcon);
                    setshowUpIcon(showdownIcon);
                  }}
                >
                  {showUpIcon ? (
                    <KeyboardArrowUpIcon
                      style={{
                        position: 'absolute',
                        marginTop: '510px',
                        left: '47%'
                      }}
                    />
                  ) : null}
                  <OrderDetailHeader
                    name={order.title}
                    contactType={order.title}
                    status={order.status}
                    isolateType={order.title}
                    isloatePlace={order.title}
                    fillDate={order.title}
                    sourceAttribute={order.title}
                    dataSource={order.title}
                    personAttribute={order.title}
                    relatedEvent={order.title}
                    relatedCase={order.title}
                    associatedContace={order.title}
                    contactForm={order.title}
                    lastContaceTime={order.title}
                    IDCard={order.title}
                    gender={order.title}
                    age={order.title}
                    phone={order.title}
                    transferAddress={order.title}
                    homeAddress={order.title}
                    region={order.title}
                    street={order.title}
                    relatedIDCard={order.title}
                    relatedPhone={order.title}
                    hotel={order.title}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <OrderDetailContent
                    abnormalState={order.title}
                    isolationDate={order.title}
                    roomNumber={order.title}
                    expectSamplingDate={order.title}
                    actualSamplingDate={order.title}
                    samplingResult={order.title}
                    transferTime={order.title}
                    Hospital={order.title}
                    removeDate={order.title}
                    homeManagementTime={order.title}
                    secondSamplingResult={order.title}
                    seventhSamplingResult={order.title}
                    finishDate={order.title}
                    outcome={order.title}
                    isolateMethod={order.title}
                  >
                    {order.content}
                  </OrderDetailContent>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Paper>
          <Paper elevation={0}>
            {isTransferButtonVisible && (
              <Box
                margin={1.5}
                paddingTop={1}
                style={{ display: 'flex', justifyContent: 'space-around' }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleTransferOrder}
                  className={commonStyle.whiteBackground}
                  disabled={isLoading}
                  style={{ width: '45%' }}
                >
                  <TransferWithinAStationIcon />
                  转运
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleArrive}
                  className={commonStyle.whiteBackground}
                  disabled={isLoading}
                  style={{ width: '45%' }}
                >
                  <MobiledataOffSharpIcon />
                  接收并开始隔离
                </Button>
              </Box>
            )}
            {isArriveButtonVisible && (
              <>
                <Box
                  margin={1.5}
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSamplingResult}
                    className={commonStyle.whiteBackground}
                    disabled={isLoading}
                    style={{ width: '45%' }}
                  >
                    <AssignmentIcon />
                    上报采样结果
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleHealth}
                    className={commonStyle.whiteBackground}
                    disabled={isLoading}
                    style={{ width: '45%' }}
                  >
                    <HealthAndSafetyIcon />
                    上报健康状况
                  </Button>
                </Box>
              </>
            )}
            {isTransferButtonVisible && (
              <Box
                margin={1.5}
                style={{ display: 'flex', justifyContent: 'space-around' }}
                paddingBottom={1}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleFixOrder}
                  className={commonStyle.whiteBackground}
                  disabled={isLoading}
                  style={{ width: '95%' }}
                >
                  <FileCopyOutlinedIcon />
                  修改基本信息
                </Button>
              </Box>
            )}
          </Paper>
        </>
      )}
    </Page>
  );
}
