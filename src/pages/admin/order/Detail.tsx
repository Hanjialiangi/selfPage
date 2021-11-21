import React, { useCallback, useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import OrderDetailHeader from '@components/OrderDetail/Header';
import OrderDetailContent from '@components/OrderDetail/Content';
import MessageList from '@components/OrderDetail/MessageList';
import OrderDetailChat from '@components/OrderDetail/Chat';
import { useParams } from 'react-router-dom';
import useOrderDetail from '@src/hooks/useOrderDetail';
import { Role } from '@src/constants';
import { configDingtalk, getURL } from '@src/utils';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { OrderStatus } from '@src/constants';
import commonStyle from '@styleModules/common.module.scss';
import { dingConfirm, dingOpenLink } from '@src/dingtalkAPI';
import { dingUploadFile } from '@src/dingtalkAPI';
import { getDingFilePermission } from '@src/api';
import { Dingtalk } from '@src/constants';
export default function AdminOrderDetail(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const { orderId }: { orderId: string } = useParams();

  /* 工单详情数据和方法 */
  const { order, isLoading, submitFeedback, uploadFeedback, urgentOrder } =
    useOrderDetail(orderId, Role.ADMIN);

  /* 是否显示指派工单按钮 */
  const [isTransferButtonVisible, setIsTransferButtonVisible] = useState(false);

  /* 是否显示加急 */
  const [isUrgentButtonVisible, setIsUrgentButtonVisible] = useState(false);

  /* 转单 */
  const handleTransferOrder = useCallback(async () => {
    if (!order) {
      return;
    }
    dingOpenLink(getURL(`admin/order/${order.id}/toExpert`));
  }, [order]);

  /* 钉盘空间 */
  const [dingFileSpaceId, setDingFileSpaceId] = useState('');
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
  useEffect(() => {
    if (!order) {
      return;
    }

    getData(setDingFileSpaceId);
    if (order.status < 3) {
      setIsTransferButtonVisible(true);
    } else {
      setIsTransferButtonVisible(false);
    }

    if (order.status !== 4 && order.urgent == 0 && order.resolve_id) {
      setIsUrgentButtonVisible(true);
    } else {
      setIsUrgentButtonVisible(false);
    }
  }, [order]);

  return (
    <Page title="工单详情" paddingBottom={30}>
      {order && (
        <>
          {/* <OrderDetailHeader
            title={order.title}
            urgent={order.urgent}
            submitterName={order.submitterName}
            status={order.status}
            scheduledAt={order.scheduledAt}
            completedAt={order.completedAt}
          /> */}
          {/* <OrderDetailContent
            category={order.category}
            files={order.files}
            serialNumber={order.serialNumber}
          >
            {order.content}
          </OrderDetailContent> */}
          {isTransferButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleTransferOrder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                指派
              </Button>
            </Box>
          )}
          {isUrgentButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={urgentOrder}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                加急
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
          <OrderDetailChat isLoading={isLoading} onSubmit={submitFeedback} />
        </>
      )}
    </Page>
  );
}
