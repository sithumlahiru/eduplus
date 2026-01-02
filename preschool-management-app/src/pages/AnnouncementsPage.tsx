import React, { useState } from 'react';
import { Layout } from '../layouts/Layout';
import { formatDistanceToNow } from 'date-fns';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  target: 'all' | 'parents' | 'teachers';
}

export const AnnouncementsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: 'all' as const,
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'School Closed Tomorrow',
      content: 'The preschool will be closed tomorrow due to a public holiday.',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      createdBy: 'Admin',
      target: 'all',
    },
    {
      id: '2',
      title: 'Parent-Teacher Meeting',
      content: 'Please join us for the monthly parent-teacher meeting on Friday at 3:00 PM.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'Mrs. Herath',
      target: 'parents',
    },
    {
      id: '3',
      title: 'Staff Training Session',
      content: 'All teachers are requested to attend the training session on Monday.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      createdBy: 'Admin',
      target: 'teachers',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      target: formData.target,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setFormData({ title: '', content: '', target: 'all' });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const getTargetBadge = (target: string) => {
    switch (target) {
      case 'all':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">All</span>;
      case 'parents':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-semibold">Parents</span>;
      case 'teachers':
        return <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-semibold">Teachers</span>;
      default:
        return null;
    }
  };

  return (
    <Layout title="Announcements">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-gray-600">Share important updates with parents and staff</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus" />
            New Announcement
          </button>
        </div>

        {/* Add Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Announcement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Announcement Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                  <textarea
                    placeholder="Write your announcement here..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    required
                  ></textarea>
                  <select
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">All (Parents & Teachers)</option>
                    <option value="parents">Parents Only</option>
                    <option value="teachers">Teachers Only</option>
                  </select>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
                    >
                      Post Announcement
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
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

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div key={announcement.id} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4 flex-1">
                    <i className="fa-solid fa-bullhorn text-2xl mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{announcement.title}</h3>
                      <p className="text-sm text-gray-500">
                        {announcement.createdBy} • {formatDistanceToNow(new Date(announcement.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(announcement.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{announcement.content}</p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>{getTargetBadge(announcement.target)}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <i className="fa-solid fa-bullhorn text-5xl block mb-4" />
              <p className="text-gray-500">No announcements yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
