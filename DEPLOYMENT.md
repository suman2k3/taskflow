# Setup & Deployment Guide

## 🚀 Local Development Setup

### Step 1: Install Node.js
Download and install Node.js v16 or higher from https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### Step 2: Set Up MongoDB

#### Option A: MongoDB Atlas (Recommended for Production)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster:
   - Click "Create" on left sidebar
   - Choose free tier
   - Name your cluster
   - Select region closest to you
3. Create database user:
   - Go to Security > Database Access
   - Click "Add New Database User"
   - Set username and password
   - Choose read/write access
4. Configure IP whitelist:
   - Go to Security > Network Access
   - Click "Add IP Address"
   - Select "Allow access from anywhere" (for development)
   - For production, add specific IPs
5. Get connection string:
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

#### Option B: Local MongoDB
1. Download from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Local connection string: `mongodb://localhost:27017/taskmanagement`

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create/update .env file with your values
# Edit .env with your MongoDB URI and JWT secret
```

Update `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_12345_change_in_production
NODE_ENV=development
```

Start backend:
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Backend will be available at: `http://localhost:5000`

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 📦 Production Build

### Build Backend
```bash
cd backend
# No build step needed, just ensure dependencies are installed
npm install --production
```

### Build Frontend
```bash
cd frontend
npm run build
# Output in dist/ directory
```

---

## 🚀 Deployment Options

## Option 1: Railway Deployment (Recommended for Full-Stack)

### Prerequisites
- Railway account (https://railway.app)
- GitHub account
- Git installed

### Backend Deployment

1. **Push code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/taskmanagement.git
git push -u origin main
```

2. **Create Railway project:**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your repository
   - Select `backend` directory as root

3. **Add MongoDB:**
   - In your Railway project, click "Add"
   - Select "MongoDB"
   - Railway will generate `MONGODB_URI` automatically

4. **Configure environment variables:**
```
PORT=5000
JWT_SECRET=your_secret_key_here_change_this_in_production
NODE_ENV=production
MONGODB_URI=auto-filled by Railway
```

5. **Deploy:**
   - Railway auto-deploys when you push to main
   - Get your backend URL from Railway dashboard

### Frontend Deployment on Vercel

1. **Build frontend:**
```bash
cd frontend
npm run build
```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Set build command: `npm run build`
   - Set output directory: `dist`
   - Add environment variable:
     ```
     VITE_API_URL=https://your-railway-backend-url/api
     ```
   - Deploy

---

## Option 2: Render.com Deployment

### Backend Deployment

1. **Push to GitHub:**
```bash
git push origin main
```

2. **Connect to Render:**
   - Go to https://render.com
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select branch: `main`
   - Set root directory: `backend`

3. **Configure:**
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment variables:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
   - Deploy

### Frontend Deployment

```bash
# Build first
cd frontend
npm run build
```

Deploy to Vercel, Netlify, or Render:

**Vercel:**
- Connect GitHub repo
- Build command: `npm run build`
- Output: `dist`

**Netlify:**
- Connect GitHub repo
- Build command: `npm run build`
- Publish directory: `dist`

---

## Option 3: Docker Deployment (Advanced)

### Backend Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

### Frontend Dockerfile
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://mongo:27017/taskmanagement
      JWT_SECRET: your_secret_key
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    environment:
      VITE_API_URL: http://backend:5000/api

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

Deploy with Docker:
```bash
docker-compose up -d
```

---

## 🔧 Environment Variables Reference

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/taskmanagement

# Authentication
JWT_SECRET=your_super_secret_key_minimum_32_characters_long

# CORS (optional, defaults to *)
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-url/api
```

---

## ✅ Deployment Checklist

- [ ] MongoDB cluster created and configured
- [ ] Environment variables set in production
- [ ] Backend deployed and running
- [ ] Frontend built and deployed
- [ ] API URL correctly configured in frontend
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Database backups configured
- [ ] Monitoring/logging enabled
- [ ] SSL certificates valid
- [ ] CORS configured correctly
- [ ] Security headers set
- [ ] Environment variables use strong values

---

## 🧪 Testing Production Deployment

After deployment, test these:

1. **Register new user:**
```bash
curl -X POST https://your-backend-url/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

2. **Login:**
```bash
curl -X POST https://your-backend-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

3. **Create project:**
```bash
curl -X POST https://your-backend-url/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "Testing deployment"
  }'
```

4. **Verify frontend loads:**
   - Visit your frontend URL
   - Should redirect to login
   - Login with your test account
   - Dashboard should load

---

## 🚨 Troubleshooting Deployment

### Backend won't start
```bash
# Check logs
heroku logs --tail
railway logs  # for Railway
```

### Frontend API connection failing
- Verify API URL in environment variables
- Check CORS configuration in backend
- Ensure JWT token is being sent correctly

### Database connection refused
- Check IP whitelist in MongoDB Atlas
- Verify connection string is correct
- Ensure database user has right permissions
- Check network connectivity

### SSL/HTTPS issues
- Most platforms auto-enable HTTPS
- If manual, use Let's Encrypt
- Update API URL to use HTTPS

### Performance issues
- Enable MongoDB indexing
- Use database query optimization
- Implement caching on frontend
- Use CDN for static assets

---

## 📊 Monitoring & Logging

### Backend Logging
Add Winston or Pino for better logging:
```bash
npm install winston
```

### Database Monitoring
- MongoDB Atlas: Built-in monitoring
- Railway: Built-in metrics
- Render: Built-in metrics

### Frontend Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage tracking

---

## 🔒 Security Best Practices

1. **Environment Variables:**
   - Never commit `.env` files
   - Use strong JWT secrets (32+ characters)
   - Change default passwords

2. **Database:**
   - Use MongoDB Atlas IP whitelist
   - Enable authentication
   - Regular backups
   - Use SSL/TLS connections

3. **API Security:**
   - Implement rate limiting
   - Use HTTPS only
   - CORS properly configured
   - Input validation on all endpoints

4. **Frontend:**
   - Secure token storage (localStorage ok for now, use httpOnly cookies for production)
   - XSS protection
   - CSRF protection

---

## 📈 Scaling

As your app grows:

1. **Database:**
   - Add indexes to frequently queried fields
   - Consider database replication
   - Archive old data

2. **Backend:**
   - Add caching with Redis
   - Implement job queues for async tasks
   - Load balancing

3. **Frontend:**
   - Code splitting with React.lazy
   - Image optimization
   - CDN distribution

---

For more help, check the main README.md or contact support.
