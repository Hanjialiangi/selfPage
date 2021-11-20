import React, { useEffect } from 'react';
import Page from '@components/layout/Page';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function PeopleDetailPage(): JSX.Element {
  const param: { id: string } = useParams(); //获取路由参数

  const Init = () => {
    //TODO://根据id获取信息
  };
  useEffect(() => {
    Init();
    console.log(param.id);
  }, [param.id]);
  return (
    <Page title="人员详情">
      人员基本信息
      <div style={{ marginTop: '100px' }}>
        <Link to={`/detail/resident/${param.id}/baseinfo/edit`}>
          <Button variant="outlined" color="primary">
            修改
          </Button>
        </Link>
        <Link to={`/detail/transfer/${param.id}/edit`}>
          <Button variant="outlined" color="primary">
            转运
          </Button>
        </Link>
        <Link to={`/detail/arrive/${param.id}/edit`}>
          <Button variant="outlined" color="primary">
            隔离接收
          </Button>
        </Link>
      </div>
    </Page>
  );
}
