import React, { useState, useCallback, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Drawer from '@material-ui/core/Drawer';
import TypeList from '@components/TypeList';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

import Button from '@material-ui/core/Button';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Page from '@components/layout/Page';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import FileList from '@components/FileList';
import commonStyle from '@styleModules/common.module.scss';
import {
  Category,
  getCategory,
  createOrder,
  getOrderTags,
  getDingFilePermission
} from '@src/api';
import { selectTreeOptions, configDingtalk } from '@src/utils';
import {
  dingAlert,
  dingQuitPage,
  dingGoBack,
  dingToast,
  dingUploadFile,
  getPlatform
} from '@src/dingtalkAPI';
import { Dingtalk } from '@src/constants';
import { ENV_ENUM } from 'dingtalk-jsapi/lib/sdk';

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

/* 加载页面数据 */
async function getData(
  setCategoryOptions: React.Dispatch<React.SetStateAction<Category[]>>,
  setDingFileSpaceId: React.Dispatch<React.SetStateAction<string>>
) {
  /* 获取工单类别选项 */
  const categoryRes = await getCategory();
  if (categoryRes.code === 200) {
    setCategoryOptions(categoryRes.data);
  }

  const isDingtalkReady = await configDingtalk([
    'biz.util.uploadAttachment',
    'biz.cspace.preview'
  ]);
  if (!isDingtalkReady) {
    return;
  }

  const permissionRes = await getDingFilePermission('add');
  if (permissionRes.data.resoult) {
    setDingFileSpaceId(permissionRes.data.spaceId);
  }
}

/**
 * 提交工单模块
 */
export default function UserCreateOrder(): JSX.Element {
  /* 工单标题 */
  const [title, setTitle] = useState('');

  /* 工单标题输入的错误提示 */
  const [titleError, setTitleError] = useState('');

  /* 工单分类 */
  const [category, setCategory] = useState<SelectedCategory | null>(null);

  /* 工单分类选项 */
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);

  /* 工单分类选择的错误提示 */
  const [categoryError, setCategoryError] = useState('');

  /* 工单描述 */
  const [content, setContent] = useState('');

  /* 工单描述输入的错误提示 */
  const [contentError, setContentError] = useState('');

  /* 工单文件 */
  const [files, setFiles] = useState<DingFile[]>([]);

  /* 钉盘空间 */
  const [dingFileSpaceId, setDingFileSpaceId] = useState('');

  /* 是否正在处理数据 */
  const [isLoading, setIsLoading] = useState(false);

  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const [selectTags, setSelectTags] = useState([]);

  const [selectTagsIds, setSelectTagsIds] = useState<Array<number>>();
  const [selectTagsNames, setSelectTagsNames] = useState<Array<string>>();

  const [tags, setTags] = useState<Tags[]>([]);

  async function getTags(condition: { type_id?: string | number }) {
    const resoult = await getOrderTags(condition);
    if (resoult.code == 200) {
      setTags(resoult.data);
    }
  }

  const handleChangeTags = (event: any) => {
    const {
      target: { value, nameList }
    } = event;
    console.log(event);
    const tagIds: Array<number> = [];
    const tagNames: Array<string> = [];
    value.map(function (item: string, key: number) {
      const res = item.split(',');
      tagIds.push(Number(res[0]));
      tagNames.push(res[1]);
      if (key == value.length - 1) {
        setSelectTagsIds(tagIds);
        setSelectTagsNames(tagNames);
      }
    });
    setSelectTags(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  /* 输入工单标题、描述 */
  const handleChange = useCallback((event: InputChangeEvent) => {
    const name = event.target.name;

    if (name === 'title') {
      setTitleError('');
      setTitle(event.target.value);
    } else if (name === 'content') {
      setContent(event.target.value);
    }
  }, []);

  /* 选择工单分类 */
  const handleSelectCategory = useCallback(async () => {
    const selection = await selectTreeOptions(categoryOptions);
    if (!selection) {
      return;
    }
    console.log('select', selection);
    setCategory({
      label: selection.selected.label,
      fullPathName: selection.selectedPath.map(path => path.label).join('/'),
      fullPath: selection.selectedPath.map(path => path.value).join(','),
      value: selection.selected.value
    });
    setCategoryError('');
  }, [categoryOptions]);

  /* 上传文件（钉盘） */
  const handleUploadFiles = useCallback(async () => {
    try {
      const fileRes = await dingUploadFile(
        dingFileSpaceId,
        9,
        Dingtalk.CORP_ID
      );
      setFiles(files => files.concat(...fileRes.data));
    } catch (error) {
      console.log('fileError', error);
    }
  }, [dingFileSpaceId]);

  /* 删除文件 */
  const handleDeleteFile = useCallback((fileId: string) => {
    setFiles(files => files.filter(file => file.fileId !== fileId));
  }, []);

  /* 提交工单 */
  const handleSubmit = useCallback(
    async (
      title: string,
      category: SelectedCategory | null,
      content: string,
      files: DingFile[],
      tag_Ids?: string,
      tag_Names?: string
    ) => {
      if (!title) {
        setTitleError('请输入标题');
        return;
      }

      if (!category) {
        setCategoryError('请选择工单类别');
        return;
      }
      if (!content) {
        setContentError('请输入内容');
        return;
      }

      setIsLoading(true);

      const res = await createOrder(
        title,
        category.fullPath,
        content,
        JSON.stringify(files),
        tag_Ids,
        tag_Names
      );
      if (res.code !== 200) {
        dingAlert('提交失败，请稍后再试。', '错误', '确认');
        return;
      }

      dingToast('提交成功', 'success');

      if (getPlatform() === ENV_ENUM.pc) {
        dingQuitPage();
      } else {
        dingGoBack();
      }
    },
    []
  );

  useEffect(() => {
    getData(setCategoryOptions, setDingFileSpaceId);
    getTags({});
  }, []);

  return (
    <Page title="提交工单">
      <form>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel error={!!titleError} required>
              标题
            </InputLabel>
            <FormControl fullWidth>
              <Input
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="请用一句话描述您的问题"
                disableUnderline
                multiline
              />
              <FormHelperText error>{titleError}</FormHelperText>
            </FormControl>
          </Box>
        </Paper>
        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel error={!!categoryError} required>
              问题类别
            </InputLabel>
            <FormControl fullWidth>
              <Button
                onClick={() => {
                  setIsShowDrawer(true);
                }}
                className={category ? '' : commonStyle.placeholderColor}
                disableElevation
                fullWidth
              >
                {category ? category.fullPathName : '请选择'}
              </Button>
              <Drawer anchor="right" open={isShowDrawer} onClose={()=>{setIsShowDrawer(false)}}>
                <TypeList
                  category={category}
                  setCategory={setCategory}
                  isChildren={false}
                  setSelectTags={setSelectTags}
                  setTags={setTags}
                  setIsShowDrawer={setIsShowDrawer}
                  categoryOptions={categoryOptions}
                ></TypeList>
              </Drawer>
              <FormHelperText error>{categoryError}</FormHelperText>
            </FormControl>
          </Box>
        </Paper>

        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel error={!!categoryError}>标签</InputLabel>
            <FormControl fullWidth>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={selectTags}
                onChange={handleChangeTags}
                input={<OutlinedInput label="标签" />}

                // MenuProps={MenuProps}
              >
                {tags.map(tag => (
                  <MenuItem
                    key={tag.value}
                    value={tag.value + ',' + tag.label}
                    // style={{ maxHeight: 48 * 4.5 + 8 , width: 250}}
                  >
                    {tag.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Paper elevation={0} square>
          <Box marginY={1.5} padding={1.5}>
            <InputLabel error={!!contentError} required>
              问题描述
            </InputLabel>
            <FormControl fullWidth>
              <Input
                name="content"
                value={content}
                onChange={handleChange}
                placeholder="请详细描述您的问题"
                minRows={10}
                maxRows={1000}
                disableUnderline
                multiline
              />
            </FormControl>
            <FormHelperText error>{contentError}</FormHelperText>
          </Box>
        </Paper>
        {dingFileSpaceId && (
          <Paper elevation={0} square>
            <Box marginY={1.5} padding={1.5}>
              <InputLabel>附件</InputLabel>
              <FormControl fullWidth>
                <Button
                  onClick={handleUploadFiles}
                  startIcon={<CloudUploadIcon />}
                  className={commonStyle.placeholderColor}
                  disableElevation
                  fullWidth
                >
                  上传
                </Button>
              </FormControl>
            </Box>
            <FileList files={files} onDelete={handleDeleteFile} />
          </Paper>
        )}
        <Box marginY={1.5} marginX={2}>
          <Button
            onClick={() =>
              handleSubmit(
                title,
                category,
                content,
                files,
                selectTagsIds?.toString(),
                selectTagsNames?.toString()
              )
            }
            startIcon={<PostAddIcon />}
            variant="contained"
            color="primary"
            disabled={isLoading}
            disableElevation
            fullWidth
          >
            提交工单
          </Button>
        </Box>
      </form>
    </Page>
  );
}
