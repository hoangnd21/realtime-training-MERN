import React from 'react';
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

const App = (props) => {

  const sendMessage = e => {
    e.preventDefault()
    props.form.validateFields(err => {
      if (err) {
        return;
      }
      socket.emit('react_message', e.target.value);
      socket.on('recieve', function (msg) {
        console.log('message: ' + msg);
      })
    });
    props.form.resetFields();
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
          <p style={{ textAlign: 'left', minHeight: '55vh' }}>
            chatbox<br />
          </p>
          <Form style={{ verticalAlign: 'bottom', marginBottom: 0 }}>
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
