import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Drawer } from '@material-ui/core';
import TypeList from '@components/TypeList';
import HotelList from '@components/HotelList';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import commonStyle from '@styleModules/common.module.scss';

import {
  Category,
  getCategory,
  getTransferHotel,
  getTransferCommunity
} from '@src/api';
import {
  dingAlert,
  dingToast,
  dingOpenLink,
  getPlatform
} from '@src/dingtalkAPI';
type SelectedCategory = {
  label: string;
  fullPathName: string;
  fullPath: string;
  value: number;
};
type expert = {
  id: number;
  name: string;
};
export default function ExpertTransferOrder(): JSX.Element {
  /* 从URL参数中读取工单ID */

  /* 错误提示 */
  const [infoError, setInfoError] = useState('');

  /* 工单分类选择的错误提示 */
  const [expertList, setExpertList] = useState([]);
  const [selectExpert, setSelectExpert] = useState<expert | null>(null);

  /* 是否正在处理数据 */
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  /* 显示人员列表 */
  const [isShowExpertList, setIsShowExpertList] = useState(false);

  /* 工单分类 */
  const [category, setCategory] = useState<SelectedCategory | null>(null);

  /* 工单分类选项 */
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

  const [option, setOption] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  /* 加载页面数据 */
  async function getData(
    setCategoryOptions: React.Dispatch<React.SetStateAction<Category[]>>
  ) {
    /* 获取工单类别选项 */
    const categoryRes = await getCategory();
    if (categoryRes.code === 200) {
      setCategoryOptions(categoryRes.data);
    }
    /* 获取酒店列表 */
    const hotelList = await searchExpert({});
    if (hotelList.code === 200) {
      setExpertList(hotelList.data);
    }
  }
  /* 提交工单 */
  const handleReminder = async () => {
    //判断接收名单
    // if (choseCommunity !== 0) {
    // const res = await getTransferCommunity();
    // if (res.code == 200) {
    //   dingAlert('提交成功，请稍后再试。', '错误', '确认');
    //   return;
    // }
    // dingToast('提交成功', 'success');
    // }
    const res = await getTransferHotel();
    if (res.code == 200) {
      if (res.code !== 200) {
        dingAlert('提交失败，请稍后再试。', '错误', '确认');
        return;
      }
      dingToast('提交成功', 'success');
    }
  };
  const handleCheckExpert = async () => {
    setIsShowExpertList(true);
    /* 获取专家列表 */
    const experts = await searchExpert({ type: category?.fullPath });
    if (experts.code === 200) {
      setExpertList(experts.data);
    }
  };
  useEffect(() => {
    getData(setCategoryOptions);
  }, []);

  return (
    <Page title="转运">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>隔离方式</InputLabel>
          <FormControl fullWidth>
            <Button
              onClick={() => {
                setIsShowDrawer(true);
              }}
              className={category ? '' : commonStyle.placeholderColor}
              disableElevation
              fullWidth
            >
              {category ? category.fullPathName : '选择隔离方式'}
            </Button>
            <Drawer
              anchor="right"
              open={isShowDrawer}
              onClose={() => {
                setIsShowDrawer(false);
              }}
            >
              <TypeList
                category={category}
                setCategory={setCategory}
                isChildren={false}
                setIsShowDrawer={setIsShowDrawer}
                categoryOptions={categoryOptions}
              ></TypeList>
            </Drawer>
          </FormControl>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel error={!!infoError} required>
            选择隔离地区
          </InputLabel>
          <FormControl fullWidth>
            <Button
              onClick={handleCheckExpert}
              className={commonStyle.placeholderColor}
              disableElevation
              fullWidth
            >
              {selectExpert ? selectExpert.name : '请选择隔离地区'}
            </Button>
            <Drawer
              anchor="right"
              open={isShowExpertList}
              onClose={() => {
                setIsShowExpertList(false);
              }}
            >
              <HotelList
                setIsShowExpertList={setIsShowExpertList}
                setSelectExpert={setSelectExpert}
                expertList={expertList}
              ></HotelList>
            </Drawer>
          </FormControl>
          <FormHelperText error>{infoError}</FormHelperText>
        </Box>
      </Paper>
      <Box marginY={1.5} padding={1.5}>
        <Button
          onClick={handleReminder}
          variant="contained"
          color="primary"
          disabled={isLoading}
          disableElevation
          fullWidth
        >
          确认转运
        </Button>
      </Box>
    </Page>
  );
}
