// src/components/TutoringPage.js
import React, { useState } from 'react';
import ChatHistory from './ChatHistory';
import CourseContent from './CourseContent';

const TutoringPage = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Tutor', message: 'Hello! How can I help you today?' },
    { id: 2, sender: 'Student', message: 'I want to improve my speaking skills.' },
    { id: 3, sender: 'Tutor', message: 'Great! Let’s start with some basic exercises.' },
    { id: 4, sender: 'Student', message: 'Sure, I’m ready!' },
  ]);

  const [newMessage, setNewMessage] = useState('');

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

  return (
    <div className="flex h-screen p-4 bg-gray-100">
      <div className="flex-grow flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Tutoring Session</h1>
        <img src={`${process.env.PUBLIC_URL}/images/teacher.jpg`} alt="Teacher" className="mb-4 w-32 h-32 object-cover rounded-full" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2">Start</button>
        <div className="flex space-x-2 mb-4">
          <button className="bg-gray-300 px-4 py-2 rounded">Mic On/Off</button>
          <button className="bg-gray-300 px-4 py-2 rounded">Video On/Off</button>
        </div>
        <CourseContent />
      </div>
      <div className="w-1/3 ml-4 flex flex-col">
        <ChatHistory chatMessages={chatMessages} />
        <div className="mt-auto flex items-center">
          <input
            type="text"
            className="border p-2 flex-grow mb-2"
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
  );
};

export default TutoringPage;