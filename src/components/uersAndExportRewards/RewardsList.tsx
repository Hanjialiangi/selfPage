import React, { useState, useEffect } from 'react';
import { Box, Card, Grid } from '@material-ui/core';
import ExchangeCard from '@components/uersAndExportRewards/ExchangeCard';
import { EmptyIcon } from '@components/SvgIcons';
import { getAllPrize } from '@src/api';
import moment from 'moment';
type Prize = {
  id: number;
  name: string;
  number: string;
  status: number;
  need_integral: number;
  limit_number: string;
  created_at: string;
};

export default function ExchangeList(): JSX.Element {
  const [exchangeData, setExchangeData] = useState<Prize[]>();
  const initData = async () => {
    const res = await getAllPrize({});
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
              link={'/expert/apply/prize/' + exchange.id.toString()}
              rewardsName={exchange.name}
              exchangeTime={moment(exchange.created_at).format(
                'YYYY-MM-DD HH:mm:ss'
              )}
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
