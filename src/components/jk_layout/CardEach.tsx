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
    color: 'red',
    textAlign: 'right'
  },
  greentext: {
    color: 'green',
    textAlign: 'right'
  },
  orangetext: {
    color: 'orange',
    textAlign: 'right'
  },
  right: {
    textAlign: 'right'
  },
  float: {
    float: 'right',
    fontSize: '14px'
  }
});
export default function CardEach(props: {
  detail: {
    id: number;
    name: string;
    contact_type: string;
    isolation_type: string;
    place: string;
  };
}): JSX.Element {
  const classes = useStyles();

  const handleDetail = (id: number) => {
    console.log(id);
    window.location.href = `/dist/detail/resident/${id}`;
  };
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
            {props.detail.contact_type === '密切接触' ? (
              <ListItemText
                className={classes.redtext}
                primary={props.detail.contact_type}
              />
            ) : props.detail.contact_type === '次密切接触' ? (
              <ListItemText
                className={classes.orangetext}
                primary={props.detail.contact_type}
              />
            ) : (
              <ListItemText
                className={classes.greentext}
                primary={props.detail.contact_type}
              />
            )}
          </ListItem>
          <ListItem>
            <ListItemText
              secondary={`隔离类型 ${props.detail.isolation_type}`}
            />
            <ListItemText
              className={classes.right}
              primary={props.detail.place}
            />
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.float}>
        <Button
          size="small"
          color="primary"
          endIcon={<DetailIcon />}
          onClick={() => handleDetail(props.detail.id)}
        >
          查看详情
        </Button>
      </CardActions>
    </Card>
  );
}
