import React, { PropsWithChildren, useState } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

type expert = {
  id: number;
  name: string;
};
type Props = PropsWithChildren<{
  expertList: expert[];
  setSelectExpert: React.Dispatch<React.SetStateAction<expert | null>>;
  setIsShowExpertList: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export default function ExpertList({
  expertList,
  setSelectExpert,
  setIsShowExpertList
}: Props): JSX.Element {
  /* 抽屉拦数据处理 */
  const handleSelect = (item: expert) => {
    setSelectExpert(item);
    setIsShowExpertList(false);
  };
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing(4)
    }
  }));
  const classes = useStyles();
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        ></ListSubheader>
      }
      className={classes.root}
    >
      {expertList.map(function (item: expert) {
        return (
          <>
            <ListItem
              key={item.id}
              button
              onClick={() => {
                handleSelect(item);
              }}
            >
              <ListItemText key={item.id} primary={item.name} />
            </ListItem>
          </>
        );
      })}
    </List>
  );
}
