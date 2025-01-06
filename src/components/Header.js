import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { setUser, setToken } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('User logged out');
        setUser(null);
        setToken(null);

        navigate('/login');
    };

    return (
        <header className="flex justify-between items-center p-2 bg-blue-600 text-white relative">
            <h1 className="text-xl font-bold">Tutoring Page</h1>
            <div
                className="relative"
                onMouseEnter={() => setMenuVisible(true)}
            >
                <div className="flex items-center cursor-pointer">
                    <FaHome className="mr-2" />
                    <span>Dashboard</span>
                </div>
                {menuVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded z-10">
                        <ul>
                            {/* should be a link to /profile */}
                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/profile')}>Profile</li>
                            {/* add other links here */}
                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/courses')}>Courses</li>
                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => navigate('/billing')}>Billings</li>

                            <li className="p-2 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 