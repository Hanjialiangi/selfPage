import React, { useCallback, useState } from 'react';
import Page from '@components/layout/Page';
import commonStyle from '@styleModules/common.module.scss';
import { Tabs, Tab } from '@material-ui/core';
import ExchangeList from '@src/components/uersAndExportRewards/ExchangeList';
import RewardsList from '@src/components/uersAndExportRewards/RewardsList';

export default function ExchangeListIndex(): JSX.Element {
  const [selectTabIndes, setselectTabIndes] = React.useState(0);

  const handleShowList = () => {
    setselectTabIndes(1);
  };
  const handleShowRewards = () => {
    setselectTabIndes(0);
  };

  return (
    <Page title="奖品兑换">
      <Tabs
        value={selectTabIndes}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        className={commonStyle.whiteBackground}
      >
        <Tab label="兑换列表" onClick={handleShowRewards} />
        <Tab label="我的兑换" onClick={handleShowList} />
      </Tabs>
      {selectTabIndes === 0 && <RewardsList />}
      {selectTabIndes === 1 && <ExchangeList />}
    </Page>
  );
}
