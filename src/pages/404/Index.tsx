import { Result, Button } from 'antd';
import React from 'react';
import useDocumentTitle from '@src/hooks/useDoucumentTitle';

export default function NotFound(): JSX.Element {
  useDocumentTitle('404页面');

  const handleBack = () => {
    window.location.href = '/home';
  };
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={handleBack}>
          Back Home
        </Button>
      }
    />
  );
}
