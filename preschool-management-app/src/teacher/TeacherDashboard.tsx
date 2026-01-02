import React from 'react';
import { Layout } from '../layouts/Layout';
import { useAuthStore } from '../store';

export const TeacherDashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <Layout title="Teacher Dashboard">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
          <p className="text-sm text-gray-600">This is the read-only teacher portal. You can view students, classes, attendance and announcements.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Students</p>
            <p className="text-2xl font-bold">View only</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Classes</p>
            <p className="text-2xl font-bold">View only</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600">Attendance</p>
            <p className="text-2xl font-bold">View only</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
