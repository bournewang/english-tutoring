import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">Dashboard</h1>
          <ul>
            <li className="mb-2">
              <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-200">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/profile" className="block p-2 rounded hover:bg-gray-200">
                Profile
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/courses" className="block p-2 rounded hover:bg-gray-200">
                Courses
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/billing" className="block p-2 rounded hover:bg-gray-200">
                Billing
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-700">Here you can manage your profile, courses, and billing information.</p>
        {/* Add more content or components here */}
      </main>
    </div>
  );
};

export default Dashboard; 