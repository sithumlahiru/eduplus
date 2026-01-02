# EduPlus - Preschool Management System

A comprehensive, responsive React-based preschool management platform built for Sri Lanka's educational institutions.

## 🎓 Features

### Core Modules

1. **Dashboard** 📊
   - Real-time overview of key metrics
   - Total students, classes, teachers statistics
   - Attendance rates and pending fees tracking
   - Recent activities feed
   - Quick action buttons

2. **Student Management** 👨‍🎓
   - Complete student enrollment system
   - Search and filter functionality
   - Add, edit, and delete student records
   - Track student details (DOB, enrollment date, class assignment)
   - Parent contact information

3. **Parent Management** 👨‍👩‍👧
   - Parent directory with contact details
   - Link parents to enrolled children
   - Address and communication preferences
   - Quick parent information access

4. **Class Management** 📚
   - Create and manage classes by age groups
   - Assign teachers to classes
   - Monitor class capacity and enrollment
   - View class-specific details

5. **Attendance Tracking** 📅
   - Daily attendance marking
   - Visual attendance status (Present/Absent/Late)
   - Attendance summaries and reports
   - Date-based attendance filtering
   - Class-wise attendance views

6. **Fee Management** 💰
   - Track tuition fees and payments
   - Multiple fee status categories (Paid/Pending/Overdue)
   - Monthly fee records
   - Payment history tracking
   - Revenue analytics

7. **Announcements** 📢
   - School-wide announcements
   - Targeted messaging (All/Parents/Teachers)
   - Rich text announcements
   - Timestamped announcements with author information

8. **Settings** ⚙️
   - School profile configuration
   - Principal information
   - Contact details and address
   - System preferences

## 🏗️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS (CDN)
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Date Utilities**: date-fns
- **Icons**: Emoji-based UI elements
- **Build Tool**: Create React App

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full sidebar navigation, comprehensive views
- **Tablet**: Adaptive layouts, optimized spacing
- **Mobile**: Hamburger menu, stacked layouts, touch-friendly interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd preschool-management-app

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy Production Build

```bash
npm install -g serve
serve -s build
```

## 📂 Project Structure

```
src/
├── components/           # Reusable components
│   └── ProtectedRoute.tsx
├── layouts/             # Layout components
│   ├── Layout.tsx
│   └── Sidebar.tsx
├── pages/               # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── StudentsPage.tsx
│   ├── ParentsPage.tsx
│   ├── ClassesPage.tsx
│   ├── AttendancePage.tsx
│   ├── FeesPage.tsx
│   ├── AnnouncementsPage.tsx
│   └── SettingsPage.tsx
├── services/            # API services
│   └── api.ts
├── store/              # State management
│   └── index.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Main app component
├── App.css             # Global styles
└── index.css           # Tailwind imports and global styles
```

## 🔐 Authentication

The system includes a mock authentication system. For development/testing:

- **Email**: admin@example.com
- **Password**: password123

The authentication state is managed using Zustand and persisted in localStorage.

## 📊 Data Models

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'teacher' | 'parent';
  preschoolId?: string;
}
```

### Child
```typescript
{
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
```

### Class
```typescript
{
  id: string;
  name: string;
  ageGroup: string;
  teacherId: string;
  capacity: number;
  enrolledCount: number;
  preschoolId: string;
}
```

### Attendance
```typescript
{
  id: string;
  childId: string;
  classId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  notes?: string;
}
```

### Fee
```typescript
{
  id: string;
  childId: string;
  month: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
}
```

## 🔌 API Integration

The application includes an API service layer (`src/services/api.ts`) that can be connected to a backend server. Currently, it uses mock data. To connect to a backend:

1. Update `API_BASE_URL` in `src/services/api.ts`
2. Implement actual API endpoints on your backend
3. Remove mock data from page components

### Available API Endpoints (to be implemented)

```
POST   /auth/login
POST   /auth/register
GET    /students
GET    /students/:id
POST   /students
PUT    /students/:id
DELETE /students/:id
GET    /classes
POST   /classes
PUT    /classes/:id
DELETE /classes/:id
GET    /attendance
POST   /attendance
GET    /fees
POST   /fees/:id/payment
GET    /announcements
POST   /announcements
DELETE /announcements/:id
GET    /dashboard/stats
```

## 🎨 Customization

### Tailwind CSS
Update the Tailwind CDN link in `public/index.html` to customize colors and styles:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Theme Colors
The application uses Tailwind's default color palette. Customize by modifying className values or using inline Tailwind utilities.

## 📝 Development Notes

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add a new route in `src/App.tsx`
3. Update the sidebar menu in `src/layouts/Sidebar.tsx`
4. Use the `<Layout>` component for consistent styling

### State Management

Use Zustand stores for global state:

```typescript
import { useAuthStore, useDataStore } from '../store';

const { user, logout } = useAuthStore();
const { students, addStudent } = useDataStore();
```

### Form Handling

Use React hooks for form state management:

```typescript
const [formData, setFormData] = useState({ /* initial state */ });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Handle form submission
};
```

## 🐛 Common Issues

### Icons Not Displaying
- The app uses emoji icons instead of icon libraries
- Check that emoji support is enabled in your browser
- Update emoji characters if needed

### Tailwind Styles Not Applied
- Ensure the Tailwind CDN is loaded in `public/index.html`
- Clear browser cache if styles don't update
- Check browser console for CSS errors

### API Connection Issues
- Verify the backend server is running
- Check CORS configuration on the backend
- Update API_BASE_URL in `src/services/api.ts`

## 📄 License

This project is part of the EduPlus Preschool Management System initiative for Sri Lanka.

## 🤝 Contributing

For contributions, please follow these guidelines:
1. Create a feature branch
2. Make your changes with clear commit messages
3. Test thoroughly before submitting
4. Update documentation as needed

## 📞 Support

For support and inquiries, please contact the development team.

---

**Version**: 1.0.0  
**Last Updated**: January 2, 2026  
**Build Status**: ✅ Production Ready

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
