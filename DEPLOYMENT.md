# EduPlus Setup & Deployment Guide

## 📋 System Requirements

### Minimum Requirements
- Node.js 14.0 or higher
- npm 6.0 or higher (or yarn)
- 100 MB disk space
- Modern web browser

### Recommended
- Node.js 16.0+ (LTS)
- npm 8.0+ or yarn 3.0+
- 500 MB disk space
- Chrome, Firefox, Safari, or Edge (latest)

## 🔧 Installation & Setup

### Option 1: Development Server (Recommended for Testing)

```bash
# 1. Navigate to the project directory
cd preschool-management-app

# 2. Install all dependencies (first time only)
npm install

# 3. Start development server
npm start
```

**What happens:**
- Server starts on http://localhost:3000
- Browser opens automatically
- Hot reload on file changes (see changes instantly)
- Console shows any errors

### Option 2: Production Build

```bash
# 1. Build optimized version
npm run build

# 2. Install serve package globally
npm install -g serve

# 3. Serve the production build
serve -s build
```

**What happens:**
- Build folder contains minified, optimized code
- Smaller file sizes (faster loading)
- Better performance
- Ready for deployment

## 🚀 Deployment Options

### Option A: Vercel (Easiest - Free)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel
```

**Pros**: Free, automatic HTTPS, global CDN, preview URLs  
**Cons**: Limited free tier for API calls

### Option B: Netlify (Beginner-Friendly)

```bash
# 1. Create account at netlify.com
# 2. Connect GitHub repository
# 3. Set build command: npm run build
# 4. Set publish directory: build
# 5. Deploy automatically on git push
```

**Pros**: Simple, free, git integration, form handling  
**Cons**: Need GitHub repository

### Option C: Traditional Hosting (cpanel/VPS)

```bash
# 1. Build the app
npm run build

# 2. Upload 'build' folder via FTP/SSH to:
/public_html/

# 3. Create .htaccess for routing:
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Pros**: Full control, no third-party  
**Cons**: More complex setup

### Option D: Docker (Production-Grade)

Create `Dockerfile`:
```dockerfile
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build"]
```

Build and run:
```bash
docker build -t eduplus .
docker run -p 3000:3000 eduplus
```

## 🔌 Backend Integration

### Step 1: Update API Configuration

Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```

### Step 2: Set Environment Variables

Create `.env` file:
```
REACT_APP_API_URL=https://your-api.com/api
REACT_APP_ENV=production
```

For development:
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

### Step 3: Implement Real API Calls

Example - Replace mock data in `DashboardPage.tsx`:

**Before (Mock)**:
```typescript
const [stats, setStats] = useState({
  totalStudents: 156,
  // ...
});
```

**After (Real API)**:
```typescript
useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await apiService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };
  fetchStats();
}, []);
```

## 📦 Dependencies Management

### Install New Package
```bash
npm install package-name
```

### Update All Packages
```bash
npm update
```

### Check for Security Issues
```bash
npm audit
npm audit fix  # Auto-fix vulnerabilities
```

### Clean Install
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Build Test (before deployment)
```bash
npm run build
```

Check for:
- ✅ No errors
- ✅ All warnings reviewed
- ✅ Bundle size acceptable (< 200KB gzipped)

## 📊 Performance Optimization

### Current Bundle Size
- JavaScript: 86.86 KB (gzipped)
- CSS: 567 B
- Total: ~87.5 KB (excellent!)

### Further Optimization

1. **Code Splitting**: Already implemented for faster initial load
2. **Lazy Loading**: Add for future pages:
```typescript
const LazePage = React.lazy(() => import('./pages/LazePage'));
```

3. **Image Optimization**: Compress images before use
4. **Caching**: Set cache headers on production server

## 🔐 Security Checklist

- [ ] Change demo credentials before production
- [ ] Implement proper authentication backend
- [ ] Use HTTPS everywhere
- [ ] Set up CORS properly on backend
- [ ] Validate all user inputs on backend
- [ ] Use secure password hashing (bcrypt, argon2)
- [ ] Implement rate limiting on API
- [ ] Use environment variables for secrets
- [ ] Regular security audits (npm audit)
- [ ] Keep dependencies updated

## 🛠️ Troubleshooting Deployment

### Issue: "npm not found"
```bash
# Install Node.js from nodejs.org
# Or use nvm: brew install nvm
nvm install 16
nvm use 16
```

### Issue: "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm start

# Or kill existing process
lsof -ti:3000 | xargs kill
```

### Issue: "Build fails with memory error"
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Issue: "White blank screen after deploy"
- Check browser console (F12)
- Verify `.env` variables set correctly
- Ensure `build` folder deployed correctly
- Check .htaccess for Apache routing

## 📈 Monitoring & Maintenance

### Monitor Performance
- Check browser DevTools Network tab
- Monitor API response times
- Track error logs
- Monitor bundle size

### Regular Updates
```bash
# Weekly
npm audit fix

# Monthly
npm update

# Quarterly
npm outdated  # Check for major version updates
```

### Backup Strategy
```bash
# Backup database (when implemented)
mysqldump -u user -p database > backup.sql

# Backup code
git push origin main
```

## 🎯 Going Live Checklist

- [ ] All features tested locally
- [ ] Backend API deployed and tested
- [ ] Environment variables configured
- [ ] HTTPS certificate installed
- [ ] Database migrations completed
- [ ] Admin account created
- [ ] Contact info updated
- [ ] Privacy policy in place
- [ ] Error logging configured
- [ ] Backup strategy implemented
- [ ] Team trained on system
- [ ] Go-live date announced

## 📞 Getting Help

### Resources
- React Docs: https://react.dev
- Tailwind Docs: https://tailwindcss.com
- TypeScript Docs: https://www.typescriptlang.org
- Vercel Docs: https://vercel.com/docs

### Common Commands Reference

```bash
# Development
npm start                 # Start dev server
npm test                 # Run tests
npm run build            # Create production build

# Package Management
npm install              # Install all dependencies
npm install package-name # Install specific package
npm uninstall package    # Remove package
npm update               # Update all packages
npm audit                # Check security

# Deployment
vercel deploy            # Deploy to Vercel
netlify deploy           # Deploy to Netlify

# Cleanup
npm cache clean --force
rm -rf node_modules
rm package-lock.json
```

## 🎓 Next Steps

1. **Customize**: Update colors, logo, text
2. **Backend**: Implement API integration
3. **Testing**: Add comprehensive tests
4. **Deployment**: Choose hosting platform
5. **Monitoring**: Set up error tracking
6. **Training**: Train staff on system
7. **Launch**: Go live!

---

**Deployment Complete!** 🚀  
Your EduPlus instance is ready to serve your preschool community.
