import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';
import { useDataStore } from '../store';

interface StudentFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  enrollmentDate: string;
  classId: string;
  parentPhone: string;
  parentEmail: string;
}

export const StudentsPage: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    classId: '',
    parentPhone: '',
    parentEmail: '',
  });

  const mockStudents = [
    {
      id: '1',
      firstName: 'Amara',
      lastName: 'Silva',
      dateOfBirth: '2020-05-15',
      enrollmentDate: '2023-01-10',
      classId: 'class-1',
      status: 'active',
    },
    {
      id: '2',
      firstName: 'Ravi',
      lastName: 'Kumar',
      dateOfBirth: '2020-08-22',
      enrollmentDate: '2023-02-15',
      classId: 'class-1',
      status: 'active',
    },
    {
      id: '3',
      firstName: 'Priya',
      lastName: 'Patel',
      dateOfBirth: '2020-03-10',
      enrollmentDate: '2023-01-20',
      classId: 'class-2',
      status: 'active',
    },
  ];

  const displayStudents = students.length > 0 ? students : mockStudents;
  const filteredStudents = displayStudents.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateStudent(editingId, formData);
      setEditingId(null);
    } else {
      addStudent(formData);
    }
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      enrollmentDate: new Date().toISOString().split('T')[0],
      classId: '',
      parentPhone: '',
      parentEmail: '',
    });
    setShowForm(false);
  };

  const handleEdit = (student: any) => {
    setFormData(student);
    setEditingId(student.id);
    setShowForm(true);
  };

  return (
    <Layout title="Student Management">
      <div className="space-y-6">
        {/* Header with Search and Add Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center md:justify-start gap-2 transition duration-200"
          >
            <i className="fa-solid fa-plus" />
            Add Student
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {editingId ? 'Edit Student' : 'Add New Student'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                    <select
                      value={formData.classId}
                      onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    >
                      <option value="">Select Class</option>
                      <option value="class-1">Class A (Age 2-3)</option>
                      <option value="class-2">Class B (Age 3-4)</option>
                      <option value="class-3">Class C (Age 4-5)</option>
                    </select>
                    <input
                      type="email"
                      placeholder="Parent Email"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Parent Phone"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
                    >
                      {editingId ? 'Update' : 'Add'} Student
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 px-4 rounded-lg font-medium transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">DOB</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Class</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Enrollment Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.dateOfBirth}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.classId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.enrollmentDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleEdit(student)}
                      className="text-blue-600 hover:text-blue-800 mr-4 inline-flex items-center"
                    >
                      <i className="fa-solid fa-pen" />
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="text-red-600 hover:text-red-800 inline-flex items-center"
                    >
                      <i className="fa-solid fa-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">No students found. Add one to get started!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};
