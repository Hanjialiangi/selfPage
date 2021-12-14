import React, { useEffect, useState } from 'react';
import Page from '@components/layout/Page';
import { getResidentList } from '@src/api';
import CardEach from '@components/jk_layout/CardEach';
import SearchCard from '@components/jk_layout/SearchCard';
import { Link } from 'react-router-dom';
import { BScrollConfig, getFormVaildValue } from '@src/utils';
import { ArrowDownIcon } from '@src/assets/svg/picture';
import { userInfoSelector } from '@src/redux/selectors';
import { useSelector } from 'react-redux';
import { judgeRole } from '@src/utils';

type DR = [
  {
    open_id: string;
    name: string;
    resident_property: string;
    quarantine_type: string;
    quarantine_hotel: string;
    sub_district: string;
    planned_quarantine_hotel: string;
  }
];

const pageSize = 10; //页面大小
let sum = 0; //累加次数
export default function ArriveListPage(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  const [data, setData] = useState([
    {
      open_id: '',
      name: '',
      resident_property: '',
      quarantine_type: '',
      quarantine_hotel: '',
      sub_district: '',
      planned_quarantine_hotel: ''
    }
  ]); //数据

  const [total, setTotal] = useState(1); //总页数
  const [current, SetCurrent] = useState(1); //当前页数
  const [form, setForm] = useState<any>(); //表单项

  //搜索引擎
  const handleSearch = async (
    page = 1,
    formvalue = {},
    current_stage = ['转运至酒店中', '转运至社区中', '转运至居家隔离酒店中']
  ) => {
    const role = judgeRole(userInfo.role);
    const res = await getResidentList(
      pageSize,
      page,
      role,
      formvalue,
      current_stage
    );
    if (page === 1) {
      sum = 0;
    }
    const detailResult: DR = [
      {
        open_id: '',
        name: '',
        resident_property: '',
        quarantine_type: '',
        quarantine_hotel: '',
        sub_district: '',
        planned_quarantine_hotel: ''
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
        let planned_quarantine_hotel = '';
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
          if (item2.key === 'planned_quarantine_hotel') {
            planned_quarantine_hotel = item2.value;
          }
        });
        detailResult.push({
          open_id,
          name,
          resident_property,
          quarantine_type,
          quarantine_hotel,
          sub_district,
          planned_quarantine_hotel
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
    <Page title="待接收人员名单">
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
