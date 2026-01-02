import { create } from 'zustand';
import { User } from '../types';

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  token: localStorage.getItem('token'),
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Mock authentication - replace with actual API call
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'admin',
      };
      const mockToken = 'mock-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', mockToken);
      
      set({ user: mockUser, token: mockToken });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  setUser: (user) => set({ user }),
}));

interface DataStore {
  students: any[];
  classes: any[];
  parents: any[];
  setStudents: (students: any[]) => void;
  setClasses: (classes: any[]) => void;
  setParents: (parents: any[]) => void;
  addStudent: (student: any) => void;
  updateStudent: (id: string, student: any) => void;
  deleteStudent: (id: string) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  students: [],
  classes: [],
  parents: [],

  setStudents: (students) => set({ students }),
  setClasses: (classes) => set({ classes }),
  setParents: (parents) => set({ parents }),

  addStudent: (student) =>
    set((state) => ({
      students: [...state.students, { ...student, id: Date.now().toString() }],
    })),

  updateStudent: (id, student) =>
    set((state) => ({
      students: state.students.map((s) => (s.id === id ? { ...s, ...student } : s)),
    })),

  deleteStudent: (id) =>
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
    })),
}));
