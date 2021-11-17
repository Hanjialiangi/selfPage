import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Page from '@components/layout/Page';

import { Role } from '@src/constants';
import prizeDetail from '@src/hooks/prizeDetail';
import commonStyle from '@styleModules/common.module.scss';
import { dingConfirm, dingOpenLink } from '@src/dingtalkAPI';
import { configDingtalk, getURL } from '@src/utils';
import { dingUploadFile } from '@src/dingtalkAPI';
import { getDingFilePermission } from '@src/api';
import { Dingtalk } from '@src/constants';
export default function PrizeDetail(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const { prizeId }: { prizeId: string } = useParams();

  /* 是否显示抢单按钮 */
  const [isApplyButtonVisible, setIsApplyButtonVisible] = useState(false);

  /* 工单详情数据和方法 */
  const { PrizeData, isLoading, applyPrize, getPrizeData } = prizeDetail(
    prizeId,
    Role.EXPERT
  );

  /* 转单 */
  const handleTransferOrder = useCallback(async () => {
    if (!PrizeData) {
      return;
    }
    dingOpenLink(getURL(`expert/order/${PrizeData.id}/toExpert`));
  }, [PrizeData]);
  /* 数据 */
  const handleApply = () => {};
  /* 加载页面数据 */
  async function getData() {
    getPrizeData();
  }
  useEffect(() => {
    if (!PrizeData) {
      return;
    }
    getData();
  }, [PrizeData]);

  return (
    <Page title="奖品详情" paddingBottom={30}>
      {PrizeData && (
        <>
          {isApplyButtonVisible && (
            <Box margin={1.5}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleApply}
                className={commonStyle.whiteBackground}
                disabled={isLoading}
                fullWidth
              >
                抢单
              </Button>
            </Box>
          )}
        </>
      )}
    </Page>
  );
}
