import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import ListIcon from '@material-ui/icons/List';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';

const useStyles = makeStyles({
  root: {
    width: 375
  }
});

export function BottomBar(props: { value: string }): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    newValue: string
  ) => {
    console.log(event);
    setValue(newValue);
    window.location.href = `/dist/admin_jk/${newValue}`;
  };

  return (
    <div style={{ position: 'fixed', bottom: '0' }}>
      <BottomNavigation
        value={value}
        showLabels
        onChange={handleChange}
        className={classes.root}
      >
        <BottomNavigationAction
          label="被隔离人员名单"
          value="resident_list"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="待转运人员名单"
          value="transfer_list"
          icon={<TransferWithinAStationIcon />}
        />
        <BottomNavigationAction
          label="待接收人员名单"
          value="arrive_list"
          icon={<AirplanemodeActiveIcon />}
        />
        <BottomNavigationAction
          label="本日采样名单"
          value="test_list"
          icon={<ListIcon />}
        />
        <BottomNavigationAction
          label="人员详情"
          value="resident"
          icon={<PeopleIcon />}
        />
      </BottomNavigation>
    </div>
  );
}
