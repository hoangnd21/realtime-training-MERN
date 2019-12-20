import React, { useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import {
  Input,
  Row,
  Col,
  Form,
} from 'antd'
import openSocket from 'socket.io-client';
import Login from './Login'

document.title = 'Chatbox'

const socket = openSocket('http://localhost:8000');

const App = props => {

  const [currentUser, setCurrentUser] = useState(null)
  const [userMessage, setUserMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

  const sendMessage = e => {
    e.preventDefault()
    props.form.validateFields(err => {
      if (err) {
        return;
      }
      socket.emit('react_message', e.target.value);
      setUserMessage(e.target.value)
      // socket.on('recieve', function (msg) {
      //   setReceivedMessage(msg)
      // })
      replyMessage()
    });
    props.form.resetFields();
  }

  const replyMessage = () => {
    socket.on('recieve', function (msg) {
      setReceivedMessage(msg)
    })
  }

  const login = data => {
    // do login stuff here
    axios({
      url: '/login',
      method: 'post',
      headers: {
        "charset": "UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
      data: {
        name: data.name,
        password: data.password
      }
    })
      .then(res => {
        if (res.data !== 'Invalid login. Please try again!') {
          this.setState({
            loginModal: false,
            currentUser: res.data,
            loading: false
          })
        } else {
          this.setState({
            loginModal: true,
            loginError: res.data,
            loading: false
          })
        }
      })
  }

  const { getFieldDecorator } = props.form

  return (
    !currentUser ?
      <div style={{ width: '50%', margin: 20, padding: 20, border: '1px solid #34558B', borderRadius: 5 }}>
        <Login login={login} />
      </div>
      :
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Our Chatbox App
      </header>
        <Row style={{ margin: 10, padding: 10, border: '1px solid #34558B', borderRadius: 5 }}>
          <Col xl={6}>
            nav
        </Col>
          <Col xl={12} style={{ borderRight: '1px solid #34558B', borderLeft: '1px solid #34558B', padding: 10 }}>
            <div style={{ minHeight: '55vh' }}>
              {receivedMessage ? <div className='received-message'>
                message from backend: {receivedMessage}
              </div> : null}
              {userMessage ?
                <div className='user-message'>
                  user typed in: {userMessage}
                </div>
                : null}
            </div>
            <Form style={{ verticalAlign: 'bottom', margin: '0 1em', textAlign: 'left' }} layout='inline'>
              <Form.Item>
                {getFieldDecorator('message')(<Input onPressEnter={sendMessage} placeholder='Enter something...' />)}
              </Form.Item>
            </Form>
          </Col>
          <Col xl={6}>
            nav
        </Col>
        </Row>
      </div>
  );
}

const FApp = Form.create({ name: 'message' })(App);
export default FApp;
