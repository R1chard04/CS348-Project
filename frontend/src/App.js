import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/').then(response => response.json())
      .then(data => {console.log(data); setMessage(data.msg);})
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>HELLO</h1>
        <h1>{message}</h1>
      </header>
    </div>
  );
}

export default App;
