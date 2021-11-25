if (process.env.NODE_ENV === 'development') {
  console.log('-=Development Mode=-');
  require('./styles/index.scss');
  require('./index.html');
}

import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from '@src/redux/reducers';
import Routes from '@src/Routes';
import PotentialError from '@components/PotentialError';
import {
  setAppVisibilityAction,
  setUserInfoAction,
  updateAuthAction
} from './redux/actions';
import { CookieKey, Dingtalk, Mode, PUBLIC_PATH } from './constants';
import {
  insertDebugScript,
  getCookie,
  removeCookie,
  enableDebug
} from './utils';
import { auth, getUserInfo } from '@src/api';
import {
  dingGetCode,
  dingPrompt,
  dingSetRight,
  getPlatform
} from '@src/dingtalkAPI';
import { ENV_ENUM } from 'dingtalk-jsapi/lib/sdk';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '@src/theme';
import NarBar from '@components/jk_layout/NarBar';

const store = createStore(rootReducer);

const App = () => {
  const dispatch = useDispatch();

  //设置登录信息
  const setAuthInfo = useCallback(
    (id: number, name: string, role: string, token?: string) => {
      if (token) {
        dispatch(updateAuthAction(`Bearer ${token}`));
      }

      dispatch(
        setUserInfoAction({
          id,
          name,
          role
        })
      );
    },
    [dispatch]
  );

  //检查页面是否可见
  const handleVisibilityChange = useCallback(() => {
    document.addEventListener('visibilitychange', () => {
      dispatch(setAppVisibilityAction(document.visibilityState === 'visible'));
    });
  }, [dispatch]);

  useEffect(() => {
    handleVisibilityChange();

    window.login = async (reLogin = false) => {
      const savedAuth = getCookie(CookieKey.AUTHORIZATION);

      if (savedAuth && !reLogin) {
        //加载已登录用户信息
        const userInfoRes = await getUserInfo();
        if (userInfoRes.code !== 200) {
          return;
        }

        setAuthInfo(
          userInfoRes.data.roles[0].id,
          userInfoRes.data.name,
          userInfoRes.data.roles[0].key
        );
        return;
      }

      removeCookie(CookieKey.AUTHORIZATION);

      //开发环境登录
      if (process.env.NODE_ENV === Mode.DEVELOPMENT) {
        const authRes = await auth('', Dingtalk.AGENT_ID, '140236142620880278');
        if (authRes.code !== 200) {
          return;
        }

        //加载登录用户信息
        setAuthInfo(
          authRes.data.user_id,
          authRes.data.user_name,
          authRes.data.role,
          authRes.data.token
        );
        return;
      }

      //Todo: 钉钉外登录
      if (getPlatform() === ENV_ENUM.notInDingTalk) {
        //return;
      }

      //钉钉内登录
      const dingCode = await dingGetCode(Dingtalk.CORP_ID);
      const authRes = await auth(dingCode.code, Dingtalk.AGENT_ID);
      if (authRes.code !== 200) {
        return;
      }

      //加载登录用户信息
      setAuthInfo(
        authRes.data.user_id,
        authRes.data.user_name,
        authRes.data.role,
        authRes.data.token
      );
    };

    window.login();
  }, [handleVisibilityChange, setAuthInfo]);

  useEffect(() => {
    if (process.env.BUILD_TYPE === Mode.DEVELOPMENT) {
      insertDebugScript();
      dingSetRight(true, true, '开启调试', async () => {
        const res = await dingPrompt('请输入调试UUID', '调试', '', [
          '取消',
          '开启调试'
        ]);
        if (!res || !res.buttonIndex || !res.value) {
          return;
        }

        enableDebug(res.value);
      });
    }
  }, []);

  return (
    <PotentialError>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter basename={PUBLIC_PATH}>
          <NarBar />
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </PotentialError>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
