import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Page from '@components/layout/Page';
import Rating from '@material-ui/lab/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OrderDetailHeader from '@components/OrderDetail/Header';
import OrderDetailContent from '@components/OrderDetail/Content';
import FormHelperText from '@material-ui/core/FormHelperText';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MessageList from '@components/OrderDetail/MessageList';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import OrderDetailChat from '@components/OrderDetail/Chat';
import { OrderStatus, Role } from '@src/constants';
import useOrderDetail from '@src/hooks/useOrderDetail';
import commonStyle from '@styleModules/common.module.scss';
import { dingConfirm, dingOpenLink } from '@src/dingtalkAPI';
import { configDingtalk, getURL } from '@src/utils';
import { dingUploadFile } from '@src/dingtalkAPI';
import { getDingFilePermission } from '@src/api';
import { Dingtalk } from '@src/constants';
export default function ExpertOrderDetail(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const { orderId }: { orderId: string } = useParams();

  /* 是否显示抢单按钮 */
  const [isSignButtonVisible, setIsSignButtonVisible] = useState(false);

  /* 是否显示设置预计时间 */
  const [isSetScheduleDrawerVisible, setIsSetScheduleDrawerVisible] =
    useState(false);

  /* 是否显示申请关单按钮 */
  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(false);

  /* 是否显示移交工单按钮 */
  const [isTransferButtonVisible, setIsTransferButtonVisible] = useState(false);

  /* 是否显示移交给管理员工单按钮 */
  const [isTransferToAdminButtonVisible, setIsTransferToAdminButtonVisible] =
    useState(false);

  /* 是否显示回复框 */
  const [isFeedbackAvailable, setIsFeedbackAvailable] = useState(false);
  /* 钉盘空间 */
  const [dingFileSpaceId, setDingFileSpaceId] = useState('');
  /* 工单详情数据和方法 */
  const {
    order,
    isLoading,
    submitFeedback,
    uploadFeedback,
    signOrder,
    setSchedule,
    requestCloseOrder
  } = useOrderDetail(orderId, Role.EXPERT);

  /* 申请关闭工单 */
  const handleCloseOrder = useCallback(async () => {
    const confirm = await dingConfirm('确认关闭工单？', '提示', [
      '取消',
      '确认关闭'
    ]);
    if (confirm.buttonIndex === 0) {
      return;
    }

    //Todo: 选择关单类型
    //Todo: 填写关单理由

    await requestCloseOrder();
  }, [requestCloseOrder]);
  /* 上传文件（钉盘） */
  const handleUploadFiles = useCallback(async () => {
    try {
      const fileRes = await dingUploadFile(
        dingFileSpaceId,
        9,
        Dingtalk.CORP_ID
      );
      const filesPath = fileRes.data;
      filesPath.map(function (item) {
        uploadFeedback(item.fileName, JSON.stringify(item));
      });
    } catch (error) {
      console.log('fileError', error);
    }
  }, [dingFileSpaceId]);
  /* 转单给管理员 */
  const handleTransferOrderToAdmin = useCallback(async () => {
    if (!order) {
      return;
    }
    dingOpenLink(getURL(`expert/order/${order.id}/toAdmin`));
  }, [order]);
  /* 转单 */
  const handleTransferOrder = useCallback(async () => {
    if (!order) {
      return;
    }
    dingOpenLink(getURL(`expert/order/${order.id}/toExpert`));
  }, [order]);
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
    setIsSetScheduleDrawerVisible(
      order.scheduledAt != null &&
        order.dispatch == 1 &&
        order.status === OrderStatus.SIGNED
    );
    setIsSignButtonVisible(order.status === OrderStatus.AWAIT_SIGN);
    if (order.status === OrderStatus.SIGNED && order.isHandler) {
      setIsCloseButtonVisible(true);
      order.transfer_times < 3
        ? setIsTransferButtonVisible(true)
        : setIsTransferToAdminButtonVisible(true);
    } else {
      setIsCloseButtonVisible(false);
      setIsTransferButtonVisible(false);
      setIsTransferToAdminButtonVisible(false);
    }
    setIsFeedbackAvailable(
      order.status !== OrderStatus.AWAIT_SIGN &&
        order.status !== OrderStatus.FINISHED &&
        order.isHandler
    );
  }, [order]);

  return (
    <Page
      title="工单详情"
      paddingBottom={30}
      navigationRigth={
        isTransferButtonVisible
          ? { label: '转单', onClick: handleTransferOrder }
          : undefined
      }
    >
      {order && (
        <>
          <OrderDetailHeader
            title={order.title}
            urgent={order.urgent}
            submitterName={order.submitterName}
            status={order.status}
            scheduledAt={order.scheduledAt}
            completedAt={order.completedAt}
          />
          <OrderDetailContent
            category={order.category}
            files={order.files}
            serialNumber={order.serialNumber}
          >
            {order.content}
          </OrderDetailContent>
          {isSignButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="primary"
                onClick={signOrder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                抢单
              </Button>
            </Box>
          )}
          {isSetScheduleDrawerVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="primary"
                onClick={setSchedule}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                设置预计完成时间
              </Button>
            </Box>
          )}
          {isTransferButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleTransferOrder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                转单
              </Button>
            </Box>
          )}
          {isTransferToAdminButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleTransferOrderToAdmin}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                转单次数已达3次，转到管理员
              </Button>
            </Box>
          )}
          {isCloseButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseOrder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                申请办结
              </Button>
            </Box>
          )}
          {order.status == OrderStatus.FINISHED && order.order_rate != 0 && (
            <>
              <Paper elevation={0} square>
                <Box marginY={1.5} padding={1.5}>
                  <InputLabel>用户评分</InputLabel>
                  <FormHelperText>
                    <Rating
                      name="read-only"
                      precision={0.5}
                      value={order.order_rate}
                      readOnly
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    />{' '}
                  </FormHelperText>
                </Box>
              </Paper>
            </>
          )}
          {order.status == OrderStatus.FINISHED && order.ask_evaluate && (
            <>
              <Paper elevation={0} square>
                <Box marginY={1.5} padding={1.5}>
                  <InputLabel>用户评价</InputLabel>
                  <FormHelperText>{order.ask_evaluate}</FormHelperText>
                </Box>
              </Paper>
            </>
          )}
          <MessageList
            messages={order.messages}
            isEmpty={order.messages.length === 0 && !isLoading}
          />
          {order.status !== OrderStatus.FINISHED && (
            <Paper elevation={0} square>
              <Box marginY={1.5} padding={1.5}>
                <InputLabel>附件</InputLabel>
                <FormControl fullWidth>
                  <Button
                    onClick={handleUploadFiles}
                    startIcon={<CloudUploadIcon />}
                    className={commonStyle.placeholderColor}
                    disableElevation
                    fullWidth
                  >
                    上传附件
                  </Button>
                </FormControl>
              </Box>
            </Paper>
          )}
          {isFeedbackAvailable && (
            <OrderDetailChat isLoading={isLoading} onSubmit={submitFeedback} />
          )}
        </>
      )}
    </Page>
  );
}
