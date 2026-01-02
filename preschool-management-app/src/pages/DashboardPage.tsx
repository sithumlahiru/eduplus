import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { useAuthStore } from '../store';

interface StatCard {
  icon: string;
  label: string;
  value: string | number;
  change?: string;
}

export const DashboardPage: React.FC = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(intervalId);
  }, []);

  const headerDateTime = useMemo(() => {
    const formatted = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(now);
    return formatted;
  }, [now]);

  const stats = {
    totalStudents: 156,
    totalClasses: 8,
    totalTeachers: 12,
    attendanceRate: '92%',
    pendingFees: 25,
    enrollmentThisMonth: 12,
  };

  const { user } = useAuthStore();
  const navigate = useNavigate();

  const statCards: StatCard[] = [
    {
      icon: 'fa-solid fa-user-graduate',
      label: 'Total Students',
      value: stats.totalStudents,
      change: '+12 this month',
    },
    {
      icon: 'fa-solid fa-book',
      label: 'Active Classes',
      value: stats.totalClasses,
      change: 'All running',
    },
    {
      icon: 'fa-solid fa-calendar-check',
      label: 'Attendance Rate',
      value: stats.attendanceRate,
      change: '+2% from last week',
    },
    {
      icon: 'fa-solid fa-coins',
      label: 'Pending Fees',
      value: stats.pendingFees,
      change: 'Due this month',
    },
  ];

  return (
    <Layout title="Dashboard" headerRight={headerDateTime}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-blue-100">
            Here's what's happening at your preschool today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <i className={`${card.icon} text-4xl`}></i>
                <span className="text-green-500 text-sm font-semibold flex items-center">
                  <i className="fa-solid fa-chart-line mr-1" /> {card.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-2">{card.label}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { action: 'New enrollment', name: 'Amara Silva', time: '2 hours ago' },
                { action: 'Attendance marked', name: 'Class A (15 students)', time: '4 hours ago' },
                { action: 'Fee paid', name: 'Ravi Kumar', time: 'Today' },
                { action: 'New announcement', name: 'School closed tomorrow', time: 'Yesterday' },
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.name}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => navigate('/students')} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                Add New Student
              </button>
              <button onClick={() => navigate('/attendance')} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                Mark Attendance
              </button>
              <button onClick={() => navigate('/announcements')} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                Send Announcement
              </button>
              <button onClick={() => navigate('/fees')} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200">
                View Fee Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
