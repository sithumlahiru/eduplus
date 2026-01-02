export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'parent';
  preschoolId?: string;
}

export interface Child {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  enrollmentDate: string;
  parentId: string;
  classId: string;
  status: 'active' | 'inactive' | 'graduated';
  imageUrl?: string;
}

export interface Parent {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  childrenIds: string[];
}

export interface Class {
  id: string;
  name: string;
  ageGroup: string;
  teacherId: string;
  capacity: number;
  enrolledCount: number;
  preschoolId: string;
}

export interface Attendance {
  id: string;
  childId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}

export interface Fee {
  id: string;
  childId: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
  preschoolId: string;
  target: 'all' | 'parents' | 'teachers';
}

export interface Dashboard {
  totalStudents: number;
  totalClasses: number;
  totalTeachers: number;
  attendanceRate: number;
  pendingFees: number;
}
