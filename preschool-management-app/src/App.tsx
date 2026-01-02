import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { StudentsPage } from './pages/StudentsPage';
import { ParentsPage } from './pages/ParentsPage';
import { ClassesPage } from './pages/ClassesPage';
import { AttendancePage } from './pages/AttendancePage';
import { FeesPage } from './pages/FeesPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { TeacherProtectedRoute } from './components/TeacherProtectedRoute';
import { TeacherDashboard } from './teacher/TeacherDashboard';
import { TeacherStudents } from './teacher/TeacherStudents';
import { TeacherClasses } from './teacher/TeacherClasses';
import { TeacherAttendance } from './teacher/TeacherAttendance';
import { TeacherAnnouncements } from './teacher/TeacherAnnouncements';
import { useAuthStore } from './store';

function App() {
  const { user } = useAuthStore();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser && !user) {
      // Rehydrate user from localStorage
      const parsedUser = JSON.parse(storedUser);
      useAuthStore.setState({ user: parsedUser });
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <StudentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parents"
          element={
            <ProtectedRoute>
              <ParentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <ClassesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <AttendancePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fees"
          element={
            <ProtectedRoute>
              <FeesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <AnnouncementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Teacher read-only portal */}
        <Route
          path="/teacher/dashboard"
          element={
            <TeacherProtectedRoute>
              <TeacherDashboard />
            </TeacherProtectedRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <TeacherProtectedRoute>
              <TeacherStudents />
            </TeacherProtectedRoute>
          }
        />
        <Route
          path="/teacher/classes"
          element={
            <TeacherProtectedRoute>
              <TeacherClasses />
            </TeacherProtectedRoute>
          }
        />
        <Route
          path="/teacher/attendance"
          element={
            <TeacherProtectedRoute>
              <TeacherAttendance />
            </TeacherProtectedRoute>
          }
        />
        <Route
          path="/teacher/announcements"
          element={
            <TeacherProtectedRoute>
              <TeacherAnnouncements />
            </TeacherProtectedRoute>
          }
        />

        {/* Redirect to dashboard if authenticated, otherwise to login */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
