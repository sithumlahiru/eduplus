import React from 'react';
import { Layout } from '../layouts/Layout';

const mockClasses = [
  { id: '1', name: 'Class A', teacher: 'Mrs. Herath', enrolled: 15, capacity: 20 },
  { id: '2', name: 'Class B', teacher: 'Mrs. Fernandez', enrolled: 18, capacity: 20 },
];

export const TeacherClasses: React.FC = () => {
  return (
    <Layout title="Classes (View Only)">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockClasses.map((c) => (
          <div key={c.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold">{c.name}</h3>
            <p className="text-sm text-gray-600">Teacher: {c.teacher}</p>
            <p className="mt-3 font-semibold">Enrollment: {c.enrolled}/{c.capacity}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
};
