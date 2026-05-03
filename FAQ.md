# FAQ & Common Issues

## ❓ Frequently Asked Questions

### Setup & Installation

#### Q: Do I need MongoDB locally or can I use MongoDB Atlas?
**A:** You can use either:
- **Local MongoDB** - Better for development
- **MongoDB Atlas** - Better for production (free tier available)

We recommend MongoDB Atlas for production deployment.

#### Q: I don't have a MongoDB account yet. How do I set one up?
**A:** 
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create free account
4. Create a free cluster (M0 tier)
5. Create a database user
6. Get connection string
7. Add to `.env` as `MONGODB_URI`

#### Q: What Node.js version do I need?
**A:** Node.js v16 or higher. Check with:
```bash
node --version
```

#### Q: Can I use npm instead of yarn?
**A:** Yes! Both work the same. Use whichever you prefer.

---

### Authentication & Security

#### Q: I forgot my JWT secret. Can I change it?
**A:** Yes:
1. Generate new secret:
   ```bash
   openssl rand -base64 32
   ```
2. Update in `.env`
3. All existing tokens become invalid
4. Users will need to login again

#### Q: How do I reset a user's password?
**A:** Currently not implemented. To add:
1. Create "Forgot Password" route
2. Send reset email with token
3. Allow password reset with token
4. See DEPLOYMENT.md for email service setup

#### Q: Are passwords actually secure?
**A:** Yes! We use bcrypt with:
- 10 salt rounds
- Industry standard password hashing
- Passwords never stored in plain text

#### Q: How long do JWT tokens last?
**A:** 30 days. After that, user must login again.

---

### Project & Task Management

#### Q: Can I assign a task to someone not in the project?
**A:** No. You can only assign to project members. 
To assign to someone new:
1. Click "Add Member" in project
2. Enter their user ID
3. Then assign task to them

#### Q: Can members create projects?
**A:** Currently yes, all authenticated users can create projects. To restrict:
1. Edit `backend/src/controllers/projectController.js`
2. In `createProject`, add role check:
   ```javascript
   if (req.user.role !== 'admin') {
     return res.status(403).json({...});
   }
   ```

#### Q: How do I filter tasks by assignee?
**A:** Currently, filtering is by status only. To add assignee filtering:
1. Update `frontend/src/pages/ProjectDetail.jsx`
2. Add assignee filter buttons
3. Filter tasks client-side or add backend endpoint

---

### Frontend & Styling

#### Q: How do I change the app colors?
**A:** Edit `frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
    }
  },
}
```

#### Q: Can I add more pages?
**A:** Yes! Add new page:
1. Create file in `frontend/src/pages/`
2. Add route in `App.jsx`
3. Import and use in Routes

Example:
```javascript
import MyNewPage from './pages/MyNewPage';

// In Routes:
<Route path="/new-page" element={<ProtectedRoute><MyNewPage /></ProtectedRoute>} />
```

#### Q: How do I modify the sidebar?
**A:** Edit `frontend/src/components/Sidebar.jsx`
- Add new navigation buttons
- Change colors
- Update logout functionality

#### Q: Can I use a different CSS framework instead of Tailwind?
**A:** Yes, but you'll need to:
1. Install new framework
2. Update all className attributes
3. Update config files
4. Rebuild CSS

---

### Backend & API

#### Q: How do I add a new endpoint?
**A:** Follow this pattern:

1. **Create controller method** in `src/controllers/`:
```javascript
export const myNewEndpoint = async (req, res) => {
  try {
    // your logic
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

2. **Add route** in `src/routes/`:
```javascript
router.get('/my-endpoint', protect, myNewEndpoint);
```

3. **Update in server.js** if new route file:
```javascript
import myRoutes from './routes/myRoutes.js';
app.use('/api/my', myRoutes);
```

#### Q: How do I add validation?
**A:** Add checks in controller:
```javascript
if (!title || !title.trim()) {
  return res.status(400).json({
    success: false,
    message: 'Title is required'
  });
}
```

#### Q: Can I add rate limiting?
**A:** Yes, use express-rate-limit:
```bash
npm install express-rate-limit
```

Then in `server.js`:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

#### Q: How do I log errors for debugging?
**A:** Add console.log or use Winston:
```bash
npm install winston
```

In controller:
```javascript
console.error('Error details:', error);
// or with Winston:
logger.error('Error:', error);
```

---

### Database & MongoDB

#### Q: How do I backup my database?
**A:** MongoDB Atlas has built-in backups:
1. Go to MongoDB Atlas dashboard
2. Select Backup > Snapshots
3. Click Create Backup

#### Q: Can I query the database directly?
**A:** Yes! Use MongoDB Compass:
1. Download from https://www.mongodb.com/products/compass
2. Connect with your connection string
3. Browse and query data

#### Q: What if I want to add more fields to User?
**A:** 
1. Edit `backend/src/models/User.js`
2. Add field to schema
3. Update registration/profile endpoints
4. Update frontend forms

Example:
```javascript
// In User schema
phoneNumber: {
  type: String,
  default: null
}
```

#### Q: How do I clear all data from database?
**A:** ⚠️ WARNING: This deletes everything!

Using MongoDB Compass:
1. Right-click collection
2. Select "Drop collection"

Or via CLI:
```bash
use taskmanagement
db.users.deleteMany({})
db.projects.deleteMany({})
db.tasks.deleteMany({})
```

---

### Deployment

#### Q: Which hosting platform is best?
**A:** 
- **Railway** - Best for full-stack (we recommend)
- **Vercel** - Best for frontend
- **Render** - Good alternative to Railway
- **Heroku** - Good but not free anymore

#### Q: How much will it cost?
**A:** 
- **Free tier:** Railway ($5 free/month), Vercel (free), MongoDB Atlas (free)
- **Low usage:** ~$5-10/month
- **Production:** $20-50/month depending on traffic

#### Q: Can I deploy on my own server?
**A:** Yes, but you need:
- VPS (DigitalOcean, Linode, etc.)
- Docker (optional)
- Nginx/Apache for reverse proxy
- SSL certificate (Let's Encrypt)
- Database server

#### Q: How do I update the deployed app?
**A:** 
1. Push changes to GitHub
2. Railway/Render auto-deploy on push
3. For frontend, redeploy from Vercel

#### Q: What if deployment fails?
**A:** Check logs:
```bash
# Railway
railway logs

# Vercel
vercel logs --tail

# Render
Check dashboard
```

---

### Performance & Optimization

#### Q: The app is slow. How do I optimize?
**A:** 
1. **Database:** Add indexes to frequently queried fields
2. **Frontend:** Use React.memo for components
3. **Backend:** Add caching with Redis
4. **Network:** Use CDN for static files
5. **Code:** Profile with browser DevTools

#### Q: How do I monitor performance?
**A:** Use:
- **New Relic** - Application monitoring
- **DataDog** - Infrastructure monitoring
- **Sentry** - Error tracking
- **LogRocket** - User session replay

#### Q: How do I handle many concurrent users?
**A:** 
1. Use database connection pooling
2. Add load balancing
3. Implement caching
4. Use message queues for async tasks
5. Consider microservices

---

### Common Errors & Solutions

#### Error: "MongoDB connection refused"
**Solution:**
1. Check connection string in `.env`
2. Verify IP in MongoDB Atlas whitelist
3. Check database user exists
4. Restart backend service

#### Error: "Port 5000 already in use"
**Solution:**
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

#### Error: "Cannot GET /api/projects"
**Solution:**
1. Verify backend is running
2. Check token is valid
3. Ensure route exists
4. Check middleware order in server.js

#### Error: "CORS error"
**Solution:**
Update `backend/src/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

#### Error: "Invalid token"
**Solution:**
1. Token may have expired (30 days)
2. User needs to login again
3. JWT_SECRET may have changed
4. Token may be malformed

#### Error: "Not authorized to access"
**Solution:**
1. User doesn't have required role
2. User isn't member of project
3. Wrong resource ownership
4. Check authorization middleware

---

### Tips & Best Practices

#### Development Tips
1. Use `.env` for all sensitive data
2. Always validate input on backend
3. Use meaningful variable names
4. Comment complex logic
5. Test endpoints with Postman/Insomnia
6. Keep components small and focused

#### Security Tips
1. Never commit `.env` files
2. Use strong JWT secrets
3. Hash passwords with bcrypt
4. Validate all user input
5. Use HTTPS in production
6. Keep dependencies updated
7. Use environment variables

#### Performance Tips
1. Add database indexes
2. Use pagination for large datasets
3. Implement caching
4. Optimize images
5. Lazy load components
6. Minimize bundle size
7. Use CDN for static files

#### Code Quality Tips
1. Follow naming conventions
2. Use meaningful comments
3. Keep functions small
4. DRY principle (Don't Repeat Yourself)
5. Use error handling
6. Test before deploying
7. Use version control

---

#### Productivity Tips
1. Use VS Code extensions (ES7, Prettier)
2. Use terminal shortcuts
3. Keep docs updated
4. Document decisions
5. Use Git branches for features
6. Review code before merge
7. Automate tests

---

## 🚨 Emergency Fixes

### App completely broken?
```bash
# Reinstall everything
rm -rf node_modules
npm install
npm start
```

### Lost database?
```bash
# Create new cluster in MongoDB Atlas
# Update MONGODB_URI in .env
# Data will be gone but app works
```

### Can't login?
```bash
# MongoDB might be down
# Check MongoDB Atlas status
# Or restart local MongoDB
```

### Frontend not loading?
```bash
# Clear cache
Ctrl+Shift+Delete (Chrome)

# Rebuild
npm run build
npm run dev
```

---

## 📖 Documentation Reference

- **QUICKSTART.md** - Start here for setup
- **API.md** - API endpoint reference
- **DEPLOYMENT.md** - Deployment instructions
- **README.md** - Complete feature list
- **PROJECT_STRUCTURE.md** - File overview

---

## 🤝 Getting Help

1. **Check relevant documentation** first
2. **Google the error message**
3. **Check Stack Overflow**
4. **Review GitHub issues** (if applicable)
5. **Ask in developer communities**

---

**Still need help? Check the documentation files or the code comments!**
