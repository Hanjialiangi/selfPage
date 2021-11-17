import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import commonStyles from '@styleModules/common.module.scss';
import moment from 'moment';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  }
});
//数据来源
const res = [
  {
    id: '1',
    title: '工单标题',
    type: '问题分类',
    text: '君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。五花马，千金裘，呼儿将出换美酒，与尔同销万古愁',
    date: '2021-07-22'
  },
  {
    id: '2',
    title: '工单标题',
    type: '问题分类',
    text: '君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。与君歌一曲，请君为我倾耳听。钟鼓馔玉不足贵，但愿长醉不复醒。古来圣贤皆寂寞，惟有饮者留其名。 陈王昔时宴平乐，斗酒十千恣欢谑。 主人何为言少钱，径须沽取对君酌。五花马，千金裘，呼儿将出换美酒，与尔同销万古愁',
    date: '2021-07-23'
  }
];

export default function TodoCard(): JSX.Element {
  const classes = useStyles();
  //全局钩子
  const [orderInformation, setOrderInformation] = useState([
    {
      id: '',
      title: '',
      type: '',
      text: '',
      date: ''
    }
  ]);
  useEffect(() => {
    setOrderInformation(res);
  }, []); //状态state/token
  return (
    <>
      {orderInformation.map((item, key) => {
        return (
          <a key={key} href={`/expert/order/detail?id=${item.id}`}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  component="div"
                  className={classes.title}
                  gutterBottom
                  style={{ display: 'flex' }}
                >
                  <div className={commonStyles.lastLabel}>{item.title}</div>
                  <div className={commonStyles.nextLabel}>{item.type}</div>
                </Typography>
                <Typography variant="body2" component="div">
                  <div className={commonStyles.orderText}>{item.text}</div>
                </Typography>
              </CardContent>
              <CardActions>
                <div className={commonStyles.lastLabel}>
                  <span
                    style={
                      moment().diff(moment(item.date), 'days') > 0
                        ? { color: 'rgb(241, 85, 28)' }
                        : { color: 'black' }
                    }
                  >
                    {item.date}
                  </span>
                </div>
                <Button variant="outlined" className={commonStyles.nextLabel}>
                  反馈
                </Button>
              </CardActions>
            </Card>
          </a>
        );
      })}
    </>
  );
}
