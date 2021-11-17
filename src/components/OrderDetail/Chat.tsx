import React, { useCallback, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import KeyboardIcon from '@material-ui/icons/Keyboard';

import commonStyle from '@styleModules/common.module.scss';
import {
  dingStartRecord,
  dingStopRecord,
  dingTranslateVoice,
  dingToast
} from '@src/dingtalkAPI';
type Props = {
  isLoading: boolean;
  onSubmit: (message: string) => Promise<boolean>;
};

export default function OrderDetailChat({
  isLoading,
  onSubmit
}: Props): JSX.Element {
  /* 对话消息内容 */
  const [message, setMessage] = useState('');

  const [feedbackType, setFeedbackType] = useState(false);

  const [isStop, setIsStop] = useState(false);

  /* 输入消息内容 */
  const handleInputMessage = useCallback((event: InputChangeEvent) => {
    setMessage(event.target.value);
  }, []);

  /**语音输入 */
  const handleVoice = async () => {
    // if(isStop){
    try {
      const voiceMessage = await dingStopRecord();
      if (voiceMessage) {
        const message = await dingTranslateVoice(
          voiceMessage.mediaId,
          voiceMessage.duration
        );
        if (message) {
          setMessage(message.content);
          setFeedbackType(false);
        }
      }
    } catch (error) {
      console.error(error);
      dingToast('语音输入失败');
    }
    // }else{
    //   const res = await dingStartRecord();
    // }
    // setIsStop(!isStop);
  };
  /* 提交消息 */
  const handleSubmitMessage = useCallback(async () => {
    const res = await onSubmit(message);
    if (res) {
      setMessage('');
    }
  }, [message, onSubmit]);

  return (
    <Paper className={commonStyle.fixedBottom} square>
      <Box padding={1.5}>
        <Grid alignItems="flex-end" wrap="nowrap" container>
          <Button
            onClick={() => {
              setFeedbackType(!feedbackType);
            }}
            color="default"
            variant="contained"
            size="small"
            disabled={isLoading}
            disableElevation
          >
            {!feedbackType ? <KeyboardVoiceIcon /> : <KeyboardIcon />}
          </Button>

          {!feedbackType ? (
            <>
              <Input
                name="message"
                value={message}
                onChange={handleInputMessage}
                placeholder="输入回复内容"
                fullWidth
                maxRows={10}
                disableUnderline
                multiline
              />
              <Button
                onClick={handleSubmitMessage}
                color="primary"
                variant="contained"
                size="small"
                disabled={isLoading}
                disableElevation
              >
                回复
              </Button>
            </>
          ) : (
            <Button
              onTouchStart={async () => {
                const res = await dingStartRecord();
              }}
              onTouchEnd={handleVoice}
              className={commonStyle.voiceButton}
              variant="contained"
              size="small"
              disabled={isLoading}
              disableElevation
            >
              按住 说话
            </Button>
          )}
        </Grid>
      </Box>
    </Paper>
  );
}
