# TaskFlow - Production-Ready Project & Task Management System

A modern, full-stack web application for managing projects and tasks with role-based access control.

## 🎯 Features

✅ **User Authentication**
- Signup & Login with JWT
- Password hashing with bcrypt
- Protected routes

✅ **Role-Based Access Control**
- Admin: Full access to create/manage projects and tasks
- Member: Can view assigned projects and update own tasks

✅ **Project Management**
- Create and manage projects
- Add/remove team members
- View project details

✅ **Task Management**
- Create tasks with title, description, due date
- Assign tasks to team members
- Update task status (Todo, In Progress, Done)
- Filter tasks by status

✅ **Dashboard & Analytics**
- Task statistics (total, completed, pending, overdue)
- Real-time updates
- Clean, modern UI with Tailwind CSS

## 🛠️ Tech Stack

**Frontend:**
- React.js 18
- Vite (fast build tool)
- React Router v6
- Axios for HTTP requests
- Tailwind CSS for styling

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

## 📁 Project Structure

```
web/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   └── Task.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   └── taskController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── ProjectCard.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── StatCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── ProjectDetail.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   └── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.development
    └── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
Edit `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
```

4. **Start the backend server:**
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

4. **Build for production:**
```bash
npm run build
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `POST /api/projects` - Create project (admin/member)
- `GET /api/projects` - Get all projects for user
- `GET /api/projects/:id` - Get project details
- `POST /api/projects/:id/members` - Add member to project
- `DELETE /api/projects/:id/members` - Remove member from project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `PUT /api/tasks/:id` - Update task
- `GET /api/tasks/stats/:projectId` - Get task statistics

## 🔐 Authentication Flow

1. **User Registration:**
   - User submits name, email, password
   - Password is hashed with bcrypt (salt rounds: 10)
   - User is created in MongoDB
   - JWT token is generated and returned

2. **User Login:**
   - User submits email and password
   - Password is verified using bcrypt
   - JWT token is generated with 30-day expiration
   - Token stored in localStorage

3. **Protected Routes:**
   - JWT token is sent in Authorization header: `Bearer <token>`
   - Middleware validates token and extracts user data
   - Routes protected by `protect` and `authorize` middleware

## 👥 Role-Based Access Control

### Admin Role
- ✅ Create projects
- ✅ Add/remove members from projects
- ✅ Create tasks in any project
- ✅ Update any task
- ✅ View all projects and tasks

### Member Role
- ✅ View assigned projects
- ✅ Update own tasks only
- ✅ View task details
- ❌ Create projects
- ❌ Add members to projects
- ❌ Update other members' tasks

## 🗄️ Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'member',
  createdAt: Date,
  updatedAt: Date
}
```

### Project
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

### Task
```javascript
{
  title: String,
  description: String,
  status: 'Todo' | 'In Progress' | 'Done',
  assignedTo: ObjectId (User),
  projectId: ObjectId (Project),
  dueDate: Date,
  createdBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🌐 Deployment

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Create a database user
4. Get connection string
5. Update `.env` with connection string

### Railway Deployment (Backend)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login to Railway:**
```bash
railway login
```

3. **Initialize Railway project:**
```bash
railway init
```

4. **Add MongoDB plugin:**
```bash
railway add
```

5. **Configure environment variables:**
```bash
railway variables set JWT_SECRET=your_secret_key
```

6. **Deploy:**
```bash
railway up
```

### Vercel Deployment (Frontend)

1. **Build the frontend:**
```bash
npm run build
```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Import your project
   - Set environment variable:
     ```
     VITE_API_URL=https://your-railway-backend-url/api
     ```
   - Deploy

3. **Update backend API URL in frontend:**
   - After deployment, update the API URL in `.env.production`

### Railway Full-Stack Deployment

1. **Create Railway project with MongoDB:**
   - Click "New Project"
   - Add MongoDB plugin
   - Add Node.js application

2. **Configure variables:**
   - `MONGODB_URI` (auto-generated by Railway)
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `PORT=5000`

3. **Deploy backend:**
   - Push code to GitHub
   - Railway auto-deploys on push

4. **Deploy frontend on Vercel:**
   - Set `VITE_API_URL` to your Railway backend URL
   - Deploy

## 🧪 Testing the Application

### Test Admin Account
```
Email: admin@example.com
Password: password123
```

### Test Member Account
```
Email: member@example.com
Password: password123
```

### Sample Workflow
1. Register a new account (becomes admin by default)
2. Login with your account
3. Create a project
4. Add team members
5. Create tasks and assign to members
6. Update task status
7. View dashboard statistics

## 📋 Checklist

- ✅ User authentication (signup/login/logout)
- ✅ JWT token management
- ✅ Role-based access control
- ✅ Project management
- ✅ Task management
- ✅ Dashboard with statistics
- ✅ Task filtering and status updates
- ✅ Responsive UI with Tailwind CSS
- ✅ Error handling
- ✅ API validation
- ✅ MongoDB integration
- ✅ Protected routes
- ✅ Environmental configuration

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify MongoDB connection string
- Check Node.js version (v16+)

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check `.env.development` has correct API URL
- Clear browser cache and reload

### MongoDB connection error
- Verify connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

## 📝 Notes

- JWT tokens expire in 30 days
- Passwords are hashed with bcrypt (10 salt rounds)
- All API endpoints require JWT authentication (except /auth/register and /auth/login)
- Role-based authorization is enforced on the backend
- CORS is enabled for development

## 📄 License

MIT License - Feel free to use this for your projects

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for modern project management**
