import React from 'react';
import { Layout } from '../layouts/Layout';

const attendanceSummary = {
  present: 20,
  absent: 3,
  late: 1,
};

export const TeacherAttendance: React.FC = () => {
  return (
    <Layout title="Attendance (View Only)">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-semibold">Present</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{attendanceSummary.present}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold">Absent</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{attendanceSummary.absent}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 font-semibold">Late</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{attendanceSummary.late}</p>
        </div>
      </div>
    </Layout>
  );
};
