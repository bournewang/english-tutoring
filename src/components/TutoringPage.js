// src/components/TutoringPage.js
import React, { useState } from 'react';
import Header from './Header';
import ChatHistory from './ChatHistory';
import CourseContent from './CourseContent';
import { connectToWebsocket, disconnectFromWebsocket, handleMicToggle } from '../js/main.js';

const TutoringPage = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Tutor', message: 'Hello! How can I help you today?' },
    { id: 2, sender: 'Student', message: 'I want to improve my speaking skills.' },
    { id: 3, sender: 'Tutor', message: 'Great! Let’s start with some basic exercises.' },
    { id: 4, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 5, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 6, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 7, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 8, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 9, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 10, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 11, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 12, sender: 'Student', message: 'Sure, I’m ready!' },
    { id: 13, sender: 'Student', message: 'Sure, I’m ready!' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      const newChatMessage = {
        id: chatMessages.length + 1,
        sender: 'Student',
        message: newMessage,
      };
      setChatMessages([...chatMessages, newChatMessage]);
      setNewMessage('');
    }
  };

  const startHandler = () => {
    connectToWebsocket();
    setIsConnected(true);
  }

  const endHandler = () => {
    disconnectFromWebsocket();
    setIsConnected(false);
  }

  const micHandler = () => {
    handleMicToggle();
    setMicOn(!micOn);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="h-12">
        <Header />
      </div>
      <div className="flex-grow flex p-4 bg-gray-100 overflow-y-auto">
        <div className="w-2/3 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Tutoring Session</h1>
          <div className="flex justify-center items-center mb-4">
            <img src={`${process.env.PUBLIC_URL}/images/teacher.jpg`} alt="Teacher" className="w-32 h-32 object-cover rounded-full mr-4" />
            <div className="flex flex-col space-y-2">
              {isConnected ? 
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={endHandler}>End</button> 
                : 
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={startHandler}>Start</button>
              }
              <button className={`px-4 py-2 rounded ${micOn ? 'bg-red-500 text-white' : 'bg-gray-300'}`} onClick={micHandler}>
                {micOn ? 'Mic Off' : 'Mic On'}
              </button>
            </div>
          </div>
          <div className="flex-grow mb-4 overflow-y-auto">
            <CourseContent />
          </div>
        </div>
        <div className="w-1/3 h-full ml-4 flex flex-col">
          <div className="flex-grow overflow-y-scroll">
            <ChatHistory chatMessages={chatMessages} />
          </div>
          <div className="mt-auto h-16 flex items-center mt-4">
            <input
              type="text"
              className="border p-2 flex-grow"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded ml-2"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutoringPage;