import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { searchResidentList } from '@src/api';
import CardEach from '@components/jk_layout/CardEach';
import SearchCard from '@components/jk_layout/SearchCard';

export default function ResidentListPage(): JSX.Element {
  const columns = [
    {
      id: 1,
      name: '余小c',
      contact_type: '密切接触',
      isolation_type: '酒店',
      place: '贝多芬酒店'
    },
    {
      id: 2,
      name: '钩',
      contact_type: '密切接触',
      isolation_type: '社区',
      place: '锦绣天下'
    }
  ];

  const [data, setData] = useState(columns); //数据
  //搜索引擎
  const handleSearch = async (formvalue = {}) => {
    const res = await searchResidentList(formvalue);
    // setData(res.data);
  };
  //提交按钮
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const phone = formData.get('phone');
    const cardnumber = formData.get('cardnumber');
    const contact_type = formData.get('contact_type');
    const isolation_type = formData.get('isolation_type');
    const place = formData.get('place');
    const formvalue = {
      username,
      phone,
      cardnumber,
      contact_type,
      isolation_type,
      place
    };
    handleSearch(formvalue);
  };

  //副作用
  useEffect(() => {
    handleSearch();
  });

  return (
    <Page title="待转运人员名单">
      <div style={{ position: 'relative', marginTop: '90px' }}>
        <form
          noValidate
          autoComplete="off"
          style={{ paddingBottom: '10px' }}
          onSubmit={submit}
        >
          <SearchCard />
        </form>
        {data.map((item, index) => {
          return <CardEach detail={item} key={index} />;
        })}
      </div>
    </Page>
  );
}
