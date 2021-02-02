import React, {useState} from 'react';
import 'antd/dist/antd.css';
import styles from './BeginStream.module.css' ;
import { Form, Input, Button, Checkbox, notification  } from 'antd';
import { UserOutlined, LockOutlined, StepForwardOutlined, PictureOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Radio } from 'antd';
import { Select } from 'antd';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const { Option } = Select;

const BeginStream = () => {

    const [value, setValue] = useState('game');
    const [game, SetGame] = useState('');
    const [StreamKey, Setstreamkey] = useState('https://3e78de676721.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.076677838612.channel.mDIQL4B6xZre.m3u8')
    const [Onclip, Setonclip] = useState(false)

    let history = useHistory();

    const onChange = e => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };

      function onChangeselect(value) {
        console.log(`selected ${value}`);
        SetGame(value)
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }

  const onFinish = values => {
    console.log('Received values of form: ', values);

    axios.post('http://localhost:8080/twitchsl/v1/setstream', {
        usersName: localStorage.getItem("user"),
        streamName: values.StreamTitle,
        type: values.Type,
        game: values.Game,
        date: moment().format('LTS'),
        photoUrl: values.Picture,
        key: 'https://3e78de676721.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.076677838612.channel.mDIQL4B6xZre.m3u8'
    }).then(response => {
        console.log(response)
        localStorage.setItem(
            "token" , response.data.token
        )
        localStorage.setItem(
            "user" , values.username
        )
    })

    /* if(localStorage.getItem("token") != null) {
        history.push({
        pathname: '/landing',
    })       
    } */
    // history.push({
    //     pathname: '',
    // })
    openNotification()
  };

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
    // if(localStorage.getItem("token") != null) {
      history.push({
      pathname: '/landing',
  })
// }
  };
  
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      
<div>
<CopyToClipboard text={StreamKey}
onCopy={() => Setonclip(true)}>
<Button type="primary" size="small" onClick={() => notification.close(key)}>
        Get
      </Button>
</CopyToClipboard>

{Onclip ? <span style={{color: 'red',fontFamily: 'Barlow'}}>Copied</span> : null}
</div>
    );
    notification.open({
      message: 'Here\'s your key',
      description:
        'Use this key to stream on OBS Studio.',
      btn,
      key,
      onClose: close,
    });
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
        name="StreamTitle"
        rules={[
          {
            required: true,
            message: 'Please input your Stream Name!',
          },
        ]}
      >
        <Input prefix={<StepForwardOutlined className={styles.siteformitemicon} />} placeholder="Stream Name" />
      </Form.Item>
      
      <Form.Item>
      <Form.Item
      name="Type">
      <Radio.Group onChange={onChange} value={value}>
      <Radio value={'game'}>Game</Radio>
      <Radio value={'other'}>Other</Radio>
    </Radio.Group>
    </Form.Item>


    <Form.Item
      name="Game">
{value == 'game' ? 
    <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a game"
    optionFilterProp="children"
    onChange={onChangeselect}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="call of duty warzone">Call of Duty Warzone</Option>
    <Option value="pubg">PUBG</Option>
    <Option value="apex legends">Apex Legends</Option>
  </Select>
  :
  <Select
    disabled
    showSearch
    style={{ width: 200 }}
    placeholder="Select a game"
    optionFilterProp="children"
    onChange={onChangeselect}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    <Option value="call of duty warzone">Call of Duty Warzone</Option>
    <Option value="pubg">PUBG</Option>
    <Option value="apex legends">Apex Legends</Option>
  </Select>
}
</Form.Item>
</Form.Item>


      <Form.Item
        name="Picture"
        rules={[
          {
            required: true,
            message: 'Please input your Url!',
          },
        ]}
      >
        <Input
          prefix={<PictureOutlined className={styles.siteformitemicon} />}
          placeholder="Url of stream photo"
        />
      </Form.Item>
     {/*  <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className={styles.loginformforgot} href="">
          Forgot password
        </a>
      </Form.Item> */}

      <Form.Item>
        <Button htmlType="submit" className={styles.loginformbutton}>
          Get a Key
        </Button>
        {/* Or <a href="/register" style={{color: 'white'}}>register now!</a> */}
      </Form.Item>

      
    </Form>
    </div>
  );
};

export default BeginStream;