import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon } from '@material-ui/core';
import { DetailIcon, HotelIcon } from '@src/assets/svg/picture';
import { HotelType } from '@pages/people_detail/receive';

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
export default function CardEach(props: { detail: HotelType }): JSX.Element {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <HotelIcon />
              <span
                style={{
                  color: 'black',
                  fontSize: '16px',
                  marginTop: '-3px'
                }}
              >
                {props.detail.name}
              </span>
            </ListItemIcon>
          </ListItem>
        </List>
      </CardContent>
      <CardActions className={classes.float}>
        <Button size="small" color="primary" endIcon={<DetailIcon />}>
          查看详情&nbsp;
        </Button>
      </CardActions>
    </Card>
  );
}
