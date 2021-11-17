import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Page from '@components/layout/Page';
import Input from '@material-ui/core/Input';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Role } from '@src/constants';
import useOrderDetail from '@src/hooks/useOrderDetail';
import { getURL } from '@src/utils';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ENV_ENUM } from 'dingtalk-jsapi/lib/sdk';
import { getPlatform, dingQuitPage, dingOpenLink } from '@src/dingtalkAPI';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));
export default function UserCloseOrder(): JSX.Element {
  /* 从URL参数中读取工单ID */
  const { orderId }: { orderId: string } = useParams();
  const [goodService, setGoodService] = useState(false);
  const [goodTechnology, setGoodTechnology] = useState(false);
  const [quickly, setQuickly] = useState(false);
  const [stableProduct, setStableProduct] = useState(false);
  const [content, setContent] = useState('');
  const handleSetContent = (data: { name: boolean; value: string }) => {
    if (data.name) {
      let newContent = '';
      content.indexOf(data.value) == 0
        ? (newContent = content.replace(data.value + '，', ''))
        : (newContent = content.replace('，' + data.value, ''));
      setContent(newContent);
      if (content == data.value) {
        setContent('');
      }
    } else {
      content == ''
        ? setContent(content + data.value)
        : setContent(content + '，' + data.value);
    }
  };
  const classes = useStyles();
  /* 工单详情数据和方法 */
  const { order, isLoading, closeOrder } = useOrderDetail(orderId, Role.USER);
  const [evaluate, setEvaluate] = useState('');
  const [orderRate, setOrderRate] = useState(5);
  //处理数据
  const handleChange = useCallback((event: InputChangeEvent) => {
    setEvaluate(event.target.value);
  }, []);
  /* 关闭工单 */
  const handleCloseOrder = async () => {
    if (!order) {
      return;
    }

    const ask_evaluate = content == '' ? evaluate : content + '。' + evaluate;
    await closeOrder(ask_evaluate, orderRate);

    if (getPlatform() === ENV_ENUM.pc) {
      dingQuitPage();
    } else {
      dingOpenLink(getURL(`user/order/${order.id}`));
      // dingGoBack();
    }
  };
  return (
    <Page title="关闭工单">
      <Paper elevation={0} square>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>用户评分</InputLabel>
          <FormControl fullWidth>
            <div style={{ margin: 'auto' }}>
              <Rating
                name="customized-empty"
                defaultValue={5}
                precision={0.5}
                onChange={(event, value) => {
                  value != null ? setOrderRate(value) : console.log(event);
                }}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </div>
          </FormControl>
        </Box>
        <Box marginY={1.5} padding={1.5}>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setGoodService(!goodService);
                    handleSetContent({
                      name: goodService,
                      value: '服务态度很好'
                    });
                  }}
                  color={goodService ? 'primary' : 'default'}
                  style={{ width: '100%' }}
                  disableElevation
                >
                  服务态度很好
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setGoodTechnology(!goodTechnology);
                    handleSetContent({
                      name: goodTechnology,
                      value: '技术能力很强'
                    });
                  }}
                  color={goodTechnology ? 'primary' : 'default'}
                  style={{ width: '100%' }}
                  disableElevation
                >
                  技术能力很强
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setQuickly(!quickly);
                    handleSetContent({
                      name: quickly,
                      value: '解决问题很及时'
                    });
                  }}
                  color={quickly ? 'primary' : 'default'}
                  style={{ width: '100%' }}
                  disableElevation
                >
                  解决问题很及时
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setStableProduct(!stableProduct);
                    handleSetContent({
                      name: stableProduct,
                      value: '产品很稳定'
                    });
                  }}
                  color={stableProduct ? 'primary' : 'default'}
                  style={{ width: '100%' }}
                  disableElevation
                >
                  产品很稳定
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
        <Box marginY={1.5} padding={1.5}>
          <InputLabel>用户评价</InputLabel>
          <FormControl fullWidth>
            <Input
              name="ask_evaluate"
              value={evaluate}
              onChange={handleChange}
              placeholder="请对工单完成情况作出评价"
              minRows={7}
              maxRows={600}
              disableUnderline
              multiline
            />
          </FormControl>
        </Box>
        <Box marginY={1.5} marginX={2}>
          <Button
            onClick={handleCloseOrder}
            variant="contained"
            color="primary"
            disabled={isLoading}
            disableElevation
            fullWidth
          >
            确认关单
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}
