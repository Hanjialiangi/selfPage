import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MessageItem from '@components/OrderDetail/MessageItem';
import { EmptyIcon } from '@components/SvgIcons';
import commonStyle from '@styleModules/common.module.scss';
export type Message = {
  id: number;
  name: string;
  content: string;
  file: DingFile | string;
  file_type: string;
  isSelf: boolean;
  userId: string;
  createdDate: string;
  createdTime: string;
  createdAt: string;
};

type MessageGroup = {
  date: string;
  messages: Message[];
};

type Props = {
  messages: Message[];
  isEmpty: boolean;
  hidePeerName?: boolean;
  peerDefaultName?: string;
};

export default function MessageList({
  messages,
  isEmpty,
  hidePeerName,
  peerDefaultName
}: Props): JSX.Element {
  const [messageGroups, setMessageGroups] = useState<MessageGroup[]>([]);

  useEffect(() => {
    const groups: Record<string, Message[]> = {};
    const dates = [];
    for (const message of messages) {
      if (groups[message.createdDate]) {
        groups[message.createdDate].push(message);
      } else {
        dates.push(message.createdDate);
        groups[message.createdDate] = [message];
      }
    }

    setMessageGroups(
      dates.map(date => ({
        date: date,
        messages: groups[date]
      }))
    );
  }, [messages]);

  return (
    <Box marginBottom={1.5}>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <Typography variant="caption">工单回复</Typography>
          <Box paddingY={1}>
            {messageGroups.map(group => {
              return (
                <Box marginY={1} key={group.date}>
                  <Typography
                    align="center"
                    variant="caption"
                    component="p"
                    className={commonStyle.grey}
                  >
                    - {group.date} -
                  </Typography>
                  {group.messages.map(message => {
                    return (
                      <MessageItem
                        key={message.id}
                        content={message.content}
                        name={message.name}
                        userId={message.userId}
                        files={message.file}
                        createdTime={message.createdTime}
                        isSelf={message.isSelf}
                        hidePeerName={hidePeerName}
                        peerDefaultName={peerDefaultName}
                      />
                    );
                  })}
                </Box>
              );
            })}
          </Box>
          {isEmpty && (
            <Grid direction="column" alignItems="center" container>
              <Box margin={3}>
                <EmptyIcon width="7rem" />
              </Box>
              <Typography variant="caption">暂时没有回复</Typography>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
