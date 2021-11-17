import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import style from '@styleModules/components/expertHeader.module.scss';
import Link from '@components/Link';

export default function ExpertHeader(): JSX.Element {
  const userInfo = useSelector(userInfoSelector);

  return (
    <Box marginBottom={1.5}>
      <Paper elevation={0} square>
        <Box padding={1.5}>
          <Grid wrap="nowrap" container>
            <Grid xs={2} item>
              <Link to="/expert/expertCenter">
                <Avatar className={style.avatar}>
                  {userInfo.name.slice(-2)}
                </Avatar>
              </Link>
            </Grid>
            <Grid
              xs={10}
              direction="column"
              justifyContent="space-between"
              container
              item
            >
              <Typography variant="body1">{userInfo.name}</Typography>
              <Grid
                justifyContent="space-between"
                alignItems="center"
                wrap="nowrap"
                container
              >
                <Typography variant="caption">管理员</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
