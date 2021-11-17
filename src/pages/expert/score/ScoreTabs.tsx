import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import commonStyles from '@styleModules/common.module.scss';

//数据源
const res = [
  {
    operation: '兑换积分',
    score: '-50',
    date: '2020/06/06 10:00:10'
  },
  {
    operation: '完成工单',
    score: '+50',
    date: '2020/06/05 10:00:10'
  },
  {
    operation: '完成工单',
    score: '+50',
    date: '2020/06/04 10:00:10'
  },
  {
    operation: '完成工单',
    score: '+50',
    date: '2020/06/03 10:00:10'
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
export default function ScoreTabs(): JSX.Element {
  const [value, setValue] = React.useState(0);

  //获取积分信息
  const [scoreInformation, setScoreInformation] = useState([
    {
      operation: '',
      score: '',
      date: ''
    }
  ]);
  //初始化数据
  useEffect(() => {
    setScoreInformation(res);
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
          <Tab style={{ marginRight: '4rem' }} label="全部明细" />
          <Tab style={{ marginRight: '4rem' }} label="积分使用明细" />
          <Tab style={{ marginRight: '4rem' }} label="积分收入明细" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        {scoreInformation.map((item, key) => {
          return (
            <div
              key={key}
              className={commonStyles.totalProperty}
              style={{ paddingBottom: '1rem' }}
            >
              <div key={key + 1} className={commonStyles.expertProperty}>
                {item.operation}
                <span key={key + 2} className={commonStyles.orderTitle}>
                  {item.score}
                </span>
              </div>
              <div key={key + 3} className={commonStyles.integrateProperty}>
                {item.date}
              </div>
            </div>
          );
        })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        积分使用明细
      </TabPanel>
      <TabPanel value={value} index={2}>
        积分收入明细
      </TabPanel>
    </>
  );
}
