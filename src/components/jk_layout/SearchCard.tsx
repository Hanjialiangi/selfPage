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
  HotelIcon,
  CommunityIcon
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
  const [name, setName] = useState(''); //名字
  const [contact, setContact] = useState(''); //手机号
  const [idCard, setIdCard] = useState(''); //身份证号

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
          <ListItem className="style">
            <ListItemIcon>
              <NameIcon />
            </ListItemIcon>
            <Input
              name="name"
              type="text"
              value={name}
              className="name"
              style={{ width: '100%' }}
              placeholder="搜索姓名"
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </ListItem>
          <ListItem className="style">
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <Input
              className="contact"
              value={contact}
              name="contact"
              type="number"
              style={{ width: '100%' }}
              placeholder="搜索手机号"
              onChange={e => {
                setContact(e.target.value);
              }}
            />
          </ListItem>
          <ListItem className="style">
            <ListItemIcon>
              <IdCarIcon />
            </ListItemIcon>
            <Input
              className="id_card"
              name="id_card"
              type="text"
              value={idCard}
              style={{ width: '100%' }}
              placeholder="搜索完整身份证号"
              onChange={e => {
                setIdCard(e.target.value);
              }}
            />
          </ListItem>
          {show ? (
            <div>
              <ListItem className="style">
                <ListItemIcon>
                  <ContactTypeIcon />
                </ListItemIcon>
                <Select
                  className="resident_property"
                  name="resident_property"
                  native
                  value={contanct}
                  onChange={handleChangeContanct}
                >
                  <option aria-label="None" value="">
                    人员属性
                  </option>
                  <option value="密接">密接</option>
                  <option value="次密接">次密接</option>
                  <option value="一般接触者">一般接触者</option>
                  <option value="重点人员">重点人员</option>
                </Select>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <ListItemIcon>
                  <IsolationTypeIcon />
                </ListItemIcon>
                <Select
                  className="quarantine_type"
                  name="quarantine_type"
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
              {isolation ? (
                isolation === '酒店' ? (
                  <ListItem className="style">
                    <ListItemIcon>
                      <HotelIcon />
                    </ListItemIcon>
                    <Input
                      className="quarantine_hotel"
                      name="quarantine_hotel"
                      type="text"
                      style={{ width: '100%' }}
                      placeholder="搜索酒店名称"
                    />
                  </ListItem>
                ) : (
                  <ListItem className="style">
                    <ListItemIcon>
                      <CommunityIcon />
                    </ListItemIcon>
                    <Input
                      className="home_address"
                      name="home_address"
                      type="text"
                      style={{ width: '100%' }}
                      placeholder="搜索社区名称"
                    />
                  </ListItem>
                )
              ) : null}
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
              style={{ marginLeft: '35%' }}
              className="more"
              size="small"
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handleShow}
            >
              查看更多
            </Button>
          ) : (
            <Button
              style={{ marginLeft: '35%' }}
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
