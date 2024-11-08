import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const Chat = ({ onInputReceived }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prev) => [...prev, { sender: 'server', text: message.text }]);
    });

    // Receive calculation data and pass it to App
    socket.on('calculation', (data) => {
      console.log('Calculation data received from server:', data);  // Debugging log
      onInputReceived(data);
    });

    return () => {
      socket.off('message');
      socket.off('calculation');
    };
  }, [onInputReceived]);

  const handleSend = () => {
    if (input) {
      socket.emit('response', input);
      setMessages((prev) => [...prev, { sender: 'user', text: input }]);
      setInput('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold mb-4">Chat</h3>
      <div className="flex-1 overflow-y-auto mb-4 p-2 border rounded bg-white">
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <strong>{msg.sender === 'user' ? 'You: ' : 'Server: '}</strong>
            {msg.text}
          </p>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 border rounded focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
