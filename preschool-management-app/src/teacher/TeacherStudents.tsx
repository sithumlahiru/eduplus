import React from 'react';
import { Layout } from '../layouts/Layout';

const mockStudents = [
  { id: '1', name: 'Amara Silva', class: 'Class A', dob: '2020-05-15' },
  { id: '2', name: 'Ravi Kumar', class: 'Class A', dob: '2020-08-22' },
  { id: '3', name: 'Priya Patel', class: 'Class B', dob: '2020-03-10' },
];

export const TeacherStudents: React.FC = () => {
  return (
    <Layout title="Students (View Only)">
      <div className="space-y-4">
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">DOB</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{s.name}</td>
                  <td className="px-6 py-4">{s.dob}</td>
                  <td className="px-6 py-4">{s.class}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};
