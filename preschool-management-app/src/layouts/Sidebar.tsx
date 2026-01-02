import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: 'fa-solid fa-chart-pie' },
  { label: 'Students', path: '/students', icon: 'fa-solid fa-user-graduate' },
  { label: 'Parents', path: '/parents', icon: 'fa-solid fa-user-group' },
  { label: 'Classes', path: '/classes', icon: 'fa-solid fa-book' },
  { label: 'Attendance', path: '/attendance', icon: 'fa-solid fa-calendar-check' },
  { label: 'Fees', path: '/fees', icon: 'fa-solid fa-coins' },
  { label: 'Announcements', path: '/announcements', icon: 'fa-solid fa-bullhorn' },
];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (user?.role === 'teacher') {
    return (
      <div className="flex flex-col h-screen bg-gray-900 text-white w-full md:w-64">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold"><i className="fa-solid fa-chalkboard-teacher mr-2" />EduPlus</h1>
        </div>
        <nav className="flex-1 p-4">
          <Link to="/teacher/dashboard" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-chart-pie mr-2" />Dashboard</span>
          </Link>
          <Link to="/teacher/students" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-user-graduate mr-2" />Students</span>
          </Link>
          <Link to="/teacher/classes" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-book mr-2" />Classes</span>
          </Link>
          <Link to="/teacher/attendance" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-calendar-check mr-2" />Attendance</span>
          </Link>
          <Link to="/teacher/announcements" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-bullhorn mr-2" />Announcements</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm mb-4">Logged in as: {user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <i className="fa-solid fa-right-from-bracket mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  if (user?.role === 'parent') {
    return (
      <div className="flex flex-col h-screen bg-gray-900 text-white w-full md:w-64">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold"><i className="fa-solid fa-graduation-cap mr-2" />EduPlus</h1>
        </div>
        <nav className="flex-1 p-4">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-chart-pie mr-2" />My Dashboard</span>
          </Link>
          <Link to="/my-children" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-child mr-2" />My Children</span>
          </Link>
          <Link to="/attendance" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-calendar-check mr-2" />Attendance</span>
          </Link>
          <Link to="/announcements" className="block p-2 rounded hover:bg-gray-800 mb-2">
            <span><i className="fa-solid fa-bullhorn mr-2" />Announcements</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm mb-4">Logged in as: {user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            <i className="fa-solid fa-right-from-bracket mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded text-2xl"
      >
        <i className={isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition duration-200 ease-in-out z-40 w-64 bg-gray-900 text-white flex flex-col`}
      >
          <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold"><i className="fa-solid fa-graduation-cap mr-2" />EduPlus</h1>
          <p className="text-sm text-gray-400 mt-1">Preschool Manager</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center p-3 rounded hover:bg-gray-800 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <i className={`${(item as any).icon} mr-3 text-xl`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link
            to="/settings"
            className="flex items-center p-2 rounded hover:bg-gray-800 mb-4"
          >
            <i className="fa-solid fa-cog mr-2 text-xl" />
            Settings
          </Link>
          <div className="text-xs text-gray-400 mb-3 break-words">{user?.email}</div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center justify-center text-sm"
          >
            <i className="fa-solid fa-right-from-bracket mr-2" />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export const Header: React.FC<{ title?: string }> = ({ title = 'Dashboard' }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};
