import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Page from '@components/layout/Page';
import Input from '@material-ui/core/Input';
import Rating from '@material-ui/lab/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import OrderDetailHeader from '@components/OrderDetail/Header';
import OrderDetailContent from '@components/OrderDetail/Content';
import MessageList from '@components/OrderDetail/MessageList';
import OrderDetailChat from '@components/OrderDetail/Chat';
import { OrderStatus, Role } from '@src/constants';
import useOrderDetail from '@src/hooks/useOrderDetail';
import commonStyle from '@styleModules/common.module.scss';
import { configDingtalk, getURL } from '@src/utils';
import {
  dingUploadFile,
  dingConfirm,
  dingOpenLink,
  dingConversation
} from '@src/dingtalkAPI';
import { getDingFilePermission } from '@src/api';
import { Dingtalk } from '@src/constants';
export default function UserOrderDetail(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const { orderId }: { orderId: string } = useParams();
  /* 钉盘空间 */
  const [dingFileSpaceId, setDingFileSpaceId] = useState('');

  /* 用户评价内容 */
  const [evaluate, setEvaluate] = useState('');
  const [openBox, setOpenBox] = useState(false);
  /* 工单详情数据和方法 */
  const {
    order,
    isLoading,
    submitFeedback,
    closeOrder,
    uploadFeedback,
    reminderOrder
  } = useOrderDetail(orderId, Role.USER);
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

  /* 关闭工单 */
  const handleCloseOrder = async () => {
    if (!order) {
      return;
    }
    dingOpenLink(getURL(`user/close/order/${order.id}`));
  };
  /* 催单 */
  const handelReminder = async () => {
    const confirm = await dingConfirm('确认催单？', '提示', ['取消', '确认']);
    if (confirm.buttonIndex === 0) {
      return;
    }
    if (!order) {
      return;
    }

    await reminderOrder();
  };
  /* 拉取会话 */
  const handleConversation = async () => {
    try {
      if (order && order.adminDingUserId) {
        await dingConversation(Dingtalk.CORP_ID, order.adminDingUserId);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
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
    getData(setDingFileSpaceId);
  }, []);

  return (
    <Page title="工单详情" paddingBottom={30}>
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
          {/* <OrderDetailContent
            category={order.category}
            files={order.files}
            serialNumber={order.serialNumber}
          >
            {order.content}
          </OrderDetailContent> */}
          {order.status == OrderStatus.SIGNED && order.reminder < 3 && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handelReminder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                催单
              </Button>
            </Box>
          )}
          {order.status == OrderStatus.SIGNED && order.reminder >= 3 && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleConversation}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                联系管理员
              </Button>
            </Box>
          )}
          {order.status !== OrderStatus.FINISHED && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseOrder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                关闭工单
              </Button>
            </Box>
          )}
          {order.status == OrderStatus.FINISHED && order.order_rate && (
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
            peerDefaultName="专家"
            hidePeerName
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
          {order.status !== OrderStatus.FINISHED && (
            <OrderDetailChat isLoading={isLoading} onSubmit={submitFeedback} />
          )}
        </>
      )}
    </Page>
  );
}
