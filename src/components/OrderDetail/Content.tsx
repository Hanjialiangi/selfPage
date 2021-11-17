import React, { useCallback } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ReactMarkdown from 'react-markdown';
import commonStyle from '@styleModules/common.module.scss';
import FileList from '@components/FileList';
import { dingCopy, dingToast } from '@src/dingtalkAPI';
import { getTextFromHTML } from '@src/utils';

type Props = {
  children: string;
  category?: string;
  files: DingFile[];
  serialNumber: string;
};

export default function OrderDetailContent({
  children,
  category,
  files,
  serialNumber
}: Props): JSX.Element {
  const handleCopySerialNumber = useCallback(async () => {
    try {
      await dingCopy(serialNumber);
      dingToast('复制成功');
    } catch (error) {
      console.error(error);
      dingToast('复制失败');
    }
  }, [serialNumber]);

  return (
    <Box marginBottom={1.5}>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          {serialNumber && (
            <>
              <Typography variant="overline">工单编号</Typography>
              <Box paddingLeft={1} onClick={handleCopySerialNumber}>
                <Grid
                  wrap="nowrap"
                  alignItems="center"
                  justifyContent="flex-start"
                  container
                >
                  <Typography variant="body1">{serialNumber}</Typography>
                  <FileCopyOutlinedIcon color="action" fontSize="small" />
                </Grid>
              </Box>
            </>
          )}
          {category && (
            <>
              <Typography variant="overline">问题类别</Typography>
              <Box paddingLeft={1}>
                <Typography variant="body1">{category}</Typography>
              </Box>
            </>
          )}
          <Typography variant="overline">问题描述</Typography>
          <Box paddingLeft={2}>
            <ReactMarkdown
              className={`${commonStyle.preWrap} ${commonStyle.markdown}`}
            >
              {getTextFromHTML(children)}
            </ReactMarkdown>
          </Box>
        </Box>
        <FileList files={files} />
      </Paper>
    </Box>
  );
}
