import React, { PropsWithChildren } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

type list = {
  id: number;
  name: string;
};
type Props = PropsWithChildren<{
  expertList: list[];
  setSelectExpert: React.Dispatch<React.SetStateAction<list | null>>;
  setIsShowExpertList: React.Dispatch<React.SetStateAction<boolean>>;
}>;

export default function PlaceList({
  expertList,
  setSelectExpert,
  setIsShowExpertList
}: Props): JSX.Element {
  /* 抽屉拦数据处理 */
  const handleSelect = (item: list) => {
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
      {expertList.map(function (item: list) {
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
