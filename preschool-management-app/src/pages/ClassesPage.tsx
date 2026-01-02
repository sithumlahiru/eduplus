import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';

interface ClassFormData {
  name: string;
  ageGroup: string;
  teacherId: string;
  capacity: number;
}

export const ClassesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    ageGroup: '',
    teacherId: '',
    capacity: 20,
  });

  const mockClasses = [
    {
      id: '1',
      name: 'Class A',
      ageGroup: '2-3 years',
      teacher: 'Mrs. Herath',
      capacity: 20,
      enrolled: 15,
    },
    {
      id: '2',
      name: 'Class B',
      ageGroup: '3-4 years',
      teacher: 'Mrs. Fernandez',
      capacity: 20,
      enrolled: 18,
    },
    {
      id: '3',
      name: 'Class C',
      ageGroup: '4-5 years',
      teacher: 'Mr. Jayasinghe',
      capacity: 25,
      enrolled: 22,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Class saved:', formData);
    setFormData({
      name: '',
      ageGroup: '',
      teacherId: '',
      capacity: 20,
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <Layout title="Class Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-gray-600 mb-4 md:mb-0">Manage preschool classes and assignments</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus" />
            Add Class
          </button>
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {editingId ? 'Edit Class' : 'Add New Class'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Class Name (e.g., Class A)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Age Group</option>
                    <option value="2-3">2-3 Years</option>
                    <option value="3-4">3-4 Years</option>
                    <option value="4-5">4-5 Years</option>
                  </select>
                  <select
                    value={formData.teacherId}
                    onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  >
                    <option value="">Select Teacher</option>
                    <option value="teacher-1">Mrs. Herath</option>
                    <option value="teacher-2">Mrs. Fernandez</option>
                    <option value="teacher-3">Mr. Jayasinghe</option>
                  </select>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Capacity ({formData.capacity} students)
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
                    >
                      {editingId ? 'Update' : 'Add'} Class
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditingId(null);
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 px-4 rounded-lg font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockClasses.map((classItem) => (
            <div key={classItem.id} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{classItem.name}</h3>
                  <p className="text-sm text-gray-600">{classItem.ageGroup}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(classItem.id);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fa-solid fa-pen" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Teacher</p>
                  <p className="font-semibold text-gray-900">{classItem.teacher}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Enrollment</p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-semibold text-gray-900">
                      {classItem.enrolled}/{classItem.capacity}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <button className="w-full text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
