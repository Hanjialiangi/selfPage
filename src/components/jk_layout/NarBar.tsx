import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import { Role } from '@src/constants';
import {
  IsolationIcon,
  IsolationActiveIcon,
  TransferIcon,
  TransferActiceIcon,
  ArriveIcon,
  ArriveActiveIcon,
  TestIcon,
  TestActiveIcon
} from '@src/assets/svg/picture';

interface LinkTabProps {
  label?: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}
function LinkTab(props: LinkTabProps) {
  return <Tab component="a" {...props} />;
}
export default function NarBar(): JSX.Element {
  const [value, setValue] = React.useState(0);
  const userInfo = useSelector(userInfoSelector);

  const location = useLocation(); //获取地址栏参数

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  React.useEffect(() => {
    const initval = location.pathname.split('/')[2];
    const judge = location.pathname.split('/')[1];
    let name = 0;
    if (judge === 'detail' || judge === 'error') {
      name = 100;
    } else if (judge === 'admin_jk' || judge === 'transfer') {
      if (initval === 'resident_list') {
        name = 0;
      } else if (initval === 'transfer_list') {
        name = 1;
      } else if (initval === 'arrive_list') {
        name = 2;
      } else if (initval === 'test_list') {
        name = 3;
      } else {
        name = 999;
      }
    } else {
      if (initval === 'resident_list') {
        name = 0;
      } else if (initval === 'arrive_list') {
        name = 1;
      } else if (initval === 'test_list') {
        name = 2;
      } else {
        name = 999;
      }
    }
    setValue(name);
  }, [location]);

  return (
    <Box sx={{ width: '100%' }}>
      {value !== 100 ? (
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider', position: 'fixed' }}
        >
          {userInfo.role === Role.ADMIN ? (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="被隔离人员"
                href="/dist/admin_jk/resident_list"
              />
              <LinkTab
                icon={value !== 1 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运人员"
                href="/dist/admin_jk/transfer_list"
              />
              <LinkTab
                icon={value !== 2 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收人员"
                href="/dist/admin_jk/arrive_list"
              />
              <LinkTab
                icon={value !== 3 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href="/dist/admin_jk/test_list"
              />
            </Tabs>
          ) : userInfo.role === Role.TRANSFER ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="被隔离人员"
                href="/dist/transfer/resident_list"
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运人员"
                href="/dist/transfer/transfer_list"
              ></LinkTab>
            </Tabs>
          ) : userInfo.role === Role.HOTELDOCTOR ||
            userInfo.role === Role.COMMUNITY ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="被隔离人员"
                href={
                  userInfo.role === Role.HOTELDOCTOR
                    ? '/dist/hotel_doctor/resident_list'
                    : '/dist/community/resident_list'
                }
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收人员"
                href={
                  userInfo.role === Role.HOTELDOCTOR
                    ? '/dist/hotel_doctor/arrive_list'
                    : '/dist/community/arrive_list'
                }
              />
              <LinkTab
                icon={value !== 2 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={
                  userInfo.role === Role.HOTELDOCTOR
                    ? '/dist/hotel_doctor/test_list'
                    : '/dist/community/test_list'
                }
              />
            </Tabs>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
