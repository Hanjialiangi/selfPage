import { useCallback, useEffect, useState } from 'react';
import { MILLISECONDS, OrderStatus, Role } from '@src/constants';
import useLoading from './useLoading';

import {
  addExcheangeApply,
  getPrizeDetail,
  getExchangeApply,
  updateExcheangeApply
} from '@src/api';
import { dingAlert, dingDateTimePicker } from '@src/dingtalkAPI';
import { formatDateTime } from '@src/utils';

type Prize = {
  id: number;
  name: string;
  number: string;
  status: number;
  need_integral: number;
  limit_number: string;
};
type Apply = {
  id: number;
  prize_id: number;
  prize_name: string;
  prize_number: number;
  need_integral: number;
  exchange_user_id: number;
  exchange_user_name: string;
  exchange_user_number: string;
  feedback: string;
  created_at: string;
  status: number;
};
export default function prizeDetail(
  PrizeId: string,
  role: Role
): {
  PrizeData: Prize | null;
  getPrizeData: () => Promise<void>;
  isLoading: boolean;
  getApplyList: (userId: number | string) => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  applyPrize: (
    prizeId: number,
    prizeName: string,
    number: number,
    needIntegral: number
  ) => Promise<boolean>;
  handleExcheangeApply: (
    applyId: number,
    status: number,
    feedback: string
  ) => Promise<boolean>;
} {
  /* 工单数据 */
  const [PrizeData, setPrizeData] = useState<Prize | null>(null);
  const [applyList, setapplyList] = useState<Apply[] | null>(null);

  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();

  /* 获取奖品数据 */
  const getPrizeData = useCallback(async () => {
    if (!PrizeId) {
      return;
    }

    const res = await getPrizeDetail(PrizeId);
    if (res.code !== 200) {
      dingAlert('数据加载失败', '错误', '关闭');
      return;
    }
    setPrizeData({
      id: res.data.id,
      number: res.data.id,
      need_integral: res.data.need_integral,
      status: res.data.status,
      name: res.data.name,
      limit_number: res.data.limit_number
    });
    setIsLoading(false);
  }, [PrizeId, setIsLoading]);
  /* 审核 */
  const handleExcheangeApply = useCallback(
    async (applyId: number, status: number, feedback?: string) => {
      const res = await updateExcheangeApply(applyId, status, feedback);
      if (res.code !== 200) {
        dingAlert('数据加载失败', '错误', '关闭');
        return false;
      }
      setIsLoading(false);
      return true;
    },
    [setIsLoading]
  );

  /* 获取申请列表 */
  const getApplyList = useCallback(async () => {
    const res = await getExchangeApply({});
    if (res.code !== 200) {
      dingAlert('数据加载失败', '错误', '关闭');
      return;
    }
    setapplyList(res.data);

    setIsLoading(false);
  }, [setIsLoading]);

  /* 申请数据 */
  const applyPrize = useCallback(
    async (
      prizeId: number,
      prizeName: string,
      number: number,
      needIntegral: number
    ) => {
      setIsLoading(true);
      const res = await addExcheangeApply(
        prizeId,
        prizeName,
        number,
        needIntegral
      );
      if (res.code !== 200) {
        setIsLoading(false);
        dingAlert('操作失败，请稍后再试。', '错误', '确认');
        return false;
      }
      setIsLoading(false);
      return true;
    },
    [getPrizeData, PrizeId, setIsLoading]
  );

  /* 初始加载工单数据 */
  useEffect(() => {
    getPrizeData();
  }, [getPrizeData]);

  return {
    PrizeData,
    getPrizeData,
    isLoading,
    setIsLoading,
    applyPrize,
    getApplyList,
    handleExcheangeApply
  };
}
