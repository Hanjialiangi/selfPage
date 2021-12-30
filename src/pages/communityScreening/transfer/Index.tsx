import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { Link } from 'react-router-dom';
import SearchCard from '@components/communityScreening/SearchCard';
import { getResidentList } from '@src/api';
import CardEach from '@components/jk_layout/CardEach';

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
const pageSize = 10; //页面大小
export default function CommunityPage(): JSX.Element {
  const [data, setData] = useState([
    {
      open_id: '',
      name: '',
      resident_property: '',
      quarantine_type: '',
      quarantine_hotel: '',
      sub_district: ''
    }
  ]);
  const handleSearch = async (
    page = 1,
    formvalue = {},
    current_state = [
      '集中隔离中',
      '解除后居家隔离中',
      '居家隔离中',
      '健康监测中',
      '医院治疗中'
    ]
  ) => {
    const res = await getResidentList(
      pageSize,
      page,
      'wh_cdc',
      formvalue,
      current_state
    );
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
    if (res.code === 200) {
      res.data.data.map((item: any) => {
        const name = item.name;
        const open_id = item.open_id;
        let resident_property = '';
        let quarantine_type = '';
        let quarantine_hotel = '';
        let sub_district = '';
        item.properties.map((item2: any) => {
          if (item2.key === 'resident_property') {
            resident_property = item2.value;
          }
          if (item2.key === 'quarantine_type') {
            quarantine_type = item2.value;
          }
          if (item2.key === 'quarantine_hotel') {
            quarantine_hotel = item2.value;
          }
          if (item2.key === 'sub_district') {
            sub_district = item2.value;
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
    }
  };

  const submit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const contact = formData.get('contact');
    const id_card = formData.get('id_card');
    const source = formData.get('source');
    const formvalue = {
      name,
      contact,
      id_card,
      source
    };
    console.log(formvalue);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <Page title="转运组">
      <div className="container" style={{ marginTop: '90px' }}>
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
