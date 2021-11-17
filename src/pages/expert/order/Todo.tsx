import React from 'react';
import Page from '@components/layout/Page';
import TodoCard from './TodaCard';

export default function ExpertTodo(): JSX.Element {
  return (
    <Page title="我的待办">
      <TodoCard />
    </Page>
  );
}
