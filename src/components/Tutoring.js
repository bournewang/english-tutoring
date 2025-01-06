// src/components/Tutoring.js
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from './Header.js';
import ChatHistory from './ChatHistory.js';
import Lesson from './Lesson.js';
import { connectToWebsocket, disconnectFromWebsocket, handleMicToggle } from '../js/main.js';
import { useUser } from '../context/UserContext.js';
import { getLessonById } from '../api/lessons.js';

const Tutoring = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Tutor', message: 'Hello! How can I help you today?' },
    { id: 2, sender: 'Student', message: 'I want to improve my speaking skills.' },
  ]);
// 
  const [searchParams] = useSearchParams();
  let lessonId = searchParams.get('lessonId');
  console.log("lesson id from query params: ", lessonId);
  const {user} = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    console.log("lesson id from query params: ", lessonId);
    if (!lessonId) {
        lessonId = user.current_lesson_id;
        console.log("lesson id from user: ", lessonId);
    }
    if (lessonId) {
        getLessonById(lessonId).then(setLesson);
    }
  }, [lessonId]);

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
      <div className="">
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
          
          <div className="flex-grow mb-4 overflow-y-auto border-t border-gray-300 rounded-lg p-4">
            {lesson ? <Lesson lesson={lesson} /> : 
            <div className='flex justify-center items-center h-full'>
              {/* <h1 className='text-2xl font-bold'>Free Talk</h1> */}
            <div className="flex flex-col space-y-4">
              <p className="">Free talk, or choose a <Link className='text-blue-500' to="/courses">Courses</Link></p>
              
            </div>
            </div>
            }
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

export default Tutoring;