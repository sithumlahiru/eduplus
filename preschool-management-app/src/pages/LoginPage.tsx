import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = (demoEmail: string, role: 'admin' | 'teacher' | 'parent') => {
    const demoUser = {
      id: '1',
      name: role === 'admin' ? 'Admin' : role === 'teacher' ? 'Mrs. Herath' : 'Mr. Silva',
      email: demoEmail,
      role,
    };
    useAuthStore.setState({ user: demoUser, token: 'demo-token-' + role });
    localStorage.setItem('user', JSON.stringify(demoUser));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">EduPlus</h1>
            <p className="text-gray-600">Preschool Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center font-bold mb-3">Demo Quick Login:</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => quickLogin('admin@example.com', 'admin')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm font-medium"
              >
                <i className="fa-solid fa-shield mr-2" />Admin
              </button>
              <button
                type="button"
                onClick={() => quickLogin('teacher@example.com', 'teacher')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm font-medium"
              >
                <i className="fa-solid fa-chalkboard-teacher mr-2" />Teacher
              </button>
              <button
                type="button"
                onClick={() => quickLogin('parent@example.com', 'parent')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm font-medium"
              >
                <i className="fa-solid fa-user mr-2" />Parent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
