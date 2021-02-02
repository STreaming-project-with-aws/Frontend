import React from 'react';
import 'antd/dist/antd.css';
import styles from './Login.module.css' ;
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const Login = () => {

    let history = useHistory();

  const onFinish = values => {
    console.log('Received values of form: ', values);

    axios.post('http://localhost:8080/twitchsl/v1/login', {
        username: values.username,
        password: values.password
    }).then(response => {
        console.log(response)
        localStorage.setItem(
            "token" , response.data.token
        )
        localStorage.setItem(
            "user" , values.username
        )
    })

    if(localStorage.getItem("token") != null) {
        history.push({
        pathname: '/landing',
    })       
    }
    // history.push({
    //     pathname: '',
    // })
  };

  return (
      <div className={styles.tile}>
    <Form
      name="normal_login"
      className={styles.loginform}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className={styles.siteformitemicon} />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className={styles.siteformitemicon} />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className={styles.loginformforgot} href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.loginformbutton}>
          Log in
        </Button>
        Or <a href="/register" style={{color: 'white'}}>register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Login;