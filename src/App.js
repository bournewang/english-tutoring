// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TutoringPage from './components/TutoringPage';
// Import other components like Register, Login, Dashboard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tutoring" />} />
        <Route path="/tutoring" element={<TutoringPage />} />
        {/* Define other routes for Register, Login, Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;