import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar, Box } from '@material-ui/core';
import theme from '@src/theme';
import style from '@styleModules/components/expertHeader.module.scss';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '@src/redux/selectors';
import { getMyCenterData } from '@src/api';
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
type category = {
  id: number;
  tickettype_id: number;
  name: string;
  level: number;
};

const levelOptions = [
  { name: '初级', value: 1 },
  { name: '中级', value: 2 },
  { name: '高级', value: 3 }
];

export default function MyCenter(): JSX.Element {
  const classes = useStyles();
  const userInfo = useSelector(userInfoSelector);
  const [totalCount, settotalCount] = useState({
    red_envelopes: 0,
    answer_count: 0,
    conmment_count: 0
  });
  const [categoryList, setCategoryList] = useState<category[]>();
  const [honerTitle, sethonerTitle] = useState('');
  const sethonerLevel = async (score: number) => {
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
  const getMyCenter = async () => {
    const res = await getMyCenterData({ role_id: 4, id: userInfo.id });
    if (res.code == 200) {
      settotalCount({
        red_envelopes: 0,
        answer_count: res.data.resolveNumber,
        conmment_count: res.data.evaluateNumber
      });
      sethonerLevel(res.data.askNumber);
      setCategoryList(res.data.categorys);
    }
  };
  /* 页面从不可见变为可见、切换 tab 、更新查询参数之后重新加载数据 */
  useEffect(() => {
    getMyCenter();
  }, []);

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
      <Box display="flex" justifyContent="center">
        <Card
          className={classes.root}
          style={{ width: '92%', marginTop: '3rem', borderRadius: 10 }}
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
                {userInfo.avatar == '' ? (
                  <Avatar className={`${style.avatar_anther} ${classes.large}`}>
                    {userInfo.name.slice(-2)}
                  </Avatar>
                ) : (
                  <Avatar
                    className={classes.large}
                    src={userInfo.avatar}
                    alt={userInfo.name}
                  />
                )}
                <Box style={{ marginLeft: '1rem' }}>
                  {userInfo.name}
                  <br />
                  <h4 style={{ marginTop: '1rem' }}>{honerTitle}等级</h4>
                </Box>
              </Box>
            </Typography>
            <Typography>
              <Box display="flex" justifyContent="space-around">
                <Typography
                  variant="h5"
                  style={{
                    width: '28%',
                    textAlign: 'center',
                    borderRight: '1px solid #7D7D7D'
                  }}
                >
                  {totalCount.red_envelopes}
                  <br />
                  <span style={{ fontSize: '1rem', color: '#7D7D7D' }}>
                    红包数
                  </span>
                </Typography>
                <Typography variant="h5" style={{ textAlign: 'center' }}>
                  {totalCount.answer_count}
                  <br />
                  <span style={{ fontSize: '1rem', color: '#7D7D7D' }}>
                    回答数
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  style={{
                    width: '28%',
                    textAlign: 'center',
                    borderLeft: '1px solid #7D7D7D'
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
      {categoryList?.map(function (item) {
        return (
          <Card style={{ marginTop: '1rem' }} key={item.id}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" style={{ marginLeft: '3%' }}>
                {item.name}
              </Typography>
              <Typography
                variant="h6"
                style={{ marginRight: '3%', color: '#7D7D7D' }}
              >
                {item.level == null
                  ? levelOptions[0].name
                  : levelOptions[item.level - 1].name}
              </Typography>
            </Box>
          </Card>
        );
      })}
      {/* <Card style={{marginTop:'1rem'}}>
      <Box display="flex" justifyContent="space-between" >
          <Typography variant='h6' style={{marginLeft:'3%'}}>ERP_SD</Typography>
          <Typography variant='h6' style={{marginRight:'3%',color:'#7D7D7D'}}>中级</Typography>
      </Box>
      </Card>

      <Card>
      <Box display="flex" justifyContent="space-between">
          <Typography variant='h6' style={{marginLeft:'3%'}}>SRM</Typography>
          <Typography variant='h6' style={{marginRight:'3%',color:'#7D7D7D'}}>高级</Typography>
      </Box>
      </Card>

      <Card>
      <Box display="flex" justifyContent="space-between">
          <Typography variant='h6' style={{marginLeft:'3%'}}>CSS</Typography>
          <Typography variant='h6' style={{marginRight:'3%',color:'#7D7D7D'}}>高级</Typography>
      </Box>
      </Card> */}
    </React.Fragment>
  );
}
