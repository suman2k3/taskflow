import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-bold">TaskFlow</h2>
        <p className="text-gray-400 text-sm mt-1">Project Management</p>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-3 font-medium"
        >
          <span className="text-xl">📊</span>
          Dashboard
        </button>
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-3"
          >
            <span className="text-xl">⚙️</span>
            Admin Panel
          </button>
        )}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-400">Logged in as</p>
          <p className="text-white font-medium">{user?.name}</p>
          <p className="text-gray-400 text-sm">{user?.email}</p>
          <p className="text-gray-500 text-xs mt-2 uppercase">{user?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
