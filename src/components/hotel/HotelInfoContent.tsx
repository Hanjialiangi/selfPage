import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { isValidKey } from '@src/utils';

export default function HotelInfoContent(props: {
  info: {
    address: string;
    available_number: string;
    capacity: string;
    name: string;
  };
}): JSX.Element {
  const [baseInfo, setBaseInfo] = useState({
    address: '',
    available_number: '',
    capacity: '',
    name: ''
  }); //基础属性
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
    setBaseInfo(props.info);
  }, [props.info]);

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
        {Object.keys(baseInfo).map(key => {
          return (
            <Typography key={key} style={key.length > 18 ? strong : usual}>
              <span
                style={{
                  color: 'gray',
                  whiteSpace: 'nowrap'
                }}
              >
                {key}:
              </span>
              <span
                style={{
                  color: 'black',
                  marginLeft: '10px'
                }}
              >
                {isValidKey(key, baseInfo) && baseInfo[key]}
              </span>
            </Typography>
          );
        })}
      </div>
    </Box>
  );
}
