import useDocumentTitle from '@src/hooks/useDoucumentTitle';
import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { handleLogin } from '@src/api';
import Cookies from 'js-cookie';

export default function Login(): JSX.Element {
  useDocumentTitle('雾里-登陆');

  const onFinish = async (values: any) => {
    const res = await handleLogin(values);
    if (res.data.username) {
      message.success('登陆成功');
      Cookies.set('token', res.data.token); //设置cookie
      setTimeout(() => {
        window.location.href = '/home';
      }, 2000); //延时跳转首页
    } else {
      message.error('用户名或者密码错误');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    const a = [
      {
        formType: 'receipt',
        formUuid: 'FORM-YU966T91ZKZXYP645LRQI6VU05CZ1SPD1YOZK0',
        instanceId: 'FINST-SN96697180ZXFDWX0840W6V5OXIU3YPW3YOZKYS4',
        subTitle: '',
        appType: 'APP_WE8PVBQ0NSCNVUBBLLIN',
        title: '会议调整'
      }
    ];
    console.log(a[0].title);
  });

  return (
    <div className="bg">
      <Form
        className="basic"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入您的用户名！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入您的密码！' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登陆
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
