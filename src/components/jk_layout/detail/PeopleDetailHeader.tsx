import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Properties } from '@pages/people_detail/Index';

export default function PeopleDetailHeader(props: { info: any }): JSX.Element {
  const [baseInfo, setBaseInfo] = useState<any[]>(); //基础属性

  useEffect(() => {
    //处理props
    const array: Properties[] = [];
    props.info.map((item: Properties) => {
      if (item.key === 'current_state') {
        return;
      }
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
              variant="body2"
              key={item.key_id}
              style={{
                marginBottom: '5px',
                flex: '1 0 auto',
                minWidth: '50%',
                alignItems: 'center'
              }}
            >
              <span
                style={{
                  color: 'gray',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap'
                }}
              >
                {item.key_name}:
              </span>
              <span
                style={{
                  color: 'black',
                  flexWrap: 'nowrap',
                  marginLeft: '10px',
                  whiteSpace: 'nowrap'
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
