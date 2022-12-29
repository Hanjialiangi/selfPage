import Cookies from 'js-cookie';
import Home from '@pages/home/Index';
import Login from '@pages/login/Index';

const token = Cookies.get('token');
let routes: Array<any> = [];
if (token) {
  routes = [
    {
      path: '/',
      redirect: '/home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '*',
      redirect: '/home',
      component: Home
    }
  ];
} else {
  routes = [
    {
      path: '/',
      redirect: '/login',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      redirect: '/login',
      component: Login
    }
  ];
}

export default routes;
