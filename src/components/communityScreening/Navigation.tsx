import React, { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useLocation } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import {
  StreetTaskOnIcon,
  StreetTaskOffIcon,
  CommunityTaskOnIcon,
  CommunityTaskOffIcon,
  TransferIcon,
  TransferActiceIcon,
  HotelManagementOff,
  HotelManagementOn
} from '@src/assets/svg/picture';
import { getURL } from '@src/utils';

interface LinkTabProps {
  label?: string;
  href?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
}
function LinkTab(props: LinkTabProps) {
  return <Tab style={{ width: '25%' }} component="a" {...props} />;
}
export default function Navigation(): JSX.Element {
  const location = useLocation(); //获取路由地址

  const [value, setValue] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (e: any, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    let name = 0;
    const judge = location.pathname.split('/')[2];
    switch (judge) {
      case 'community':
        name = 0;
        break;
      case 'street':
        name = 1;
        break;
      case 'hotel':
        name = 2;
        break;
      case 'transfer':
        name = 3;
        break;
    }
    setValue(name);
  }, [location]);

  const tabs = [
    {
      key: 0,
      href: '/community_screening/community',
      label: '社区',
      activeIcon: <CommunityTaskOnIcon />,
      icon: <CommunityTaskOffIcon />
    },
    {
      key: 1,
      href: '/community_screening/street',
      label: '街道',
      activeIcon: <StreetTaskOnIcon />,
      icon: <StreetTaskOffIcon />
    },
    {
      key: 2,
      href: '/community_screening/hotel',
      label: '酒店',
      activeIcon: <HotelManagementOn />,
      icon: <HotelManagementOff />
    },
    {
      key: 3,
      href: '/community_screening/transfer',
      label: '转运组',
      activeIcon: <TransferActiceIcon />,
      icon: <TransferIcon />
    }
  ];
  return (
    <Box
      className="tab"
      sx={{ borderBottom: 1, borderColor: 'divider', position: 'fixed' }}
    >
      <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
        {tabs.map(item => {
          return (
            <LinkTab
              icon={value === item.key ? item.activeIcon : item.icon}
              label={item.label}
              href={getURL(item.href)}
              key={item.key}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
