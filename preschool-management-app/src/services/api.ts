import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to headers if available
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Auth endpoints
  login(email: string, password: string) {
    return this.api.post('/auth/login', { email, password });
  }

  register(userData: any) {
    return this.api.post('/auth/register', userData);
  }

  // Students endpoints
  getStudents() {
    return this.api.get('/students');
  }

  getStudent(id: string) {
    return this.api.get(`/students/${id}`);
  }

  createStudent(data: any) {
    return this.api.post('/students', data);
  }

  updateStudent(id: string, data: any) {
    return this.api.put(`/students/${id}`, data);
  }

  deleteStudent(id: string) {
    return this.api.delete(`/students/${id}`);
  }

  // Classes endpoints
  getClasses() {
    return this.api.get('/classes');
  }

  createClass(data: any) {
    return this.api.post('/classes', data);
  }

  updateClass(id: string, data: any) {
    return this.api.put(`/classes/${id}`, data);
  }

  deleteClass(id: string) {
    return this.api.delete(`/classes/${id}`);
  }

  // Attendance endpoints
  getAttendance(classId: string, date: string) {
    return this.api.get(`/attendance`, { params: { classId, date } });
  }

  markAttendance(data: any) {
    return this.api.post('/attendance', data);
  }

  // Fees endpoints
  getFees(childId?: string) {
    return this.api.get('/fees', { params: childId ? { childId } : {} });
  }

  recordFeePayment(id: string, data: any) {
    return this.api.post(`/fees/${id}/payment`, data);
  }

  // Announcements endpoints
  getAnnouncements() {
    return this.api.get('/announcements');
  }

  createAnnouncement(data: any) {
    return this.api.post('/announcements', data);
  }

  deleteAnnouncement(id: string) {
    return this.api.delete(`/announcements/${id}`);
  }

  // Dashboard endpoints
  getDashboardStats() {
    return this.api.get('/dashboard/stats');
  }
}

export default new ApiService();
