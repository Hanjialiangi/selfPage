import React, { useCallback, useState } from 'react';
import Page from '@components/layout/Page';
import commonStyle from '@styleModules/common.module.scss';
import { Tabs, Tab, Button } from '@material-ui/core';
import Link from '@components/Link';
import Navigation from '@components/Navigation';
import ExchangeList from '@src/pages/admin/rewards/ExchangeList';
import AdminExchangeDetail from './AdminExchangeDetail';
import Agree from './Agree';

export default function ExchangeListIndex(): JSX.Element {
  return (
    <Page title="奖品兑换申请">
      <div>{ExchangeList ? <ExchangeList /> : null}</div>
    </Page>
  );
}
