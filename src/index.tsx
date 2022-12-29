import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import { Layout, Menu } from 'antd';
import './styles/index.scss';
import { Icon } from './assets/svg/picture';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import routes from './Routes';
import 'antd/dist/antd.css';
import NotFound from '@pages/404/Index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from '@src/redux/reducer';

const store = createStore(reducer);
const { Header, Content, Footer } = Layout;
export function App(): JSX.Element {
  const [token, setToken] = useState(); //登录态
  const [user, setUser] = useState(); // 登陆角色
  const [current, setCurrent] = useState('/home'); //选中菜单

  //验证
  const verifyToken = async (auth: string) => {
    // const res = await verify({ token: auth });
    // if (res.data) {
    //   setToken(auth);
    //   setUser(res.data);
    // } else {
    //   Cookies.remove('token');
    // }
  };

  const handleClick = (e: any) => {
    setCurrent(e.key);
  };

  //初始化
  useEffect(() => {
    const auth = Cookies.get('token');
    if (auth) {
      verifyToken(auth);
    }
  }, [token]);
  return (
    <Layout className="layout">
      <BrowserRouter>
        <Header className="header">
          <div className="logo">
            <Icon />
            <span className="title">Fog Hits Hoshino</span>
          </div>
          <Menu
            className="menu"
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <Menu.Item
              key="/home"
              className={current === '/home' ? 'active' : 'normal'}
            >
              HOME
            </Menu.Item>
            <Menu.Item
              key="/about"
              className={current === '/about' ? 'active' : 'normal'}
            >
              ABOUT
            </Menu.Item>
            <Menu.Item
              key="/boke"
              className={current === '/boke' ? 'active' : 'normal'}
            >
              BOKE
            </Menu.Item>
            <Menu.Item
              key="/plan"
              className={current === '/plan' ? 'active' : 'normal'}
            >
              PLAN
            </Menu.Item>
            <Menu.Item
              key="/guide"
              className={current === '/guide' ? 'active' : 'normal'}
            >
              GUIDE
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="content">
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  exact
                  key={index}
                  path={route.path}
                  component={route.component}
                >
                  {route.redirect ? (
                    <Redirect to={route.redirect}></Redirect>
                  ) : null}
                </Route>
              );
            })}
            <Route component={NotFound} />
          </Switch>
        </Content>
      </BrowserRouter>
      <Footer className="footer">忘川书@2022</Footer>
    </Layout>
  );
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
