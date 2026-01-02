import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';

export const AttendancePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('all');
  const [attendance, setAttendance] = useState<{ [key: string]: 'present' | 'absent' | 'late' }>({});

  const mockStudents = [
    { id: '1', name: 'Amara Silva', class: 'Class A' },
    { id: '2', name: 'Ravi Kumar', class: 'Class A' },
    { id: '3', name: 'Priya Patel', class: 'Class B' },
    { id: '4', name: 'Asha Sharma', class: 'Class B' },
    { id: '5', name: 'Vihaan Singh', class: 'Class C' },
  ];

  const filteredStudents = selectedClass === 'all'
    ? mockStudents
    : mockStudents.filter(s => s.class === selectedClass);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const handleSubmit = () => {
    console.log('Attendance submitted:', { date: selectedDate, attendance });
    alert('Attendance marked successfully!');
  };

  const presentCount = Object.values(attendance).filter(s => s === 'present').length;
  const absentCount = Object.values(attendance).filter(s => s === 'absent').length;
  const lateCount = Object.values(attendance).filter(s => s === 'late').length;

  return (
    <Layout title="Attendance Management">
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Classes</option>
                <option value="Class A">Class A (Age 2-3)</option>
                <option value="Class B">Class B (Age 3-4)</option>
                <option value="Class C">Class C (Age 4-5)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
              >
                Save Attendance
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-semibold">Present</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{presentCount}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-semibold">Absent</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{absentCount}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 font-semibold">Late</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{lateCount}</p>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  <i className="fa-solid fa-check-circle text-green-600 mr-1" /> Present
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  <i className="fa-solid fa-times-circle text-red-600 mr-1" /> Absent
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                  <i className="fa-solid fa-clock text-yellow-600 mr-1" /> Late
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition duration-200 ${
                        attendance[student.id] === 'present'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-green-50'
                      }`}
                    >
                      <i className="fa-solid fa-check" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition duration-200 ${
                        attendance[student.id] === 'absent'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-red-50'
                      }`}
                    >
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'late')}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition duration-200 ${
                        attendance[student.id] === 'late'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-yellow-50'
                      }`}
                    >
                      <i className="fa-solid fa-clock" />
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
