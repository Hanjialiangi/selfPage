import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import {
  IsolationIcon,
  IsolationActiveIcon,
  TransferIcon,
  TransferActiceIcon,
  ArriveIcon,
  ArriveActiveIcon,
  TestIcon,
  TestActiveIcon,
  EndManageIcon,
  EndManageActiveIcon
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
      if (initval === 'transfer_list') {
        name = 0;
      } else if (initval === 'arrive_list') {
        name = 1;
      } else if (initval === 'resident_list') {
        name = 2;
      } else if (initval === 'end_manage_list') {
        name = 3;
      } else if (initval === 'test_list') {
        name = 4;
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
    <Box sx={{}}>
      {value !== 100 ? (
        <Box
          className="tab"
          sx={{ borderBottom: 1, borderColor: 'divider', position: 'fixed' }}
        >
          {userInfo.role === 'wh_cdc' ? (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运"
                href="/admin_jk/transfer_list"
              />
              <LinkTab
                icon={value !== 1 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收"
                href="/admin_jk/arrive_list"
              />
              <LinkTab
                icon={value !== 2 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href="/admin_jk/resident_list"
              />
              <LinkTab
                icon={value !== 3 ? <EndManageIcon /> : <EndManageActiveIcon />}
                label="结束管理"
                href="/admin_jk/end_manage_list"
              />
              <LinkTab
                icon={value !== 4 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href="/admin_jk/test_list"
              />
            </Tabs>
          ) : userInfo.role === 'transfer_team' ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="被隔离"
                href="/transfer/resident_list"
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运"
                href="/transfer/transfer_list"
              ></LinkTab>
            </Tabs>
          ) : userInfo.role === 'hotel_medical_team' ||
            userInfo.role === 'community' ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="被隔离"
                href={
                  userInfo.role === 'hotel_medical_team'
                    ? '/hotel_doctor/resident_list'
                    : '/community/resident_list'
                }
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收"
                href={
                  userInfo.role === 'hotel_medical_team'
                    ? '/hotel_doctor/arrive_list'
                    : '/community/arrive_list'
                }
              />
              <LinkTab
                icon={value !== 2 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={
                  userInfo.role === 'hotel_medical_team'
                    ? '/hotel_doctor/test_list'
                    : '/community/test_list'
                }
              />
            </Tabs>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
