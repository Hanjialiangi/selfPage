import Page from '@components/layout/Page';
import React, { useEffect, useState } from 'react';
import SearchCardHotel from '@components/hotel/SearchCardHotel';
import { Link } from 'react-router-dom';
import { ArrowDownIcon } from '@src/assets/svg/picture';
import HotelCard from '@components/hotel/HotelCard';
import { BScrollConfig, getFormVaildValue } from '@src/utils';
import { getHotelListAll } from '@src/api';
import { HotelType } from '@pages/people_detail/receive';

const pageSize = 10; //页面大小
let sum = 0; //累加次数
export default function HotelListPage(): JSX.Element {
  const [data, setData] = useState<HotelType[]>(); //酒店清单

  const [total, setTotal] = useState(1); //总页数
  const [current, SetCurrent] = useState(1); //当前页数

  //搜搜引擎
  const handleSearch = async (page = 1, formvalue = {}) => {
    const res = await getHotelListAll(pageSize, page, formvalue);
    if (page === 1) {
      sum = 0;
    }
    if (res.code === 200) {
      setTotal(Math.ceil(res.data.total / pageSize));
      SetCurrent(res.data.current_page);
      setData(res.data.data);
    }
  };
  //提交
  const submit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const hotel_name = formData.get('hotel_name');
    const state = formData.get('state');
    const capacity = formData.get('capacity');
    const formvalue = {
      hotel_name,
      state,
      capacity
    };
    handleSearch(1, formvalue);
  };
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
    <Page title="酒店管理清单">
      <div className="wrapper">
        <div style={{ position: 'relative', marginTop: '90px' }}>
          <form
            noValidate
            autoComplete="off"
            style={{ paddingBottom: '10px' }}
            onSubmit={submit}
          >
            <SearchCardHotel />
          </form>
          {data?.map((item, index) => {
            return (
              <Link to={`/detail/hotel/${item.id}`} key={index}>
                <HotelCard detail={item} key={index} />
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
