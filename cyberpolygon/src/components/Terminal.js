import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import '../styles/Terminal.css';
import API from '../api'; // Импортируем единый API

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const terminal = useRef(null);
  const socketRef = useRef(null);
  const [status, setStatus] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // URL для WebSocket
  const wsUrl = API.client.getWsUrl('/cyberpolygon/api/v1/ssh/');

  useEffect(() => {
    terminal.current = new Terminal();
    terminal.current.open(terminalRef.current);

    // Подключение к WebSocket
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.output) {
        terminal.current.write(data.output);
      }
      if (data.error) {
        setStatus(`Ошибка: ${data.error}`);
      }
      if (data.status) {
        setStatus(data.status);
      }
    };

    socketRef.current.onopen = () => {
      setStatus('Подключено');
    };

    socketRef.current.onclose = () => {
      setStatus('Отключено');
    };

    socketRef.current.onerror = (error) => {
      setStatus(`Ошибка: ${error.message}`);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [wsUrl]);

  const sendCommand = (command, username, password) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ 
        command, 
        username, 
        password, 
      }));
    }
  };

  const handleClick = async (event) => {
    event.preventDefault();
    const name = event.target.name;
    
    try {
      const data = await API.client.post(`/vagrant/${name}`, {
        task: "task1",
        username: localStorage.getItem('username') || "admin"
      });
      
      setStatus(name);
      setUsername(data.username);
      setPassword(data.password);
    } catch (error) {
      console.error('Ошибка:', error);
      terminal.current.write('\r\n\x1b[31mОшибка: ' + error.message + '\x1b[0m\r\n');
    }
  };

  return (
    <div className="terminal-container">
      <div ref={terminalRef} className="terminal-window" />
      <div className="buttons">
        <div className="vagrant-btn" id="start">
          <button name="start" onClick={handleClick}>Запустить</button>
        </div>
        <div className="vagrant-btn" id="reload">
          <button name="reload" onClick={handleClick}>Перезапустить</button>
        </div>
        <div className="vagrant-btn" id="stop">
          <button name="stop" onClick={handleClick}>Остановить</button>
        </div>
      </div>
      <div className="status">Статус: {status}</div>
    </div>
  );
};

export default TerminalComponent; 