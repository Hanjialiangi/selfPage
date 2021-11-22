import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { getResidentList } from '@src/api';
import CardEach from '@components/jk_layout/CardEach';
import SearchCard from '@components/jk_layout/SearchCard';
import { Link } from 'react-router-dom';

type DR = [
  {
    open_id: string;
    name: string;
    resident_property: string;
    quarantine_type: string;
    quarantine_hotel: string;
    sub_district: string;
  }
];
export default function ResidentListPage(): JSX.Element {
  const [data, setData] = useState([
    {
      open_id: '',
      name: '',
      resident_property: '',
      quarantine_type: '',
      quarantine_hotel: '',
      sub_district: ''
    }
  ]); //数据

  //搜索引擎
  const handleSearch = async (formvalue = {}) => {
    const res = await getResidentList(formvalue);
    const detailResult: DR = [
      {
        open_id: '',
        name: '',
        resident_property: '',
        quarantine_type: '',
        quarantine_hotel: '',
        sub_district: ''
      }
    ];
    res.data.data.map((item: any) => {
      const name = item.name;
      const open_id = item.open_id;
      let resident_property = '';
      let quarantine_type = '';
      let quarantine_hotel = '';
      let sub_district = '';
      item.properties.map((item2: any) => {
        if (item2.key === 'resident_property') {
          resident_property = item2.resident_property;
        }
        if (item2.key === 'quarantine_type') {
          quarantine_type = item2.quarantine_type;
        }
        if (item2.key === 'quarantine_hotel') {
          quarantine_hotel = item2.quarantine_hotel;
        }
        if (item2.key === 'sub_district') {
          sub_district = item2.sub_district;
        }
      });
      detailResult.push({
        open_id,
        name,
        resident_property,
        quarantine_type,
        quarantine_hotel,
        sub_district
      });
    });
    detailResult.shift();
    setData(detailResult);
  };

  //提交按钮
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const contact = formData.get('contact');
    const id_card = formData.get('id_card');
    const resident_property = formData.get('resident_property');
    const quarantine_type = formData.get('quarantine_type');
    const place = formData.get('place');
    const formvalue = {
      name,
      contact,
      id_card,
      resident_property,
      quarantine_type,
      place
    };
    handleSearch(formvalue);
  };

  //副作用
  useEffect(() => {
    handleSearch();
  }, []);

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
          return (
            <Link to={`/detail/resident/${item.open_id}`} key={index}>
              <CardEach detail={item} key={index} />
            </Link>
          );
        })}
      </div>
    </Page>
  );
}
