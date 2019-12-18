import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [realtime, setRealtime] = useState(null)
  useEffect(() => {
    axios.get('')
      .then(res => {

      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p></p>
      </header>
    </div>
  );
}

export default App;
