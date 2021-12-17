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
  EndManageActiveIcon,
  HotelManagementOn,
  HotelManagementOff,
  StreetTaskOnIcon,
  StreetTaskOffIcon,
  CommunityTaskOnIcon,
  CommunityTaskOffIcon
} from '@src/assets/svg/picture';
import { getURL } from '@src/utils';

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
    } else if (judge === 'admin_jk') {
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
      } else if (initval === 'hotel_list') {
        name = 5;
      } else if (initval === 'street_task_list') {
        name = 6;
      } else if (initval === 'health_service_task_list') {
        name = 7;
      } else {
        name = 999;
      }
    } else if (judge === 'transfer') {
      if (initval === 'transfer_list') {
        name = 0;
      } else if (initval === 'resident_list') {
        name = 1;
      } else if (initval === 'street_task_list') {
        name = 2;
      } else if (initval === 'health_service_task_list') {
        userInfo.role.includes('sub_district') ? (name = 3) : (name = 2);
      } else if (initval === 'hotel_list') {
        userInfo.role.includes('sub_district') &&
        userInfo.role.includes('communuty_healthcare_center')
          ? (name = 4)
          : userInfo.role.includes('sub_district') ||
            userInfo.role.includes('community_healthcare_center')
          ? (name = 3)
          : (name = 2);
      } else {
        name = 999;
      }
    } else if (judge === 'synthesis') {
      if (initval === 'transfer_list') {
        name = 0;
      } else if (initval === 'arrive_list') {
        name = 1;
      } else if (initval === 'resident_list') {
        name = 2;
      } else if (initval === 'test_list') {
        name = 3;
      } else if (initval === 'end_manage_list') {
        name = 4;
      } else if (initval === 'hotel_list') {
        userInfo.role.includes('hotel_medical_team') ? (name = 5) : (name = 4); //酒店管理组/集中
      } else if (initval === 'street_task_list') {
        userInfo.role.includes('hotel_medical_team')
          ? (name = 6)
          : userInfo.role.includes('focus_quarantine_group')
          ? (name = 5)
          : (name = 4);
      } else if (initval === 'health_service_task_list') {
        //社区卫生服务中心
        userInfo.role.includes('hotel_medical_team') &&
        userInfo.role.includes('sub_district')
          ? (name = 7)
          : !userInfo.role.includes('hotel_medical_team') &&
            userInfo.role.includes('focus_quarantine_group') &&
            userInfo.role.includes('sub_district')
          ? (name = 6)
          : userInfo.role.includes('hotel_medical_team') &&
            !userInfo.role.includes('sub_district')
          ? (name = 5)
          : userInfo.role.includes('focus_quarantine_group') &&
            !userInfo.role.includes('sub_district')
          ? (name = 5)
          : (name = 4);
      } else {
        name = 999;
      }
    } else if (judge === 'focus_quarantine_group') {
      if (initval === 'resident_list') {
        name = 0;
      } else if (initval === 'hotel_list') {
        name = 1;
      } else if (initval === 'street_task_list') {
        name = 2;
      } else if (initval === 'health_service_task_list') {
        userInfo.role.includes('sub_district') ? (name = 3) : (name = 2);
      }
    } else if (judge === 'community_healthcare_center') {
      if (initval === 'resident_list') {
        name = 0;
      } else if (initval === 'test_list') {
        name = 1;
      } else if (initval === 'street_task_list') {
        name = 2;
      } else if (initval === 'health_service_task_list') {
        userInfo.role.includes('sub_district') ? (name = 3) : (name = 2);
      }
    } else if (judge === 'sub_district') {
      if (initval === 'resident_list') {
        name = 0;
      } else if (initval === 'test_list') {
        name = 1;
      } else if (initval === 'street_task_list') {
        name = 2;
      }
    } else {
      if (initval === 'resident_list') {
        name = 1;
      } else if (initval === 'arrive_list') {
        name = 0;
      } else if (initval === 'test_list') {
        name = 2;
      } else if (initval === 'end_manage_list') {
        name = 3;
      } else if (initval === 'hotel_list') {
        name = 4;
      } else if (initval === 'street_task_list') {
        userInfo.role.includes('hotel_medical_team') ? (name = 5) : (name = 4);
      } else if (initval === 'health_service_task_list') {
        userInfo.role.includes('sub_district') &&
        userInfo.role.includes('hotel_medical_team')
          ? (name = 6)
          : !userInfo.role.includes('sub_district') &&
            !userInfo.role.includes('hotel_medical_team')
          ? (name = 4)
          : (name = 5);
      } else {
        name = 999;
      }
    }
    setValue(name);
  }, [location, userInfo]);

  return (
    <Box sx={{}}>
      {value !== 100 ? (
        <Box
          className="tab"
          sx={{ borderBottom: 1, borderColor: 'divider', position: 'fixed' }}
        >
          {userInfo.role.includes('wh_cdc') ||
          userInfo.role.includes('close_contact_team') ? (
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运"
                href={getURL('/admin_jk/transfer_list')}
              />
              <LinkTab
                icon={value !== 1 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收"
                href={getURL('/admin_jk/arrive_list')}
              />
              <LinkTab
                icon={value !== 2 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={getURL('/admin_jk/resident_list')}
              />
              <LinkTab
                icon={value !== 3 ? <EndManageIcon /> : <EndManageActiveIcon />}
                label="结束管理"
                href={getURL('/admin_jk/end_manage_list')}
              />
              <LinkTab
                icon={value !== 4 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={getURL('/admin_jk/test_list')}
              />
              <LinkTab
                icon={
                  value !== 5 ? <HotelManagementOff /> : <HotelManagementOn />
                }
                label="酒店管理"
                href={getURL('/admin_jk/hotel_list')}
              />
              <LinkTab
                icon={
                  value !== 6 ? <StreetTaskOffIcon /> : <StreetTaskOnIcon />
                }
                label="街道任务"
                href={getURL('/admin_jk/street_task_list')}
              />
              <LinkTab
                icon={
                  value !== 7 ? (
                    <CommunityTaskOffIcon />
                  ) : (
                    <CommunityTaskOnIcon />
                  )
                }
                label="任务列表"
                href={getURL('/admin_jk/health_service_task_list')}
              />
            </Tabs>
          ) : userInfo.role.includes('transfer_team') &&
            !userInfo.role.includes('hotel_medical_team') &&
            !userInfo.role.includes('community') ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运"
                href={getURL('/transfer/transfer_list')}
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={getURL('/transfer/resident_list')}
              ></LinkTab>
              {userInfo.role.includes('sub_district') && (
                <LinkTab
                  icon={
                    value !== 2 ? <StreetTaskOffIcon /> : <StreetTaskOnIcon />
                  }
                  label="街道任务"
                  href={getURL('/transfer/street_task_list')}
                ></LinkTab>
              )}
              {userInfo.role.includes('community_healthcare_center') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('sub_district') ? 3 : 2) ? (
                      <CommunityTaskOffIcon />
                    ) : (
                      <CommunityTaskOnIcon />
                    )
                  }
                  label="任务列表"
                  href={getURL('/transfer/health_service_task_list')}
                ></LinkTab>
              )}
              {userInfo.role.includes('focus_quarantine_group') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('sub_district') &&
                    userInfo.role.includes('communuty_healthcare_center')
                      ? 4
                      : userInfo.role.includes('sub_district') ||
                        userInfo.role.includes('community_healthcare_center')
                      ? 3
                      : 2) ? (
                      <HotelManagementOff />
                    ) : (
                      <HotelManagementOn />
                    )
                  }
                  label="酒店管理"
                  href={getURL('/transfer/hotel_list')}
                />
              )}
            </Tabs>
          ) : userInfo.role.includes('transfer_team') &&
            (userInfo.role.includes('hotel_medical_team') ||
              userInfo.role.includes('community')) ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <TransferIcon /> : <TransferActiceIcon />}
                label="待转运"
                href={getURL('/synthesis/transfer_list')}
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收"
                href={getURL('/synthesis/arrive_list')}
              />
              <LinkTab
                icon={value !== 2 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={getURL('/synthesis/resident_list')}
              ></LinkTab>
              <LinkTab
                icon={value !== 3 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={getURL('/synthesis/test_list')}
              />
              {userInfo.role.includes('hotel_medical_team') && (
                <LinkTab
                  icon={
                    value !== 4 ? <EndManageIcon /> : <EndManageActiveIcon />
                  }
                  label="结束管理"
                  href={getURL('/synthesis/end_manage_list')}
                />
              )}
              {userInfo.role.includes('hotel_medical_team') ||
              userInfo.role.includes('focus_quarantine_group') ? (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('hotel_medical_team')
                      ? 5
                      : userInfo.role.includes('focus_quarantine_group')
                      ? 4
                      : 4) ? (
                      <HotelManagementOff />
                    ) : (
                      <HotelManagementOn />
                    )
                  }
                  label="酒店管理"
                  href={getURL('/synthesis/hotel_list')}
                />
              ) : null}
              {userInfo.role.includes('sub_district') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('hotel_medical_team')
                      ? 6
                      : userInfo.role.includes('focus_quarantine_group')
                      ? 5
                      : 4) ? (
                      <StreetTaskOffIcon />
                    ) : (
                      <StreetTaskOnIcon />
                    )
                  }
                  label="街道任务"
                  href={getURL('/synthesis/street_task_list')}
                ></LinkTab>
              )}
              {userInfo.role.includes('community_healthcare_center') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('hotel_medical_team') &&
                    userInfo.role.includes('sub_district')
                      ? 7
                      : !userInfo.role.includes('hotel_medical_team') &&
                        !userInfo.role.includes('focus_quarantine_group') &&
                        userInfo.role.includes('sub_district')
                      ? 4
                      : userInfo.role.includes('hotel_medical_team') &&
                        !userInfo.role.includes('sub_district')
                      ? 6
                      : userInfo.role.includes('focus_quarantine_group') &&
                        userInfo.role.includes('sub_district')
                      ? 6
                      : userInfo.role.includes('focus_quarantine_group') &&
                        !userInfo.role.includes('sub_district')
                      ? 5
                      : 4) ? (
                      <CommunityTaskOffIcon />
                    ) : (
                      <CommunityTaskOnIcon />
                    )
                  }
                  label="任务列表"
                  href={getURL('/synthesis/health_service_task_list')}
                ></LinkTab>
              )}
            </Tabs>
          ) : userInfo.role.includes('hotel_medical_team') ||
            userInfo.role.includes('community') ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <ArriveIcon /> : <ArriveActiveIcon />}
                label="待接收"
                href={
                  userInfo.role.includes('hotel_medical_team')
                    ? getURL('/hotel_doctor/arrive_list')
                    : getURL('/community/arrive_list')
                }
              />
              <LinkTab
                icon={value !== 1 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={
                  userInfo.role.includes('hotel_medical_team')
                    ? getURL('/hotel_doctor/resident_list')
                    : getURL('/community/resident_list')
                }
              ></LinkTab>
              <LinkTab
                icon={value !== 2 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={
                  userInfo.role.includes('hotel_medical_team')
                    ? getURL('/hotel_doctor/test_list')
                    : getURL('/community/test_list')
                }
              />
              {userInfo.role.includes('hotel_medical_team') ? (
                <LinkTab
                  icon={
                    value !== 3 ? <EndManageIcon /> : <EndManageActiveIcon />
                  }
                  label="结束管理"
                  href={getURL('/hotel_doctor/end_manage_list')}
                />
              ) : null}
              {userInfo.role.includes('hotel_medical_team') ? (
                <LinkTab
                  icon={
                    value !== 4 ? <HotelManagementOff /> : <HotelManagementOn />
                  }
                  label="酒店管理"
                  href={getURL('/hotel_doctor/hotel_list')}
                />
              ) : null}
              {userInfo.role.includes('sub_district') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('hotel_medical_team') ? 5 : 4) ? (
                      <StreetTaskOffIcon />
                    ) : (
                      <StreetTaskOnIcon />
                    )
                  }
                  label="街道任务"
                  href={
                    userInfo.role.includes('hotel_medical_team')
                      ? getURL('/hotel_doctor/street_task_list')
                      : getURL('/community/street_task_list')
                  }
                />
              )}
              {userInfo.role.includes('community_healthcare_center') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('hotel_medical_team') &&
                    userInfo.role.includes('sub_district')
                      ? 6
                      : !userInfo.role.includes('hotel_medical_team') &&
                        !userInfo.role.includes('sub_district')
                      ? 4
                      : 5) ? (
                      <CommunityTaskOffIcon />
                    ) : (
                      <CommunityTaskOnIcon />
                    )
                  }
                  label="任务列表"
                  href={
                    userInfo.role.includes('hotel_medical_team')
                      ? getURL('/hotel_doctor/health_service_task_list')
                      : getURL('/community/health_service_task_list')
                  }
                />
              )}
            </Tabs>
          ) : userInfo.role.includes('focus_quarantine_group') ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={getURL('/focus_quarantine_group/resident_list')}
              ></LinkTab>
              <LinkTab
                icon={
                  value !== 1 ? <HotelManagementOff /> : <HotelManagementOn />
                }
                label="酒店管理"
                href={getURL('/focus_quarantine_group/hotel_list')}
              />
              {userInfo.role.includes('sub_district') && (
                <LinkTab
                  icon={
                    value !== 2 ? <StreetTaskOffIcon /> : <StreetTaskOnIcon />
                  }
                  label="街道任务"
                  href={getURL('/focus_quarantine_group/street_task_list')}
                />
              )}
              {userInfo.role.includes('community_healthcare_center') && (
                <LinkTab
                  icon={
                    value !==
                    (userInfo.role.includes('sub_district') ? 3 : 2) ? (
                      <CommunityTaskOffIcon />
                    ) : (
                      <CommunityTaskOnIcon />
                    )
                  }
                  label="任务列表"
                  href={getURL(
                    '/focus_quarantine_group/health_service_task_list'
                  )}
                />
              )}
            </Tabs>
          ) : userInfo.role.includes('community_healthcare_center') ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={getURL('/community_healthcare_center/resident_list')}
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={getURL('/community_healthcare_center/test_list')}
              />
              {userInfo.role.includes('sub_district') && (
                <LinkTab
                  icon={
                    value !== 2 ? <StreetTaskOffIcon /> : <StreetTaskOnIcon />
                  }
                  label="街道任务"
                  href={getURL('/community_healthcare_center/street_task_list')}
                />
              )}
              <LinkTab
                icon={
                  value !== (userInfo.role.includes('sub_district') ? 3 : 2) ? (
                    <CommunityTaskOffIcon />
                  ) : (
                    <CommunityTaskOnIcon />
                  )
                }
                label="任务列表"
                href={getURL(
                  '/community_healthcare_center/health_service_task_list'
                )}
              />
            </Tabs>
          ) : userInfo.role.includes('sub_district') ? (
            <Tabs
              style={{ width: '100%' }}
              value={value}
              onChange={handleChange}
              aria-label="nav tabs example"
            >
              <LinkTab
                icon={value !== 0 ? <IsolationIcon /> : <IsolationActiveIcon />}
                label="管理中"
                href={getURL('/sub_district/resident_list')}
              ></LinkTab>
              <LinkTab
                icon={value !== 1 ? <TestIcon /> : <TestActiveIcon />}
                label="本日采样"
                href={getURL('/sub_district/test_list')}
              />
              <LinkTab
                icon={
                  value !== 2 ? <StreetTaskOffIcon /> : <StreetTaskOnIcon />
                }
                label="街道任务"
                href={getURL('/sub_district/street_task_list')}
              />
            </Tabs>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
