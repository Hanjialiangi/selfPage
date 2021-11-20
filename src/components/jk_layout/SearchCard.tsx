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
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Select from '@material-ui/core/Select';
import {
  NameIcon,
  PhoneIcon,
  IdCarIcon,
  SearchIcon,
  IsolationTypeIcon,
  ContactTypeIcon,
  HotelIcon
} from '@src/assets/svg/picture';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 0,
    borderRadius: 10
  }
});
export default function SearchCard(): JSX.Element {
  const classes = useStyles();
  const [contanct, setContanct] = useState(''); //接触类型
  const [isolation, SetIsolation] = useState(''); //隔离类型
  const [show, setShow] = useState(false); //搜索隐藏

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeContanct = (event: any) => {
    setContanct(event.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeIsolation = (event: any) => {
    SetIsolation(event.target.value);
  };
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <NameIcon />
            </ListItemIcon>
            <Input
              name="username"
              type="text"
              style={{ width: '100%' }}
              placeholder="请填写姓名"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <Input
              name="phone"
              type="number"
              style={{ width: '100%' }}
              placeholder="请填写您的手机号"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IdCarIcon />
            </ListItemIcon>
            <Input
              name="cardnumber"
              type="number"
              style={{ width: '100%' }}
              placeholder="请填写您的身份证号"
            />
          </ListItem>
          {show ? (
            <div>
              <ListItem>
                <ListItemIcon>
                  <ContactTypeIcon />
                </ListItemIcon>
                <Select
                  name="contact_type"
                  native
                  value={contanct}
                  onChange={handleChangeContanct}
                >
                  <option aria-label="None" value="">
                    接触类型
                  </option>
                  <option value="密切接触">密切接触</option>
                  <option value="非密切接触">非密切接触</option>
                  <option value="次密切接触">次密切接触</option>
                </Select>
                <ListItemIcon>
                  <IsolationTypeIcon />
                </ListItemIcon>
                <Select
                  name="isolation_type"
                  native
                  value={isolation}
                  onChange={handleChangeIsolation}
                >
                  <option aria-label="None" value="">
                    隔离类型
                  </option>
                  <option value="酒店">酒店</option>
                  <option value="社区">社区</option>
                </Select>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HotelIcon />
                </ListItemIcon>
                <Input
                  name="place"
                  type="text"
                  style={{ width: '100%' }}
                  placeholder="请填写您的酒店/社区名称"
                />
              </ListItem>
            </div>
          ) : null}
        </List>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {!show ? (
            <Button
              className="more"
              size="small"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleShow}
            >
              查看更多
            </Button>
          ) : (
            <Button
              className="more"
              size="small"
              endIcon={<KeyboardArrowUpIcon />}
              onClick={handleShow}
            >
              隐藏栏目
            </Button>
          )}
          <Button
            type="submit"
            size="small"
            color="primary"
            startIcon={<SearchIcon />}
          >
            搜索
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}
