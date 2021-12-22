import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import { NameIcon } from '@src/assets/svg/picture';

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
export default function TestCard(props: {
  detail: {
    name: string;
    contact: string;
    planned_date: string;
    sampling_date: string;
    sampling_result: string;
  };
}): JSX.Element {
  const classes = useStyles();
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
            {props.detail.sampling_result === '阳性' ? (
              <ListItemText
                className={classes.redtext}
                primary={props.detail.sampling_result}
              />
            ) : (
              <ListItemText
                className={classes.greentext}
                primary={props.detail.sampling_result}
              />
            )}
          </ListItem>
          <ListItem>
            {props.detail.contact ? (
              <p style={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.54)' }}>
                联系电话:&nbsp;
                <a href={`tel:${props.detail.contact}`}>
                  {props.detail.contact}
                </a>
              </p>
            ) : null}
          </ListItem>
          <ListItem>
            {props.detail.planned_date ? (
              <ListItemText
                secondary={`计划采样时间：${props.detail.planned_date}`}
              />
            ) : null}
          </ListItem>
          <ListItem>
            {props.detail.sampling_date ? (
              <ListItemText
                primary={`实际采样时间: ${props.detail.sampling_date}`}
              />
            ) : null}
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
