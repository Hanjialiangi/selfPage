import React, { useCallback, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Page from '@components/layout/Page';
import ScoreList, { Score } from '@components/ScoreList/ScoreList';
import useLoading from '@src/hooks/useLoading';
import { queryExpertScore, ExpertScoreQuery, getExpertScore } from '@src/api';
import useList from '@src/hooks/useList';
import { formatDateTime } from '@src/utils';

enum TabIndexes {
  ORDER_SCORE,
  SCORE_EXCHANGE
}

/* 获取当前剩余积分 */
async function getRemainScore(
  setScore: React.Dispatch<React.SetStateAction<number>>
) {
  const scoreRes = await getExpertScore();
  if (scoreRes.code !== 200) {
    return;
  }

  setScore(scoreRes.data.integral);
}

/* 获取积分记录 */
async function getScoreList(
  query: ExpertScoreQuery,
  setData: React.Dispatch<React.SetStateAction<Score[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const res = await queryExpertScore(query);
  if (res.code !== 200) {
    return;
  }

  setData(
    res.data.map(item => {
      return {
        id: item.id,
        reason: item.reason,
        point: item.point,
        createdAt: formatDateTime(item.created_at, 0, 'Y年M月D日 HH:mm:ss')
      };
    })
  );

  setIsLoading(false);
}

export default function ExpertScoreIndex(): JSX.Element {
  /* 当前 tab 的 index */
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  /* 切换 tab 事件处理 */
  const handleSwitchTab = useCallback((_evt: unknown, tabIndex: number) => {
    setSelectedTabIndex(tabIndex);
  }, []);

  /* 工单积分记录 */
  const [orderScoreList, isOrderScoreListEmpty, setOrderScoreList] =
    useList<Score>();

  /* 积分兑换记录 */
  const [scoreExchangeList, isScoreExchangeListEmpty, setScoreExchangeList] =
    useList<Score>();

  /* 当前剩余积分 */
  const [score, setScore] = useState(0);

  /* 是否正在加载数据 */
  const [isLoading, setIsLoading] = useLoading();

  /* 加载剩余积分 */
  useEffect(() => {
    getRemainScore(setScore);
  }, []);

  /* 切换 tab 、更新查询参数之后重新加载积分记录 */
  useEffect(() => {
    setIsLoading(true);
    //Todo: 查询条件
    if (selectedTabIndex === TabIndexes.ORDER_SCORE) {
      getScoreList(
        {
          type: 'EXPERT',
          isExchange: 0
        },
        setOrderScoreList,
        setIsLoading
      );
      return;
    }

    if (selectedTabIndex === TabIndexes.SCORE_EXCHANGE) {
      getScoreList(
        {
          type: 'EXPERT',
          isExchange: 1
        },
        setScoreExchangeList,
        setIsLoading
      );
      return;
    }
  }, [selectedTabIndex, setIsLoading, setOrderScoreList, setScoreExchangeList]);

  return (
    <Page title="我的积分">
      <Box marginBottom={1.5}>
        <Paper elevation={0} square>
          <Box paddingY={4}>
            <Grid direction="column" alignItems="center" container>
              <Typography variant="h4" color="primary">
                {score}
              </Typography>
              <Typography variant="caption">当前积分</Typography>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Box marginBottom={1.5}>
        <Paper elevation={0} square>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            value={selectedTabIndex}
            onChange={handleSwitchTab}
          >
            <Tab label="工单积分" />
            <Tab label="积分兑换记录" />
          </Tabs>
          {selectedTabIndex === TabIndexes.ORDER_SCORE && (
            <ScoreList
              scores={orderScoreList}
              isEmpty={!isLoading && isOrderScoreListEmpty}
            />
          )}
          {selectedTabIndex === TabIndexes.SCORE_EXCHANGE && (
            <ScoreList
              scores={scoreExchangeList}
              isEmpty={!isLoading && isScoreExchangeListEmpty}
            />
          )}
        </Paper>
      </Box>
    </Page>
  );
}
