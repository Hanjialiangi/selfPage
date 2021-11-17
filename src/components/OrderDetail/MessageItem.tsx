import React from 'react';
import ReactMarkdown from 'react-markdown';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import commonStyle from '@styleModules/common.module.scss';
import { getTextFromHTML } from '@src/utils';
import { Dingtalk } from '@src/constants';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import { dingConversation } from '@src/dingtalkAPI';
import FileList from '@components/FileList';
type Props = {
  content: string;
  name: string;
  userId: string;
  files: DingFile | string;
  createdTime: string;
  isSelf: boolean;
  hidePeerName?: boolean;
  peerDefaultName?: string;
};

export default function MessageItem({
  content,
  name,
  files,
  userId,
  createdTime,
  isSelf,
  hidePeerName,
  peerDefaultName
}: Props): JSX.Element {
  const userInfo = useSelector(userInfoSelector);
  /* 拉取会话 */
  const handleConversation = async () => {
    if (userInfo.role !== 4) {
      try {
        if (userId) {
          await dingConversation(Dingtalk.CORP_ID, userId);
        }
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  return (
    <Box marginY={1}>
      <Grid justifyContent={isSelf ? 'flex-end' : 'flex-start'} container>
        <Grid xs={12} item>
          <Typography
            onClick={handleConversation}
            variant="caption"
            component="div"
          >
            <Grid
              justifyContent="flex-start"
              alignItems="center"
              wrap="nowrap"
              direction={isSelf ? 'row-reverse' : 'row'}
              container
            >
              {isSelf ? name : hidePeerName ? peerDefaultName || '' : name}
              <Box padding={0.5} className={commonStyle.grey}>
                {createdTime}
              </Box>
            </Grid>
          </Typography>
        </Grid>
        <Grid xs={9} className={commonStyle.flexBasisAuto} item>
          <Paper
            elevation={0}
            className={isSelf ? commonStyle.blueCard : commonStyle.greyCard}
          >
            <Box padding={1}>
              {files ? (
                <FileList files={files} />
              ) : (
                <ReactMarkdown
                  className={`${commonStyle.preWrap} ${commonStyle.markdown} ${commonStyle.breakWord}`}
                >
                  {getTextFromHTML(content)}
                </ReactMarkdown>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
