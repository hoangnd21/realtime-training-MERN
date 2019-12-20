import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Input,
  Row,
  Col,
  Form,
} from 'antd'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

const App = props => {

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

  const { getFieldDecorator } = props.form

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Row style={{ margin: 10, padding: 10, border: '1px solid #34558B', borderRadius: 5 }}>
        <Col xl={6}>
          nav
        </Col>
        <Col xl={12} style={{ borderRight: '1px solid #34558B', borderLeft: '1px solid #34558B', padding: 10 }}>
          <div style={{ minHeight: '55vh' }}>
            {receivedMessage ? <div className='received-message'>
              {receivedMessage}
            </div> : null}
            {userMessage ? <div className='user-message'>
              {userMessage}
            </div> : null}
          </div>
          <Form style={{ verticalAlign: 'bottom', margin: '0 1em' }}>
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
