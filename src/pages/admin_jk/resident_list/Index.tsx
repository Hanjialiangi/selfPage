import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { searchResidentList } from '@src/api';
import CardEach from '@components/jk_layout/CardEach';
import SearchCard from '@components/jk_layout/SearchCard';

const columns = [
  {
    id: 1,
    name: '田伟琪',
    contact_type: '密切接触',
    isolation_type: '酒店',
    place: '维也纳酒店'
  },
  {
    id: 2,
    name: '张三',
    contact_type: '非密切接触',
    isolation_type: '社区',
    place: '锦绣家园'
  },
  {
    id: 3,
    name: '李四',
    contact_type: '次密切接触',
    isolation_type: '酒店',
    place: '锦绣天府'
  },
  {
    id: 4,
    name: '孔融',
    contact_type: '次密切接触',
    isolation_type: '酒店',
    place: '无主之地'
  }
];
export default function ResidentListPage(): JSX.Element {
  const [data, setData] = useState(columns); //数据

  //搜索引擎
  const handleSearch = async (formvalue = {}) => {
    const res = await searchResidentList(formvalue);
    // setData(res.data);
  };

  //提交按钮
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();
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
    <Page title="被隔离人员名单">
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
