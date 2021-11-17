import { useCallback, useEffect, useState } from 'react';
import { MILLISECONDS, OrderStatus, Role } from '@src/constants';
import useLoading from './useLoading';
import { Message } from '@components/OrderDetail/MessageList';
import {
  addFeedback,
  getOrderDetail,
  userCloseOrder,
  setOrderReminder,
  expertSignOrder,
  adminUrgentOrder,
  expertCloseOrder,
  getSystemConfig,
  expertSetSchedule
} from '@src/api';
import { dingAlert, dingDateTimePicker } from '@src/dingtalkAPI';
import { formatDateTime } from '@src/utils';

type Order = {
  id: number;
  title: string;
  submitterName: string;
  status: OrderStatus;
  resolve_id: number;
  transfer_times: number;
  scheduledAt: string;
  dispatch: number;
  urgent: number;
  completedAt: string;
  serialNumber: string;
  ask_evaluate: string;
  order_rate: number;
  reminder: number;
  adminDingUserId: string;
  content: string;
  files: DingFile[];
  category: string;
  messages: Message[];
  isHandler: boolean; //当前用户是否是工单的签收人（专家）
};

export default function useOrderDetail(
  orderId: string,
  role: Role
): {
  order: Order | null;
  getOrderData: () => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  submitFeedback: (message: string) => Promise<boolean>;
  urgentOrder: () => Promise<boolean>;
  uploadFeedback: (message: string, file: string) => Promise<boolean>;
  signOrder: () => Promise<boolean>;
  setSchedule: () => Promise<boolean>;
  closeOrder: (option: string, orderRate: number) => Promise<boolean>;
  reminderOrder: () => Promise<boolean>;
  requestCloseOrder: () => Promise<boolean>;
} {
  /* 工单数据 */
  const [order, setOrder] = useState<Order | null>(null);

  /* 工单默认处理时长 */
  const [defaultETAHours, setDefaultETAHours] = useState(2);

  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();

  /* 获取系统配置：默认工单处理时长 */
  const getConfig = useCallback(async () => {
    const configRes = await getSystemConfig();
    if (configRes.code === 200) {
      setDefaultETAHours(parseFloat(configRes.data.expectHandle));
    }
  }, []);

  /* 获取工单数据 */
  const getOrderData = useCallback(async () => {
    if (!orderId) {
      return;
    }

    const res = await getOrderDetail(orderId);
    if (res.code !== 200) {
      dingAlert('数据加载失败', '错误', '关闭');
      return;
    }

    let files: DingFile[] = [];
    try {
      if (res.data.accessory) {
        files = JSON.parse(res.data.accessory);
      } else {
        files = [];
      }
    } catch (error) {
      console.error(error);
    }

    setOrder({
      id: res.data.id,
      title: res.data.title,
      submitterName: res.data.ask_name,
      status: res.data.status,
      ask_evaluate: res.data.ask_evaluate || '',
      order_rate: res.data.order_rate || 0,
      scheduledAt: res.data.resolve_at,
      resolve_id: res.data.resolve_id,
      reminder: res.data.reminder,
      urgent: res.data.urgent,
      dispatch: res.data.dispatch,
      transfer_times: res.data.transfer_times || 0,
      adminDingUserId: res.data.adminDingUserId,
      completedAt: res.data.complete_at || '',
      serialNumber: res.data.serial_number || '',
      content: res.data.desc,
      files: files,
      category: res.data.category,
      messages: res.data.replies.map(reply => {
        let filesData: DingFile | string;
        try {
          filesData = JSON.parse(reply.file);
        } catch (e) {
          filesData = reply.file;
        }
        return {
          id: reply.id,
          name: reply.username,
          content: reply.content,
          file: filesData,
          userId: reply.ding_user_id,
          file_type: reply.file_type,
          isSelf: reply.isSelf,
          createdDate: formatDateTime(reply.created_at, 0, 'Y年M月D日'),
          createdTime: formatDateTime(reply.created_at, 0, 'HH:mm'),
          createdAt: reply.created_at
        };
      }),
      isHandler: res.data.isHandler
    });

    setIsLoading(false);
  }, [orderId, setIsLoading]);
  /* 设置预计完成时间 */
  const setSchedule = useCallback(async () => {
    setIsLoading(true);
    try {
      const eta = await dingDateTimePicker(
        Date.now() + MILLISECONDS.A_HOUR * defaultETAHours
      );

      const signRes = await expertSetSchedule(
        orderId,
        formatDateTime(eta.chosen)
      );
      if (signRes.code !== 200) {
        throw new Error('服务异常');
      }

      await getOrderData();
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      dingAlert('操作失败，请稍后再试。', '错误', '确认');
      return false;
    }
  }, [getOrderData, orderId, defaultETAHours, setIsLoading]);
  /* 抢单 */
  const signOrder = useCallback(async () => {
    setIsLoading(true);
    try {
      const eta = await dingDateTimePicker(
        Date.now() + MILLISECONDS.A_HOUR * defaultETAHours
      );

      const signRes = await expertSignOrder(
        orderId,
        formatDateTime(eta.chosen)
      );
      if (signRes.code !== 200) {
        throw new Error('服务异常');
      }

      await getOrderData();
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      dingAlert('操作失败，请稍后再试。', '错误', '确认');
      return false;
    }
  }, [getOrderData, orderId, defaultETAHours, setIsLoading]);
  /* 工单加急 */
  const urgentOrder = useCallback(async () => {
    setIsLoading(true);
    try {
      const urgent = await adminUrgentOrder(1, orderId);
      if (urgent.code !== 200) {
        throw new Error('服务异常');
      }

      await getOrderData();
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      dingAlert('操作失败，请稍后再试。', '错误', '确认');
      return false;
    }
  }, [getOrderData, orderId, defaultETAHours, setIsLoading]);
  /* Todo: 移交工单 */

  /* 专家申请关闭工单 */
  const requestCloseOrder = useCallback(async () => {
    setIsLoading(true);

    const res = await expertCloseOrder(orderId);
    if (res.code !== 200) {
      setIsLoading(false);
      dingAlert('操作失败，请稍后再试。', '错误', '确认');
      return false;
    }

    await getOrderData();
    setIsLoading(false);
    dingAlert('已提交关单申请，请等待用户确认', '提示', '确认');
    return true;
  }, [getOrderData, orderId, setIsLoading]);

  /* 关闭工单 */
  const closeOrder = useCallback(
    async (option: string, orderRate: number) => {
      setIsLoading(true);
      const res = await userCloseOrder(orderId, option, orderRate);
      if (res.code !== 200) {
        setIsLoading(false);
        dingAlert('操作失败，请稍后再试。', '错误', '确认');
        return false;
      }

      await getOrderData();
      setIsLoading(false);
      return true;
    },
    [getOrderData, orderId, setIsLoading]
  );
  /* 催单 */
  const reminderOrder = useCallback(async () => {
    setIsLoading(true);
    const res = await setOrderReminder(orderId);
    if (res.code !== 200) {
      setIsLoading(false);
      if (res.code == 400) {
        dingAlert(res.message, '错误', '确认');
      } else {
        dingAlert('催单失败，请稍后再试。', '错误', '确认');
      }

      return false;
    }
    dingAlert('催单成功，已向专家发送消息。', '提示', '确认');
    await getOrderData();
    setIsLoading(false);
    return true;
  }, [getOrderData, orderId, setIsLoading]);
  //上传附件
  const uploadFeedback = useCallback(
    async (message: string, file: string) => {
      if (!message) {
        return false;
      }

      setIsLoading(true);

      const feedbackRes = await addFeedback(
        orderId,
        message,
        role === Role.USER,
        file
      );

      if (feedbackRes.code !== 200) {
        setIsLoading(false);
        dingAlert('提交失败，请稍后再试。', '错误', '确认');
        return false;
      }

      await getOrderData();

      setIsLoading(false);

      return true;
    },
    [getOrderData, orderId, role, setIsLoading]
  );
  /* 提交工单回复 */
  const submitFeedback = useCallback(
    async (message: string) => {
      if (!message) {
        return false;
      }

      setIsLoading(true);

      const feedbackRes = await addFeedback(
        orderId,
        message,
        role === Role.USER
      );

      if (feedbackRes.code !== 200) {
        setIsLoading(false);
        dingAlert('提交失败，请稍后再试。', '错误', '确认');
        return false;
      }

      await getOrderData();

      setIsLoading(false);

      return true;
    },
    [getOrderData, orderId, role, setIsLoading]
  );

  /* 初始加载工单数据 */
  useEffect(() => {
    getOrderData();

    getConfig();
  }, [getOrderData, getConfig]);

  return {
    order,
    getOrderData,
    isLoading,
    setIsLoading,
    urgentOrder,
    submitFeedback,
    uploadFeedback,
    signOrder,
    setSchedule,
    closeOrder,
    reminderOrder,
    requestCloseOrder
  };
}
