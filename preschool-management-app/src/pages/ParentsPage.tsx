import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';

export const ParentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockParents = [
    {
      id: '1',
      name: 'Mr. Silva',
      email: 'silva@example.com',
      phone: '+94-701234567',
      children: ['Amara Silva'],
      address: '123 Main St, Colombo',
    },
    {
      id: '2',
      name: 'Mr. Kumar',
      email: 'kumar@example.com',
      phone: '+94-702234567',
      children: ['Ravi Kumar'],
      address: '456 Oak Ave, Kandy',
    },
    {
      id: '3',
      name: 'Mr. Patel',
      email: 'patel@example.com',
      phone: '+94-703234567',
      children: ['Priya Patel'],
      address: '789 Pine Rd, Galle',
    },
  ];

  const filteredParents = mockParents.filter(
    (parent) =>
      parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout title="Parent Management">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search parents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center md:justify-start gap-2 transition duration-200">
            <i className="fa-solid fa-plus" />
            Add Parent
          </button>
        </div>

        {/* Parents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParents.map((parent) => (
            <div
              key={parent.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{parent.name}</h3>
                  <p className="text-sm text-gray-600">{parent.phone}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <i className="fa-solid fa-pen" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 uppercase">Email</p>
                  <p className="text-sm text-gray-900 break-words">{parent.email}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase">Address</p>
                  <p className="text-sm text-gray-900">{parent.address}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 uppercase">Children</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {parent.children.map((child, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {child}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredParents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No parents found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
