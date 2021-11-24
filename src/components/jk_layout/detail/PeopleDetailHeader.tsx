import React, { useEffect, useState } from 'react';
import { Paper, Box, Typography } from '@material-ui/core';
import StatusIcon from '@components/StatusIcon';
import { Properties } from '@pages/people_detail/Index';

const status = 3;
export default function PeopleDetailHeader(props: { info: any }): JSX.Element {
  const [baseInfo, setBaseInfo] = useState<any[]>(); //基础属性
  const [name, setName] = useState(''); //人员名字
  const [residentProperty, setResidentProperty] = useState(''); //人员属性
  const [quarantineType, setQuarantineType] = useState(''); //隔离方式
  useEffect(() => {
    //处理props
    const array: Properties[] = [];
    props.info.map((item: Properties) => {
      if (item.key === 'name') {
        array.push(item);
        setName(item.value);
      } else if (item.key === 'resident_property') {
        setResidentProperty(item.value);
      } else if (item.key === 'quarantine_type') {
        setQuarantineType(item.value);
      } else if (item.key === 'current_state') {
        return;
      }
      array.push(item);
      setBaseInfo(array);
    });
  }, []);
  return (
    <Box>
      <Paper elevation={0} square>
        <Box>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">{name}的基本信息</Typography>
            <Typography
              variant="subtitle1"
              color={'secondary'}
              component={'span'}
            >
              {residentProperty}
            </Typography>
          </div>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            <span style={{ color: 'gray' }}>隔离类型：</span>
            {quarantineType}
          </Typography>
          <div style={{ marginTop: '10px' }}>
            <StatusIcon exchangeStatus={5} status={status} />
          </div>
        </Box>
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
                style={{ marginBottom: '5px' }}
              >
                <span style={{ color: 'gray', flexWrap: 'nowrap' }}>
                  {item.key_name}:
                  <span
                    style={{
                      color: 'black',
                      flexWrap: 'nowrap',
                      marginLeft: '10px'
                    }}
                  >
                    {item.value}
                  </span>
                </span>
              </Typography>
            );
          })}
        </div>
      </Paper>
    </Box>
  );
}
