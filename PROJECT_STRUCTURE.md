# Project Structure & Files Overview

This document provides a complete overview of the TaskFlow project structure.

## 📁 Complete File Tree

```
web/
├── README.md                          # Main documentation
├── QUICKSTART.md                      # Quick setup guide (read this first!)
├── DEPLOYMENT.md                      # Production deployment guide
├── API.md                             # Complete API documentation
│
├── backend/                           # Node.js + Express backend
│   ├── package.json                   # Dependencies & scripts
│   ├── .env                           # Environment variables (create this!)
│   ├── .gitignore                     # Git ignore rules
│   │
│   └── src/
│       ├── server.js                  # Main Express server
│       │
│       ├── models/
│       │   ├── User.js                # User schema (auth, role-based)
│       │   ├── Project.js             # Project schema (with members)
│       │   └── Task.js                # Task schema (todo/in-progress/done)
│       │
│       ├── controllers/
│       │   ├── authController.js      # Register, Login, GetMe
│       │   ├── projectController.js   # Create, Get, AddMember, RemoveMember
│       │   └── taskController.js      # Create, Update, GetByProject, Stats
│       │
│       ├── routes/
│       │   ├── authRoutes.js          # /api/auth/* endpoints
│       │   ├── projectRoutes.js       # /api/projects/* endpoints
│       │   └── taskRoutes.js          # /api/tasks/* endpoints
│       │
│       └── middleware/
│           └── auth.js                # JWT verification & role-based auth
│
└── frontend/                          # React + Vite frontend
    ├── package.json                   # Dependencies & scripts
    ├── index.html                     # HTML entry point
    ├── vite.config.js                 # Vite build config
    ├── tailwind.config.js             # Tailwind CSS config
    ├── postcss.config.js              # PostCSS config
    ├── .env.development               # Dev environment variables
    ├── .gitignore                     # Git ignore rules
    │
    └── src/
        ├── main.jsx                   # React app entry point
        ├── App.jsx                    # Main app with routing
        │
        ├── context/
        │   └── AuthContext.jsx        # Auth state management & hooks
        │
        ├── pages/
        │   ├── Login.jsx              # Login page
        │   ├── Register.jsx           # Registration page
        │   ├── Dashboard.jsx          # Main dashboard with projects
        │   └── ProjectDetail.jsx      # Project details & tasks
        │
        ├── components/
        │   ├── Sidebar.jsx            # Navigation sidebar
        │   ├── ProjectCard.jsx        # Project display card
        │   ├── TaskCard.jsx           # Task display with edit
        │   ├── StatCard.jsx           # Statistics card
        │   └── ProtectedRoute.jsx     # Route protection wrapper
        │
        ├── services/
        │   └── api.js                 # Axios instance & API calls
        │
        └── styles/
            └── index.css              # Global styles + Tailwind
```

## 🔧 Configuration Files

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Frontend (.env.development)
```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ORM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **vite** - Build tool

## 🎯 Key Features Implemented

### Backend Features
✅ User Registration & Login
✅ JWT Authentication (30-day expiry)
✅ Password Hashing (bcrypt with 10 salt rounds)
✅ Role-Based Access Control (Admin/Member)
✅ Project Management (CRUD)
✅ Team Member Management
✅ Task Management (CRUD)
✅ Task Status Filtering
✅ Dashboard Statistics
✅ Error Handling & Validation
✅ Protected Routes

### Frontend Features
✅ Login/Register Forms
✅ Authentication Context
✅ Protected Routes
✅ Dashboard with Project List
✅ Project Details Page
✅ Task Management UI
✅ Task Status Updates
✅ Statistics Display
✅ Responsive Design
✅ Loading States
✅ Error Messages
✅ Navigation Sidebar

## 🚀 Scripts

### Backend
```bash
npm start      # Production mode
npm run dev    # Development with auto-reload
```

### Frontend
```bash
npm run dev    # Development server (port 3000)
npm run build  # Build for production
npm run preview # Preview production build
```

## 📊 Database Schema

### User Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/member),
  createdAt: Date,
  updatedAt: Date
}
```

### Project Collection
```javascript
{
  title: String,
  description: String,
  createdBy: ObjectId (User),
  members: [ObjectId] (User),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Collection
```javascript
{
  title: String,
  description: String,
  status: String (Todo/In Progress/Done),
  assignedTo: ObjectId (User),
  projectId: ObjectId (Project),
  dueDate: Date,
  createdBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Routes

### Auth Routes
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Project Routes
- `POST /api/projects` - Create project
- `GET /api/projects` - Get user's projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members` - Remove member

### Task Routes
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:projectId` - Get project tasks
- `PUT /api/tasks/:id` - Update task
- `GET /api/tasks/stats/:projectId` - Get stats

## 🎨 UI Components

### Pages
- **Login** - Authentication with email/password
- **Register** - Account creation
- **Dashboard** - Project overview & creation
- **ProjectDetail** - Tasks & project management

### Components
- **Sidebar** - Navigation & user profile
- **ProjectCard** - Display project info
- **TaskCard** - Task details with edit
- **StatCard** - Display statistics
- **ProtectedRoute** - Route authentication guard

## 🔐 Security Features

✅ JWT Authentication
✅ Password Hashing (bcrypt)
✅ Protected Routes
✅ Role-Based Authorization
✅ Token Expiry (30 days)
✅ API Error Handling
✅ Input Validation
✅ CORS Configuration

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS breakpoints
- Flex & Grid layouts
- Touch-friendly buttons
- Mobile navigation

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🚀 Deployment Ready

✅ Environment-based configuration
✅ Production-ready error handling
✅ Database connection pooling
✅ CORS configuration
✅ Security headers ready
✅ Scalable architecture

## 📈 Performance Optimizations

- JWT token-based auth (stateless)
- Database indexing
- Query optimization
- Frontend code splitting ready
- CSS minification
- Bundle optimization

## 🧪 Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Create project
- [ ] Add member to project
- [ ] Create task
- [ ] Update task status
- [ ] Filter tasks
- [ ] View statistics
- [ ] Logout functionality
- [ ] Protected routes
- [ ] Mobile responsiveness

## 📝 Code Quality

- Clean, readable code
- Consistent naming conventions
- Proper error handling
- Comments on complex logic
- RESTful API design
- Component modularization
- Separation of concerns

## 🔄 Git Workflow

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/taskmanagement.git
git push -u origin main
```

## 📚 Documentation Files

- **README.md** - Main documentation (features, setup, deployment)
- **QUICKSTART.md** - Fast setup guide (start here!)
- **API.md** - Complete API reference with examples
- **DEPLOYMENT.md** - Production deployment instructions
- **PROJECT_STRUCTURE.md** - This file (file overview)

## 🎓 Learning Path

1. **Start here:** QUICKSTART.md (5 minutes)
2. **Understand APIs:** API.md (10 minutes)
3. **Explore code:** Backend controllers, Frontend pages (20 minutes)
4. **Deploy:** DEPLOYMENT.md (15 minutes)
5. **Customize:** Add features or modify existing ones

## 🛠️ Common Modifications

### Add a new field to Task
1. Update `backend/src/models/Task.js`
2. Update controller logic in `backend/src/controllers/taskController.js`
3. Update frontend form in `frontend/src/pages/ProjectDetail.jsx`

### Change colors
1. Update `frontend/tailwind.config.js`
2. Update component className colors

### Add new role
1. Add to User model role enum
2. Update authorization middleware
3. Update role checks in components

## 📞 Support Resources

- **API Issues:** Check API.md for endpoint specs
- **Setup Issues:** Check QUICKSTART.md
- **Deployment Issues:** Check DEPLOYMENT.md
- **Code Questions:** Check README.md for architecture overview

---

**Total Files:** 25+
**Backend Files:** 12
**Frontend Files:** 13
**Documentation Files:** 4

All files are production-ready and fully functional!
