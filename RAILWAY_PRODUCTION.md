# 🚀 TaskFlow - Production Deployment Guide

Your TaskFlow application is production-ready and configured for Railway deployment!

## 📋 What's Included

✅ **Backend (Node.js + Express)**
- REST API with 11 endpoints
- MongoDB Atlas integration
- JWT authentication & authorization
- Role-based access control (Admin/Member)

✅ **Frontend (React + Vite)**
- Modern SPA with client-side routing
- Context API for state management
- Responsive design with Tailwind CSS
- Production-optimized build

✅ **Configuration Files**
- `.env.example` - Environment variables template
- `railway.toml` - Railway monorepo configuration
- `Procfile` - Process definitions
- `.gitignore` - Git ignore rules

---

## 🎯 Quick Railway Deployment

### Prerequisites
- GitHub account with your code pushed
- Railway account (https://railway.app)
- MongoDB Atlas (already configured)

### Step 1: Connect Your GitHub Repository to Railway

1. Go to https://railway.app/dashboard
2. Click **New Project** → **Deploy from GitHub repo**
3. Authorize Railway and select your `taskflow` repository
4. Click **Deploy**

### Step 2: Create Backend Service

When prompted:
1. **Service name**: `backend`
2. **Root directory**: `backend`
3. Click **Create service** and wait for initial build

### Step 3: Set Backend Environment Variables

1. Go to backend service → **Variables** tab
2. Add the following:

```env
MONGODB_URI=mongodb://sumank2484_db_user:5QDWRUKxaQhzoAk6@ac-8orpvw4-shard-00-00.pfbxih5.mongodb.net:27017,ac-8orpvw4-shard-00-01.pfbxih5.mongodb.net:27017,ac-8orpvw4-shard-00-02.pfbxih5.mongodb.net:27017/taskflow?ssl=true&replicaSet=atlas-dnokec-shard-0&authSource=admin&retryWrites=true&w=majority

JWT_SECRET=mysecret123

NODE_ENV=production

PORT=3001
```

3. Click **Save** → Service will auto-redeploy

### Step 4: Get Backend Domain

1. Go to backend service → **Domains** section
2. Copy the domain (e.g., `https://taskflow-prod.up.railway.app`)
3. Save this for Step 6

### Step 5: Create Frontend Service

1. Click **+ New Service** → **GitHub Repo**
2. Select your `taskflow` repository again
3. **Service name**: `frontend`
4. **Root directory**: `frontend`
5. Click **Create service**

### Step 6: Set Frontend Environment Variables

1. Go to frontend service → **Variables** tab
2. Add:

```env
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

(Replace `YOUR-BACKEND-DOMAIN` with the domain from Step 4)

3. Click **Save** → Auto-redeploy

### Step 7: Verify Deployment

1. Both services should show ✅ **Running** status
2. Click frontend domain → You should see TaskFlow login page
3. Test: Register → Create project → Create task

---

## 🔧 Configuration Files Explained

### `railway.toml`
Defines how Railway builds your monorepo:
- Specifies `backend` and `frontend` root directories
- Sets build and start commands
- Uses Nixpacks builder

### `.env.example`
Template showing required environment variables:
- Copy to `.env` locally
- Railway uses dashboard variables in production

### `Procfile`
Defines how to start the application (backup method)

### `package.json` Scripts
- `npm start` - Start backend in production
- `npm run dev` - Development mode with nodemon
- `npm run build` - Build frontend for production
- `npm run preview` - Preview frontend build

---

## 🔐 Production Best Practices

### Security
1. **Change JWT_SECRET**: Use a strong, random string instead of `mysecret123`
2. **MongoDB SSL**: Already enabled in connection string
3. **HTTPS**: Railway automatically provides SSL certificates
4. **CORS**: Configured for production domains

### Performance
1. **Frontend Build**: Vite automatically minifies and optimizes
2. **Backend Compression**: Express compression middleware enabled
3. **Database Indexing**: MongoDB Atlas has automatic indexing

### Monitoring
- Check Railway logs: Dashboard → Service → Deployments → View Logs
- Monitor metrics: Dashboard → Service → Metrics tab
- Set up alerts in Railway settings

---

## 🐛 Troubleshooting

### Build Fails
**Issue**: "Builder unable to generate build plan"
- **Solution**: Ensure `root` directory is set correctly in Railway dashboard

### API Endpoints Return 404
**Issue**: Backend routes not found
- **Solution**: Check backend service is running (status = ✅ Running)
- Check MongoDB connection in logs

### Frontend Shows Blank Page
**Issue**: "Cannot GET /"
- **Solution**: Check `VITE_API_URL` is correct in frontend variables
- Hard refresh browser (Ctrl+Shift+R)

### MongoDB Connection Timeout
**Issue**: Cannot connect to MongoDB
- **Solution**: 
  - Verify connection string is correct
  - Check MongoDB Atlas IP whitelist (should include Railway IPs)
  - Use "Allow all IPs" (0.0.0.0/0) for testing

---

## 📞 Support Resources

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **MongoDB Docs**: https://docs.mongodb.com
- **Vite Docs**: https://vitejs.dev

---

## 🎉 You're Live!

Your TaskFlow application is now running on Railway with:
- ✅ Continuous deployment from GitHub
- ✅ Auto-SSL certificates
- ✅ Global CDN
- ✅ Automatic scaling
- ✅ Built-in monitoring

Any push to `main` branch will trigger automatic deployment!

---

**Happy Deploying!** 🚀
