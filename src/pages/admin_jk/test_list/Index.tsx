import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { getSamplingList } from '@src/api';
import SearchCard from '@components/jk_layout/SearchCard';
import { BScrollConfig, getFormVaildValue } from '@src/utils';
import TestCard from '@components/jk_layout/TestCard';
import { ArrowDownIcon } from '@src/assets/svg/picture';

const pageSize = 10;
let sum = 0;
export default function TestListPage(): JSX.Element {
  const [data, setData] = useState([
    {
      name: '',
      contact: '',
      planned_date: '',
      sampling_date: '',
      sampling_result: ''
    }
  ]); //数据

  const [total, setTotal] = useState(1); //总页数
  const [current, SetCurrent] = useState(1); //当前页数
  const [form, setForm] = useState<any>(); //表单项

  //搜索引擎
  const handleSearch = async (page = 1, formvalue = {}) => {
    const res = await getSamplingList(pageSize, page, formvalue);

    if (res.code === 200) {
      setTotal(Math.ceil(res.data.total / pageSize));
      SetCurrent(res.data.current_page);
      setData(res.data.data);
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
      if (sum < total - 1) {
        bs.on('pullingUp', async () => {
          //获取页数
          sum++;
          await handleSearch(current + sum, getFormVaildValue());
          // location.href = `/admin_jk/resident_list/${current + 1}`;
          if (current + sum < total) {
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
    <Page title="本日采样人员名单">
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
            return <TestCard detail={item} key={index} />;
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
