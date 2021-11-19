import React from 'react';
import Page from '@components/layout/Page';

export default function AdminHomePage(): JSX.Element {
  return (
    <Page title="疾控中心">
      <div className="container" style={{ marginTop: '90px' }}>
        欢迎来到疫情防控中心
      </div>
    </Page>
  );
}
