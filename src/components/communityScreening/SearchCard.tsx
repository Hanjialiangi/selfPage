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
  NameIcon,
  PhoneIcon,
  IdCarIcon,
  SearchIcon,
  ContactTypeIcon
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
  const [source, setSource] = useState(''); //来源

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeSource = (event: any) => {
    setSource(event.target.value);
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
          <ListItem className="style" style={{ width: '100%' }}>
            <ListItemIcon>
              <ContactTypeIcon />
            </ListItemIcon>
            <Select
              style={{ width: '100%' }}
              className="source"
              name="source"
              native
              value={source}
              onChange={handleChangeSource}
            >
              <option aria-label="None" value="">
                来源属性
              </option>
              <option value="密接/次密接">密接/次密接</option>
              <option value="次密接">境外人员</option>
              <option value="中高风险">中高风险</option>
            </Select>
          </ListItem>
        </List>
      </CardContent>
      <CardActions>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >
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
