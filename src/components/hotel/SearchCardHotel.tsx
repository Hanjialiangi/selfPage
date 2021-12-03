import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import {
  HotelIcon,
  IsolationTypeIcon,
  SearchIcon
} from '@src/assets/svg/picture';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 0,
    borderRadius: 10,
    margin: '0 10px 0 10px'
  }
});
export default function SearchCard(): JSX.Element {
  const classes = useStyles();
  const [name, setName] = useState(''); //酒店名字
  const [state, setState] = useState(''); //状态
  const [capacity, setCapacity] = useState(''); //容量

  const handleChangeCapacity = (e: any) => {
    setCapacity(e.target.value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          <ListItem className="style">
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <Input
              name="hotel_name"
              type="text"
              value={name}
              className="name"
              style={{ width: '100%' }}
              placeholder="搜索酒店名称"
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </ListItem>
          <ListItem
            className="style"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <ListItemIcon>
              <IsolationTypeIcon />
            </ListItemIcon>
            <Select
              className="state"
              name="state"
              native
              value={state}
              onChange={(e: any) => {
                setState(e.target.value);
              }}
            >
              <option aria-label="None" value="">
                状态
              </option>
              <option value="启用">启用</option>
              <option value="停用">停用</option>
            </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <ListItemIcon>
              <IsolationTypeIcon />
            </ListItemIcon>
            <Select
              className="capacity"
              name="capacity"
              native
              value={capacity}
              onChange={handleChangeCapacity}
            >
              <option aria-label="None" value="">
                容量
              </option>
              <option value="1">有</option>
              <option value="0">无</option>
            </Select>
          </ListItem>
        </List>
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          size="small"
          color="primary"
          startIcon={<SearchIcon />}
        >
          搜索
        </Button>
      </CardActions>
    </Card>
  );
}
