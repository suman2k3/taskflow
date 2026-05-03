# Quick Start Guide

Get TaskFlow up and running in 5 minutes!

## 📋 Prerequisites

- Node.js v16+ installed
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

## 🚀 3-Step Setup

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB connection
# Edit .env and replace with your actual MongoDB URI
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
EOF

# Start backend
npm run dev
```

Backend running at: http://localhost:5000

### Step 2: Frontend Setup (2 minutes)

**In a new terminal:**

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend
npm run dev
```

Frontend running at: http://localhost:3000

### Step 3: Create Your First Account (1 minute)

1. Open http://localhost:3000 in your browser
2. Click "Sign Up"
3. Create an account with:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123

4. You're logged in! 🎉

---

## 🎯 Try These Features

### Create a Project
1. Click "New Project" button
2. Enter project name and description
3. Click "Create"

### Create a Task
1. Open a project
2. Click "New Task"
3. Fill in:
   - Title: "My First Task"
   - Description: "Test task"
   - Status: "Todo"
4. Click "Create"

### Update Task Status
1. Click on a task card
2. Click "Edit"
3. Change status to "In Progress"
4. View updated status

### View Dashboard
- Go back to Dashboard
- See task statistics
- View all your projects

---

## 🔧 Environment Setup

### MongoDB URI Setup

**If using MongoDB Atlas:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Get connection string
5. Copy to `.env` as `MONGODB_URI`

**If using local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/taskmanagement
```

### JWT Secret Setup
Generate a secure random string:
```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Copy the output to `JWT_SECRET` in `.env`

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check MongoDB URI is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct password

### "Port 5000 already in use"
```bash
# On Mac/Linux
lsof -i :5000
kill -9 <PID>

# On Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Frontend can't reach backend"
- Verify backend is running on port 5000
- Clear browser cache
- Check console for error messages

### "Can't login after signup"
- Try logging in again with same email/password
- Check backend logs for errors
- Verify database is connected

---

## 📚 Next Steps

1. **Read Full Documentation:**
   - `README.md` - Complete feature list
   - `API.md` - API endpoint documentation
   - `DEPLOYMENT.md` - Production deployment guide

2. **Explore Code:**
   - `backend/src/models/` - Database schemas
   - `backend/src/controllers/` - Business logic
   - `frontend/src/pages/` - React pages
   - `frontend/src/components/` - Reusable components

3. **Deploy to Production:**
   - Follow `DEPLOYMENT.md`
   - Choose hosting (Railway, Vercel, etc.)
   - Set up production MongoDB Atlas

4. **Add More Features:**
   - File attachments
   - Comments on tasks
   - Task notifications
   - Team invitations via email

---

## 🎨 Customization

### Change App Name
1. Edit `frontend/src/components/Sidebar.jsx` - Line 12
2. Edit `frontend/index.html` - Line 7
3. Edit `backend/.env` - Update app name in JWT_SECRET comment

### Change Colors
1. Edit `frontend/tailwind.config.js`
2. Modify color palette
3. Rebuild with `npm run build`

### Add More Fields
1. Edit database models in `backend/src/models/`
2. Update controllers
3. Update frontend forms

---

## 📞 Support

Having issues?

1. Check error messages in console
2. Review logs:
   ```bash
   # Backend logs
   npm run dev  # watch output
   
   # Frontend logs
   Open DevTools (F12) > Console
   ```

3. Verify environment variables:
   ```bash
   cat .env  # backend
   cat frontend/.env.development
   ```

4. Restart services:
   ```bash
   # Kill backend
   Ctrl+C
   
   # Restart
   npm run dev
   ```

---

## ✅ Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB connection string ready
- [ ] Backend `.env` configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can create account
- [ ] Can create project
- [ ] Can create task
- [ ] Can see dashboard stats

---

## 🚀 You're All Set!

You now have a fully functional task management system running locally.

Next: Read `DEPLOYMENT.md` to deploy to production!

Happy project managing! 🎯
