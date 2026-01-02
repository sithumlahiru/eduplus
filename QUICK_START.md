# EduPlus Preschool Management System - Quick Start Guide

## 🎯 Overview

EduPlus is a complete preschool management solution with student enrollment, attendance tracking, fee management, and communications tools - all in one responsive platform.

## ⚡ Getting Started (5 minutes)

### 1. Start the Development Server

```bash
cd preschool-management-app
npm install  # Only needed first time
npm start
```

The app opens at `http://localhost:3000`

### 2. Login

Use demo credentials:
- **Email**: admin@example.com
- **Password**: password123

## 📱 Main Pages & What They Do

### Dashboard 📊
Your central hub showing:
- Total number of students and classes
- Current attendance rate
- Pending fees count
- Recent activities

**Quick Actions**: Add students, mark attendance, send announcements

### Students 👨‍🎓
Manage all enrolled students:
- ➕ **Add Student**: Enter name, DOB, class, parent contact
- 🔍 **Search**: Find students by name
- ✏️ **Edit**: Update student information
- 🗑️ **Delete**: Remove student records

### Parents 👨‍👩‍👧
Parent contact directory:
- View all parent details
- See which children they're linked to
- Track communication preferences
- Contact information at a glance

### Classes 📚
Create and manage class groups:
- Name classes by age group (2-3 years, 3-4 years, etc.)
- Assign teachers
- Monitor enrollment vs capacity
- See all class details

### Attendance 📅
Mark daily attendance:
1. Select date and class
2. Mark each student: ✅ Present, ❌ Absent, or ⏰ Late
3. Click "Save Attendance"

**Summary**: View present/absent/late counts at top

### Fees 💰
Track payments and revenue:
- **Paid**: Payments received ✅
- **Pending**: Awaiting payment (blue)
- **Overdue**: Past due date ⚠️

View totals by status and request payments

### Announcements 📢
Send messages to school community:
1. Click "New Announcement"
2. Enter title and message
3. Choose recipients: All, Parents Only, or Teachers Only
4. Posts appear in feed with timestamp

### Settings ⚙️
School configuration:
- Update school name and address
- Add principal information
- Contact details
- Save changes

## 🎨 Features Explained

### Responsive Design
- 💻 **Desktop**: Full sidebar, all options visible
- 📱 **Mobile**: Hamburger menu (☰), tap to navigate
- 📊 **Tablet**: Optimized for touch and medium screens

### Search & Filter
- Use 🔍 search bars to find students/parents
- Filter by class, status, date, or month
- Results update in real-time

### Forms
- All forms validate required fields
- Dates use calendar picker
- Dropdowns for selections (Classes, Teachers, etc.)
- Modal windows don't require page reload

### Status Indicators
- 🟢 Green = Active/Success (Present, Paid)
- 🔵 Blue = Neutral/Pending (Pending payment)
- 🔴 Red = Alert/Overdue (Absent, Late fees)

## 🔐 User Roles

Current version supports:
- **Admin**: Full access to all features
- **Teacher**: Attendance marking, class info (planned)
- **Parent**: View own children, announcements (planned)

Login as admin to access everything.

## 💾 Data Storage

- **Local**: Data stored in browser's localStorage
- **Session**: Persists while logged in
- **Clear on logout**: Data cleared from memory

## 🚀 Next Steps for Development

### To Add Backend:
1. Set up a Node/Express or other backend server
2. Create API endpoints (see README.md for list)
3. Update `src/services/api.ts` with your URL
4. Replace mock data with real API calls

### To Customize:
1. **Colors**: Edit Tailwind classes in components
2. **Fields**: Add to TypeScript interfaces in `src/types/`
3. **Pages**: Create new `.tsx` files in `src/pages/`
4. **Routes**: Add to `src/App.tsx`

### To Deploy:
```bash
npm run build
# Upload the 'build' folder to your hosting
```

## 📞 Keyboard Shortcuts

- **Ctrl+K** or **Cmd+K**: Search (when implemented)
- **Esc**: Close modals/dropdowns
- **Tab**: Navigate between form fields
- **Enter**: Submit forms

## 🎓 Real-World Usage Example

**Monday Morning**:
1. Open EduPlus Dashboard ✨
2. See 120 students enrolled across 8 classes
3. Click "Mark Attendance"
4. Select Class A, today's date
5. Mark 15 students present, 1 absent (sick)
6. Save - attendance recorded ✅
7. Go to Announcements
8. Post: "Early pickup today at 3:30 PM"
9. Check Fees - remind parent with 2 overdue accounts
10. Done! ⏱️ Takes 5 minutes

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| Page blank after login | Refresh browser (F5) |
| Can't find my changes | Data resets on page refresh (use backend to persist) |
| Mobile menu stuck | Click overlay/background to close |
| Date picker not working | Try typing date format: YYYY-MM-DD |
| Can't delete items | Check if required fields are empty |

## 📚 File Organization

```
Important files to know:
- src/App.tsx - All routes and page connections
- src/layouts/Sidebar.tsx - Navigation menu
- src/store/index.ts - Global state/data
- src/services/api.ts - Backend connections
- src/pages/*.tsx - Individual page implementations
```

## 🎯 Key Metrics Tracked

- **Students**: Total, by class, active/inactive
- **Attendance**: Daily %, by class, trends
- **Fees**: Revenue, pending, overdue amounts
- **Classes**: Capacity, enrollment, teacher assignment
- **Parents**: Contact info, linked children

## 🌐 Browser Support

Works best on:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## 📖 For More Info

See the full README.md in the project root for:
- Complete API documentation
- Data model details
- Advanced customization
- Deployment options

---

**Happy Managing!** 🎓  
Questions? Check the main README.md or contact support.
