import React, { PropsWithChildren, useState } from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { Category, getOrderTags } from '@src/api';
type SelectedCategory = {
  label: string;
  fullPathName: string;
  fullPath: string;
  value: number;
};
export type Tags = {
  value: number;
  label: string;
  is_auto: number;
  type_name: string;
  type_ids: string;
  children?: Tags[];
};
type Props = PropsWithChildren<{
  categoryOptions: Category[];
  category: SelectedCategory | null;
  setCategory: React.Dispatch<React.SetStateAction<SelectedCategory | null>>;
  setIsShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectTags?: React.Dispatch<React.SetStateAction<never[]>>;
  setTags?: React.Dispatch<React.SetStateAction<Tags[]>>;
  isChildren: boolean;
}>;

export default function TypeList({
  categoryOptions,
  category,
  setCategory,
  isChildren,
  setSelectTags,
  setTags,
  setIsShowDrawer
}: Props): JSX.Element {
  const handleTags = async (condition: { type_id: number | string }) => {
    const resoult = await getOrderTags(condition);
    if (resoult.code == 200 && setSelectTags && setTags) {
      setSelectTags([]);
      // setSelectTags(undefined);
      setTags(resoult.data);
    }
  };
  /* 抽屉拦数据处理 */
  const [open, setOpen] = React.useState(true);
  const [selectOption, setSelectOption] = React.useState(0);
  const handleSelect = (item: Category, isClose: boolean, key?: number) => {
    handleTags({ type_id: item.value });
    setCategory({
      label: item.label,
      fullPathName:
        category?.fullPathName == undefined || !isChildren
          ? item.label
          : category?.fullPathName + '/' + item.label,
      fullPath:
        category?.fullPath == undefined || !isChildren
          ? item.value.toString()
          : category?.fullPath + ',' + item.value,
      value: item.value
    });
    isClose ? setIsShowDrawer(false) : null;
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
      {categoryOptions.map(function (item: Category, key: number) {
        return (
          <>
            <ListItem
              key={item.value}
              button
              onClick={() => {
                item.children
                  ? handleSelect(item, false, key)
                  : handleSelect(item, true);
                selectOption == item.value ? setOpen(!open) : setOpen(true);
                setSelectOption(item.value);
              }}
            >
              <ListItemText primary={item.label} />
              {item.children ? (
                selectOption == item.value && open ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItem>
            {item && item.children ? (
              <Collapse
                in={selectOption == item.value && open ? true : false}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  <TypeList
                    category={category}
                    categoryOptions={item.children}
                    setCategory={setCategory}
                    setIsShowDrawer={setIsShowDrawer}
                    setSelectTags={setSelectTags}
                    setTags={setTags}
                    isChildren={true}
                  />
                </List>
              </Collapse>
            ) : null}
          </>
        );
      })}
    </List>
  );
}
