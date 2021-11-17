import React, { useState, useEffect } from 'react';
import { Box, Card, Grid } from '@material-ui/core';
import ExchangeCard from '@components/uersAndExportRewards/ExchangeCard';
import { EmptyIcon } from '@components/SvgIcons';
import { getExchangeApply } from '@src/api';
import moment from 'moment';
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

export default function ExchangeList(): JSX.Element {
  const [exchangeData, setExchangeData] = useState<Apply[]>();
  const initData = async () => {
    const res = await getExchangeApply({});
    if (res.code == 200) {
      setExchangeData(res.data);
    }
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      <Box>
        {exchangeData &&
          exchangeData.map(exchange => (
            <ExchangeCard
              key={exchange.id}
              link={'/expert/apply/detail/' + exchange.id.toString()}
              rewardsName={exchange.prize_name}
              exchangeTime={moment(exchange.created_at).format(
                'YYYY-MM-DD HH:mm:ss'
              )}
              exchangeStatus={exchange.status}
            />
          ))}
      </Box>{' '}
      :{' '}
      <Grid container justifyContent="center">
        <Box margin={3}>
          <EmptyIcon width="10rem" />
        </Box>
      </Grid>
    </div>
  );
}
