import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Input,
  Row,
  Col,
} from 'antd'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function App() {

  const [defaultMessage, setDefaultMessage] = useState(null)
  const sendMessage = e => {
    socket.emit('react_message', e.target.value);
    socket.on('recieve', function (msg) {
      console.log('message: ' + msg);
    })
    setDefaultMessage(null)
  }

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
          <div style={{ verticalAlign: 'bottom' }}>
            <Input onPressEnter={sendMessage} placeholder='Enter something...' />
          </div>
        </Col>
        <Col xl={6}>
          nav
        </Col>
      </Row>
    </div>
  );
}

export default App;
