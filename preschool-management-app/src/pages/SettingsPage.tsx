import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';
import { useAuthStore } from '../store';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    preschoolName: 'EduPlus Preschool',
    email: user?.email || '',
    phone: '+94-701234567',
    address: '123 Main Street, Colombo',
    city: 'Colombo',
    principalName: 'Mr. Rajapaksa',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Settings updated:', formData);
    alert('Settings updated successfully!');
  };

  return (
    <Layout title="Settings">
      <div className="max-w-2xl">
        <div className="bg-white rounded-lg shadow p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preschool Settings</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preschool Name
                </label>
                <input
                  type="text"
                  value={formData.preschoolName}
                  onChange={(e) => setFormData({ ...formData, preschoolName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Name
                </label>
                <input
                  type="text"
                  value={formData.principalName}
                  onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-medium transition duration-200"
              >
                Save Settings
              </button>
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 px-6 rounded-lg font-medium transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
