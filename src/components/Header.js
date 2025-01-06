import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Import an icon from react-icons

const Header = () => {
  return (
    <header className="flex justify-between items-center p-2 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Tutoring Page</h1>
      <Link to="/dashboard" className="flex items-center">
        <FaHome className="mr-2" />
        <span>Dashboard</span>
      </Link>
    </header>
  );
};

export default Header; 