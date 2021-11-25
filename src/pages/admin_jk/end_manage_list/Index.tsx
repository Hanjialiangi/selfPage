import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { getResidentList } from '@src/api';
import CardEach from '@components/jk_layout/CardEach';
import SearchCard from '@components/jk_layout/SearchCard';
import { Link } from 'react-router-dom';
import { BScrollConfig } from '@src/utils';
import { ArrowDownIcon } from '@src/assets/svg/picture';

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
export default function ManageListPage(): JSX.Element {
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

  const [total, setTotal] = useState(1); //总页数
  const [current, SetCurrent] = useState(1); //当前页数
  const [form, setForm] = useState<any>(); //表单项

  //搜索引擎
  const handleSearch = async (
    page = 1,
    formvalue = {},
    current_state = ['结案', '医院治疗中']
  ) => {
    const res = await getResidentList(pageSize, page, formvalue, current_state);
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
      setTotal(Math.ceil(res.data.total / pageSize));
      SetCurrent(res.data.current_page);
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
    }
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
    const quarantine_hotel = formData.get('quarantine_hotel');
    const home_address = formData.get('home_address');
    const formvalue = {
      name,
      contact,
      id_card,
      resident_property,
      quarantine_type,
      quarantine_hotel,
      home_address
    };
    setForm(formvalue);
    handleSearch(1, formvalue);
  };

  //副作用
  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      const bs = BScrollConfig(wrapper);
      if (total > 1) {
        bs.on('pullingUp', async () => {
          //获取页数
          await handleSearch(current + 1, form);
          // location.href = `/admin_jk/resident_list/${current + 1}`;
          if (current < total) {
            setTimeout(() => {
              bs.finishPullUp();
            }, 5000);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, current]);

  return (
    <Page title="结束管理人员名单">
      <div className="wrapper">
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
          <div
            style={{
              textAlign: 'center',
              margin: '0 auto',
              color: 'gray'
            }}
          >
            {current >= total ? (
              <span className="bottom">--已经到底了--</span>
            ) : (
              <span className="refsh">
                <ArrowDownIcon />
                上滑刷新
              </span>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
