import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';

interface Props {
  children: React.ReactNode;
}

export const TeacherProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, token } = useAuthStore();

  if (!user || !token) return <Navigate to="/login" replace />;
  if (user.role !== 'teacher') return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};
