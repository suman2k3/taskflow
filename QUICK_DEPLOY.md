# Quick Railway Deployment Checklist

## Before You Start
- [ ] GitHub account created
- [ ] Code committed to GitHub repository
- [ ] Railway account created at https://railway.app
- [ ] MongoDB Atlas connection string ready

---

## Fast Track (5 minutes)

### 1. Connect Railway to GitHub
```
1. Visit https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select your taskflow repository
6. Click "Deploy Now"
```

### 2. Set Environment Variables
**After Railway detects your services, add these variables:**

**For Backend Service:**
```
MONGODB_URI=mongodb://sumank2484_db_user:5QDWRUKxaQhzoAk6@ac-8orpvw4-shard-00-00.pfbxih5.mongodb.net:27017,ac-8orpvw4-shard-00-01.pfbxih5.mongodb.net:27017,ac-8orpvw4-shard-00-02.pfbxih5.mongodb.net:27017/taskflow?ssl=true&replicaSet=atlas-dnokec-shard-0&authSource=admin&retryWrites=true&w=majority

JWT_SECRET=mysecret123

NODE_ENV=production

PORT=3001
```

**For Frontend Service:**
```
VITE_API_URL=https://[YOUR-BACKEND-DOMAIN]/api
```
(Replace [YOUR-BACKEND-DOMAIN] with your actual backend URL from Railway)

### 3. Deploy
```
1. Click "Deploy" on both services
2. Wait 2-3 minutes for deployment
3. Check Status → Should show "Running"
4. Click domain link to visit your app
```

---

## Manual Deployment with CLI

### 1. Install Railway CLI
```bash
npm install -g @railway/cli
```

### 2. Login
```bash
railway login
```

### 3. Initialize Project
```bash
cd c:\new\Document\web
railway init
```

### 4. Deploy Backend
```bash
cd backend
railway up
```
(Select: New Service → Backend)

### 5. Deploy Frontend  
```bash
cd ../frontend
railway up
```
(Select: New Service → Frontend)

### 6. Set Variables in Railway Dashboard
- Backend: MONGODB_URI, JWT_SECRET, NODE_ENV, PORT
- Frontend: VITE_API_URL

### 7. Verify
- Visit frontend URL
- Test login/register
- Create a project
- Done! ✅

---

## Getting Your Backend Domain

After backend deploys:
1. Go to https://railway.app/dashboard
2. Click your project → Select "backend" service
3. Look for **Domains** section
4. Copy the domain (e.g., `https://taskflow-prod-backend.up.railway.app`)
5. Use this for `VITE_API_URL` in frontend

---

## After Deployment

### Test the App
1. Visit your frontend URL
2. Register a new account
3. Choose "Admin" role
4. Create a project
5. Create a task
6. Test admin panel

### Check Logs
```bash
railway logs
```

### Update Code (GitHub Integration)
- Make changes locally
- Push to GitHub: `git push`
- Railway auto-deploys! 🚀

---

## Troubleshooting

### "Service won't deploy"
- Check logs: Railway Dashboard → Deployments → View Logs
- Common: Missing env variables or bad connection string

### "Frontend shows blank"
- Check browser console (F12)
- Verify VITE_API_URL is correct
- Hard refresh: Ctrl+Shift+R

### "API calls failing"
- Verify backend domain in frontend's VITE_API_URL
- Check backend logs
- Ensure MongoDB connection is working

### "MongoDB connection timeout"
- Test connection locally first
- Verify connection string
- Check MongoDB Atlas IP whitelist

---

## Support Links
- Railway Docs: https://docs.railway.app
- Railway Community: https://discord.gg/railway
- TaskFlow GitHub: (Your repo URL)

---

**Status: Ready to Deploy!** 🎉

Your application is production-ready. Follow the "Fast Track" steps above to deploy in 5 minutes!
