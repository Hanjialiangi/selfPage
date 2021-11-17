import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import commonStyles from '@styleModules/common.module.scss';
import { FilterIcon } from '@components/SvgIcons';

//数据源
const res = [
  {
    title: '工单标题',
    type: '问题分类',
    description: 'xxxxxxjajfsajflkjsalkaslkflkasflkkalkaljklkflkaflksa',
    date: '2020/06/06',
    state: '已回复'
  },
  {
    title: '工单标题',
    type: '问题分类',
    description: 'xxxxxxjajfsajflkjsalkaslkflkasflkkalkaljklkflkaflksa',
    date: '2021/07/25',
    state: '处理中'
  },
  {
    title: '工单标题',
    type: '问题分类',
    description: 'xxxxxxjajfsajflkjsalkaslkflkasflkkalkaljklkflkaflksa',
    date: '2021/07/31',
    state: '等待处理'
  }
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
export default function IndexComponent(): JSX.Element {
  const [value, setValue] = React.useState(0);

  //获取工单信息
  const [orderInformation, setOrderInformation] = useState([
    {
      title: '',
      type: '',
      description: '',
      date: '',
      state: ''
    }
  ]);
  //初始化数据
  useEffect(() => {
    setOrderInformation(res);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper square style={{ paddingLeft: '2rem' }}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          <Tab
            style={{ marginRight: '4rem', marginLeft: '2rem' }}
            label="处理中"
          />
          <Tab style={{ marginRight: '4rem' }} label="已超时" />
          <Tab style={{ marginRight: '4rem' }} label="已结束" />
          <div className={commonStyles.filterIcon}>
            <FilterIcon />
          </div>
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {orderInformation.map((item, key) => {
          return (
            <div
              key={key}
              className={commonStyles.totalProperty}
              style={{ paddingBottom: '1rem' }}
            >
              <div className={commonStyles.lastLabel}>
                {item.title}
                <span>{item.type}</span>
              </div>
              <div>{item.description}</div>
              <span>{item.date}</span>
              <span>{item.state}</span>
            </div>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        超时部分
      </TabPanel>
      <TabPanel value={value} index={2}>
        结束部分
      </TabPanel>
    </>
  );
}
