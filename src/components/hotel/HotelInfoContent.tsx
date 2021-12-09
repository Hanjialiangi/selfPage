import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Properties } from '@pages/people_detail/Index';

export default function HotelInfoContent(props: { info: any }): JSX.Element {
  const [baseInfo, setBaseInfo] = useState<any[]>(); //基础属性
  const usual = {
    marginBottom: '5px',
    flex: '1 0 auto',
    minWidth: '50%',
    alignItems: 'center',
    fontSize: '14px'
  }; //普通样式
  const strong = {
    marginBottom: '5px',
    flex: '1 0 auto',
    minWidth: '50%',
    alignItems: 'center',
    fontSize: '14px',
    width: '100%'
  }; //加强样式

  useEffect(() => {
    //处理props
    const array: Properties[] = [];
    props.info.map((item: Properties) => {
      array.push(item);
      setBaseInfo(array);
    });
  }, []);
  return (
    <Box>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: '10px'
        }}
      >
        {baseInfo?.map((item: Properties) => {
          return (
            <Typography
              key={item.key_id}
              style={item.value.length > 18 ? strong : usual}
            >
              <span
                style={{
                  color: 'gray',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.key_name}:
              </span>
              <span
                style={{
                  color: 'black',
                  marginLeft: '10px'
                }}
              >
                {item.value}
              </span>
            </Typography>
          );
        })}
      </div>
    </Box>
  );
}
