import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Grid, Box } from '@material-ui/core';
import theme from '@src/theme';
import UserOrderIndex from '../user/order/Index';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
});

export default function MyCenter(): JSX.Element {
  const classes = useStyles();
  const [totalCount, settotalCount] = useState({
    red_envelopes: 5,
    answer_count: 6,
    conmment_count: 20
  });
  const [userName, setuserName] = useState('我是皮卡丘');
  const [honerTitle, sethonerTitle] = useState('不屈白银');
  const sethonerLevel = async () => {
    const score = 5000;
    if (score >= 3000) {
      const name = '至尊';
      sethonerTitle(name);
    } else if (score < 3000 && score >= 2000) {
      const name = '王者';
      sethonerTitle(name);
    } else if (score < 2000 && score >= 1500) {
      const name = '大师';
      sethonerTitle(name);
    } else if (score < 1500 && score >= 1000) {
      const name = '星耀';
      sethonerTitle(name);
    } else if (score < 1000 && score >= 500) {
      const name = '钻石';
      sethonerTitle(name);
    } else if (score < 500 && score >= 300) {
      const name = '黄金';
      sethonerTitle(name);
    } else if (score < 300 && score >= 200) {
      const name = '白银';
      sethonerTitle(name);
    } else {
      const name = '黑铁';
      sethonerTitle(name);
    }
  };

  return (
    <React.Fragment>
      <Box
        position="absolute"
        style={{
          height: '10rem',
          width: '100%',
          backgroundColor: '#428CD7',
          zIndex: -50
        }}
      ></Box>
      <Box
        display="flex"
        justifyContent="center"
        style={{ marginTop: '-10rem' }}
      >
        <Card
          className={classes.root}
          style={{ width: '92%', marginTop: '4rem', borderRadius: 10 }}
        >
          <CardContent
            style={{
              height: '15rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            <Typography variant="h5" component="h3">
              <Box
                display="flex"
                justifyContent="start"
                style={{ marginTop: '1rem', marginLeft: '1rem' }}
              >
                <Avatar
                  className={classes.large}
                  src="https://img0.baidu.com/it/u=3223057144,721922603&fm=26&fmt=auto&gp=0.jpg"
                />
                <Box style={{ marginLeft: '1rem' }}>
                  {userName}
                  <br />
                  <h4 style={{ marginTop: '1rem' }} onChange={sethonerLevel}>
                    {honerTitle}等级
                  </h4>
                </Box>
              </Box>
            </Typography>
            <Typography style={{ marginTop: '2rem' }}>
              <Box display="flex" justifyContent="space-around">
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'center',
                    borderRight: '1px solid #7D7D7D',
                    width: '50%'
                  }}
                >
                  {totalCount.red_envelopes}
                  <br />
                  <span style={{ fontSize: '1rem', color: '#7D7D7D' }}>
                    提问数
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'center',
                    borderLeft: '1px solid #7D7D7D',
                    width: '50%'
                  }}
                >
                  {totalCount.conmment_count}
                  <br />
                  <span style={{ fontSize: '1rem', color: '#7D7D7D' }}>
                    评论数
                  </span>
                </Typography>
              </Box>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <UserOrderIndex />
      </Box>
    </React.Fragment>
  );
}
