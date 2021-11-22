import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { DetailIcon, NameIcon } from '@src/assets/svg/picture';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  redtext: {
    color: '#D0021B',
    fontSize: '15px',
    textAlign: 'right'
  },
  greentext: {
    color: '#259B23',
    textAlign: 'right'
  },
  orangetext: {
    color: '#FF770B',
    textAlign: 'right'
  },
  right: {
    color: '#666666',
    textAlign: 'right'
  },
  float: {
    float: 'right',
    fontSize: '14px'
  }
});
export default function CardEach(props: {
  detail: {
    open_id: string;
    name: string;
    resident_property: string;
    quarantine_type: string;
    quarantine_hotel: string;
    sub_district: string;
  };
}): JSX.Element {
  const classes = useStyles();

  // const handleDetail = (id: number) => {
  //   console.log(id);
  //   window.location.href = `/dist/detail/resident/${id}`;
  // };
  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <NameIcon />
              <span
                style={{
                  color: 'black',
                  fontSize: '16px',
                  marginLeft: '5px',
                  marginTop: '-3px'
                }}
              >
                {props.detail.name}
              </span>
            </ListItemIcon>
            {props.detail.resident_property === '密接' ? (
              <ListItemText
                className={classes.redtext}
                primary={props.detail.resident_property}
              />
            ) : props.detail.resident_property === '次密接' ? (
              <ListItemText
                className={classes.orangetext}
                primary={props.detail.resident_property}
              />
            ) : (
              <ListItemText
                className={classes.greentext}
                primary={props.detail.resident_property}
              />
            )}
          </ListItem>
          <ListItem>
            {props.detail.quarantine_type ? (
              <ListItemText
                secondary={`隔离类型 ${props.detail.quarantine_type}`}
              />
            ) : null}
            {props.detail.quarantine_hotel ? (
              <ListItemText
                className={classes.right}
                primary={props.detail.quarantine_hotel}
              />
            ) : (
              <ListItemText
                className={classes.right}
                primary={props.detail.sub_district}
              />
            )}
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.float}>
        <Button size="small" color="primary" endIcon={<DetailIcon />}>
          查看详情
        </Button>
      </CardActions>
    </Card>
  );
}
