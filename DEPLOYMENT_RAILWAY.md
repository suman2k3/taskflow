# Railway Deployment Guide

Deploy your TaskFlow application to Railway in minutes!

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Railway Account** - Sign up at https://railway.app
3. **MongoDB Atlas** - Already configured (using existing connection)

---

## Option 1: Deploy with Railway CLI (Recommended)

### Step 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

Or download from: https://railway.app/download

### Step 2: Login to Railway

```bash
railway login
```

This will open a browser window to authenticate.

### Step 3: Push Code to GitHub

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub
3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
   git branch -M main
   git push -u origin main
   ```

### Step 4: Create Railway Project

```bash
cd c:\new\Document\web
railway init
```

This creates a `railway.json` file. Update it:

```json
{
  "name": "taskflow",
  "services": [
    {
      "name": "backend",
      "root": "backend"
    },
    {
      "name": "frontend",
      "root": "frontend"
    }
  ]
}
```

### Step 5: Deploy Backend

```bash
cd backend
railway up
```

During deployment, Railway will ask you to:
- Select your service (choose "New Service")
- Name it "backend"

### Step 6: Configure Backend Environment Variables

After backend deploys, go to https://railway.app and:

1. Click your project
2. Select "backend" service
3. Go to **Variables** tab
4. Add these variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: mysecret123 (change in production!)
   - `PORT`: 3001 (Railway will auto-assign, or use default)
   - `NODE_ENV`: production

5. Click **Deploy** to restart with new variables

### Step 7: Get Backend URL

In the backend service:
- Look for the **Domains** section
- Copy the domain URL (e.g., `https://taskflow-backend-prod.up.railway.app`)
- This is your `VITE_API_URL`

### Step 8: Deploy Frontend

```bash
cd ../frontend
railway up
```

### Step 9: Configure Frontend Environment Variables

In Railway frontend service, add:
- `VITE_API_URL`: `https://your-backend-domain.up.railway.app/api`

### Step 10: Redeploy Frontend

Redeploy frontend to apply the new API URL:
```bash
railway up --force
```

---

## Option 2: Deploy with GitHub Integration (Easiest)

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
git push -u origin main
```

### Step 2: Link Railway to GitHub

1. Go to https://railway.app
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Connect your GitHub account
5. Select your `taskflow` repository

### Step 3: Create Services

Railway will auto-detect your monorepo. Create two services:

**Backend Service:**
- Root directory: `backend`
- Start command: `npm start`
- Port: 3001

**Frontend Service:**
- Root directory: `frontend`
- Build command: `npm run build`
- Start command: `npm run preview`
- Environment: `VITE_API_URL=https://your-backend-url/api`

### Step 4: Set Environment Variables

**Backend Service:**
```
MONGODB_URI=mongodb://your-connection-string
JWT_SECRET=mysecret123
PORT=3001
NODE_ENV=production
```

**Frontend Service:**
```
VITE_API_URL=https://your-backend-domain.up.railway.app/api
```

### Step 5: Deploy

Click the **Deploy** button on both services!

---

## Verifying Deployment

### Test Backend

```bash
curl https://your-backend-domain.up.railway.app/api/auth/me
# Should return 401 (unauthorized - expected since no token)
```

### Test Frontend

Visit: `https://your-frontend-domain.up.railway.app`

You should see the TaskFlow login page!

---

## Troubleshooting

### Backend Won't Start

Check logs in Railway dashboard:
```
Typical issues:
- MongoDB URI invalid → Check MONGODB_URI variable
- Port already in use → Railway auto-assigns, should be fine
- Missing dependencies → Run `npm install` locally and push
```

### Frontend Shows Blank Page

- Check browser console (F12) for errors
- Verify `VITE_API_URL` is correct and has `/api` suffix
- Hard refresh: `Ctrl+Shift+R`

### API Calls Failing (CORS Error)

Backend CORS is already configured. If still failing:
- Verify backend domain in `VITE_API_URL`
- Check backend logs for actual errors
- Ensure `NODE_ENV=production` is set

### MongoDB Connection Timeout

- Verify connection string is correct
- Check MongoDB Atlas IP whitelist includes Railway IPs
- Use "Allow all IPs" for testing: `0.0.0.0/0`

---

## Production Recommendations

### Security Improvements

1. **Change JWT Secret:**
   ```
   JWT_SECRET=your-very-secure-random-string
   ```

2. **Set NODE_ENV to production:**
   ```
   NODE_ENV=production
   ```

3. **Enable HTTPS** (Railway does this automatically)

4. **Add Rate Limiting** (optional):
   Add this to backend `src/server.js`:
   ```javascript
   import rateLimit from 'express-rate-limit';
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 100
   });
   app.use(limiter);
   ```

5. **Use Environment-Specific URLs:**
   - Frontend should use `process.env.VITE_API_URL` (set via Railway variables)
   - Never hardcode URLs in code

### Performance Optimizations

1. **Enable compression** (already in code)
2. **MongoDB indexing** (will add if needed)
3. **Frontend build optimization** (Vite handles automatically)

---

## Next Steps

After deployment:

1. **Test all features:**
   - Register → Create project → Create task → Update task
   - Add member → View admin panel

2. **Monitor logs:**
   - Check Railway dashboard for errors
   - Review user activity

3. **Custom Domain** (optional):
   - In Railway settings, add custom domain
   - Configure DNS records

4. **Auto-Deployments:**
   - Railway will auto-deploy on GitHub push if using GitHub integration

---

## Support

For Railway help: https://docs.railway.app
For app issues: Check logs in Railway dashboard

Happy deploying! 🚀
