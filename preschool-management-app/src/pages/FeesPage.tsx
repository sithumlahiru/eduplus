import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';

export const FeesPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');

  const mockFees = [
    {
      id: '1',
      studentName: 'Amara Silva',
      month: 'January 2024',
      amount: 5000,
      status: 'paid',
      dueDate: '2024-01-31',
      paidDate: '2024-01-25',
    },
    {
      id: '2',
      studentName: 'Ravi Kumar',
      month: 'January 2024',
      amount: 5000,
      status: 'pending',
      dueDate: '2024-01-31',
      paidDate: null,
    },
    {
      id: '3',
      studentName: 'Priya Patel',
      month: 'January 2024',
      amount: 5000,
      status: 'overdue',
      dueDate: '2024-01-31',
      paidDate: null,
    },
    {
      id: '4',
      studentName: 'Asha Sharma',
      month: 'January 2024',
      amount: 5000,
      status: 'paid',
      dueDate: '2024-01-31',
      paidDate: '2024-01-20',
    },
  ];

  const filteredFees = filterStatus === 'all'
    ? mockFees
    : mockFees.filter(f => f.status === filterStatus);

  const stats = {
    total: mockFees.reduce((sum, f) => sum + f.amount, 0),
    paid: mockFees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0),
    pending: mockFees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0),
    overdue: mockFees.filter(f => f.status === 'overdue').reduce((sum, f) => sum + f.amount, 0),
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold flex items-center gap-1"><i className="fa-solid fa-check-circle text-green-600 mr-1" />Paid</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">Pending</span>;
      case 'overdue':
        return <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-semibold flex items-center gap-1"><i className="fa-solid fa-triangle-exclamation text-red-600 mr-1" />Overdue</span>;
      default:
        return null;
    }
  };

  return (
    <Layout title="Fee Management">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">Rs. {stats.total.toLocaleString()}</p>
              </div>
              <i className="fa-solid fa-coins text-4xl" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-6 border border-green-200">
            <p className="text-green-800 text-sm font-semibold">Paid</p>
            <p className="text-3xl font-bold text-green-600">Rs. {stats.paid.toLocaleString()}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-6 border border-blue-200">
            <p className="text-blue-800 text-sm font-semibold">Pending</p>
            <p className="text-3xl font-bold text-blue-600">Rs. {stats.pending.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 rounded-lg shadow p-6 border border-red-200">
            <p className="text-red-800 text-sm font-semibold">Overdue</p>
            <p className="text-3xl font-bold text-red-600">Rs. {stats.overdue.toLocaleString()}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Status</h3>
          <div className="flex flex-wrap gap-2">
            {(['all', 'paid', 'pending', 'overdue'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 capitalize ${
                  filterStatus === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Fees Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Month</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 text-sm text-gray-900">{fee.studentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fee.month}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">Rs. {fee.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{fee.dueDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(fee.status)}</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      {fee.status === 'paid' ? 'View Receipt' : 'Request Payment'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
