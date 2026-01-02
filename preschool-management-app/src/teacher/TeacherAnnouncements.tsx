import React from 'react';
import { Layout } from '../layouts/Layout';
import { formatDistanceToNow } from 'date-fns';

const mockAnnouncements = [
  { id: '1', title: 'School Closed Tomorrow', content: 'Holiday', createdAt: new Date().toISOString(), createdBy: 'Admin', target: 'all' },
  { id: '2', title: 'Meeting', content: 'PTM', createdAt: new Date().toISOString(), createdBy: 'Mrs Herath', target: 'parents' },
];

export const TeacherAnnouncements: React.FC = () => {
  return (
    <Layout title="Announcements (View Only)">
      <div className="space-y-4">
        {mockAnnouncements.map((a) => (
          <div key={a.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold">{a.title}</h3>
            <p className="text-sm text-gray-500">{a.createdBy} • {formatDistanceToNow(new Date(a.createdAt), { addSuffix: true })}</p>
            <p className="mt-3 text-gray-700">{a.content}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};
