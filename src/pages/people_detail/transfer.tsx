import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '@components/layout/Page';
import { Box, Paper, Button, Input, Drawer } from '@material-ui/core';
import TypeList from '@components/TypeList';
import ExpertList from '@components/ExpertList';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import commonStyle from '@styleModules/common.module.scss';

import { ENV_ENUM } from 'dingtalk-jsapi/lib/sdk';
import { getURL } from '@src/utils';
import {
  Category,
  getCategory,
  transferOrder,
  expertDesignateToAdmin
} from '@src/api';
import {
  dingAlert,
  dingQuitPage,
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
  const { orderId, transfer }: { orderId: string; transfer: string } =
    useParams();
  /* 工单分类选择的错误提示 */
  const [expertError, setExpertError] = useState('');

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
    /* 获取专家列表 */
    const experts = await searchExpert({});
    if (experts.code === 200) {
      setExpertList(experts.data);
    }
  }
  /* 提交工单 */
  const handleReminder = async () => {
    if (transfer == 'toExpert') {
      console.log(selectExpert);
      if (!selectExpert) {
        setExpertError('请选择转单专家');
        return;
      }
      setIsLoading(true);
      const res = await transferOrder(
        selectExpert.id,
        orderId,
        category?.fullPath,
        option
      );

      if (res.code !== 200) {
        dingAlert('提交失败，请稍后再试。', '错误', '确认');
        return;
      }
      dingToast('提交成功', 'success');
    } else {
      const res = await expertDesignateToAdmin(orderId, option);

      if (res.code !== 200) {
        dingAlert('提交失败，请稍后再试。', '错误', '确认');
        return;
      }
      dingToast('提交成功', 'success');
    }

    if (getPlatform() === ENV_ENUM.pc) {
      dingQuitPage();
    } else {
      dingOpenLink(getURL(`expert/kanban`));
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
          <InputLabel error={!!expertError} required>
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
              <ExpertList
                setIsShowExpertList={setIsShowExpertList}
                setSelectExpert={setSelectExpert}
                expertList={expertList}
              ></ExpertList>
            </Drawer>
          </FormControl>
          <FormHelperText error>{expertError}</FormHelperText>
        </Box>
      </Paper>
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>转运备注</InputLabel>
          <FormControl fullWidth>
            <Input
              name="ask_evaluate"
              value={option}
              onChange={e => {
                setOption(e.target.value);
              }}
              placeholder="请填写转运意见"
              minRows={7}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
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
