# API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-deployed-backend.com/api`

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "message": "description",
  "data": {}
}
```

---

## 🔐 Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

---

### Login User
Authenticate user and get JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "member"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

### Get Current User
Get the authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## 📁 Project Endpoints

### Create Project
Create a new project (all authenticated users can create).

**Endpoint:** `POST /projects`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Website Redesign",
  "description": "Redesign company website with modern UI"
}
```

**Response (201):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Website Redesign",
    "description": "Redesign company website with modern UI",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    },
    "members": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "admin"
      }
    ],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get All Projects
Get all projects the user is a member of.

**Endpoint:** `GET /projects`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 3,
  "projects": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Website Redesign",
      "description": "Redesign company website with modern UI",
      "createdBy": {...},
      "members": [...],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Project Details
Get details of a specific project.

**Endpoint:** `GET /projects/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id` - Project ID

**Response (200):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Website Redesign",
    "description": "...",
    "createdBy": {...},
    "members": [...]
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Project not found"
}
```

---

### Add Member to Project
Add a user to a project (project creator or admin only).

**Endpoint:** `POST /projects/:id/members`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Project ID

**Request Body:**
```json
{
  "memberId": "507f1f77bcf86cd799439013"
}
```

**Response (200):**
```json
{
  "success": true,
  "project": {
    "_id": "507f1f77bcf86cd799439012",
    "members": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe"
      },
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Jane Smith"
      }
    ]
  }
}
```

---

### Remove Member from Project
Remove a user from a project (project creator or admin only).

**Endpoint:** `DELETE /projects/:id/members`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Project ID

**Request Body:**
```json
{
  "memberId": "507f1f77bcf86cd799439013"
}
```

**Response (200):**
```json
{
  "success": true,
  "project": {...}
}
```

---

## 📋 Task Endpoints

### Create Task
Create a new task in a project.

**Endpoint:** `POST /tasks`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Design homepage mockup",
  "description": "Create desktop and mobile mockups",
  "projectId": "507f1f77bcf86cd799439012",
  "assignedTo": "507f1f77bcf86cd799439013",
  "dueDate": "2024-02-15",
  "status": "Todo"
}
```

**Response (201):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Design homepage mockup",
    "description": "Create desktop and mobile mockups",
    "status": "Todo",
    "projectId": "507f1f77bcf86cd799439012",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com"
    },
    "createdBy": {...},
    "dueDate": "2024-02-15T00:00:00Z",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Get Tasks by Project
Get all tasks in a project.

**Endpoint:** `GET /tasks/project/:projectId`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `projectId` - Project ID

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Design homepage mockup",
      "status": "In Progress",
      "assignedTo": {...},
      "dueDate": "2024-02-15T00:00:00Z",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Update Task
Update an existing task (creator, admin, or assignee only).

**Endpoint:** `PUT /tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id` - Task ID

**Request Body:**
```json
{
  "title": "Design homepage mockup",
  "description": "Create desktop and mobile mockups",
  "status": "In Progress",
  "assignedTo": "507f1f77bcf86cd799439013",
  "dueDate": "2024-02-15"
}
```

**Response (200):**
```json
{
  "success": true,
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Design homepage mockup",
    "status": "In Progress",
    "updatedAt": "2024-01-15T11:45:00Z"
  }
}
```

---

### Get Task Statistics
Get statistics for a project's tasks.

**Endpoint:** `GET /tasks/stats/:projectId`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `projectId` - Project ID

**Response (200):**
```json
{
  "success": true,
  "stats": {
    "total": 15,
    "completed": 5,
    "inProgress": 7,
    "pending": 3,
    "overdue": 2
  }
}
```

---

## Error Handling

### Common Error Codes

#### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

#### 403 Forbidden
```json
{
  "success": false,
  "message": "User role 'member' is not authorized to access this route"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "Project not found"
}
```

#### 500 Server Error
```json
{
  "success": false,
  "message": "Server error"
}
```

---

## 🧪 Example Requests

### Complete Workflow Example

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Save the token from response
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 2. Create Project
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description"
  }'

# Save project ID
PROJECT_ID="507f1f77bcf86cd799439012"

# 3. Create Task
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Task",
    "description": "Task description",
    "projectId": "'$PROJECT_ID'",
    "status": "Todo"
  }'

# 4. Get Tasks
curl -X GET http://localhost:5000/api/tasks/project/$PROJECT_ID \
  -H "Authorization: Bearer $TOKEN"

# 5. Get Stats
curl -X GET http://localhost:5000/api/tasks/stats/$PROJECT_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- JWT tokens expire in 30 days
- Passwords must be at least 6 characters
- Email must be unique per user
- All IDs are MongoDB ObjectIds
- Pagination is not implemented (consider adding for large datasets)

---

## 🔄 Rate Limiting
Currently not implemented. Consider adding for production:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

---

For questions or issues, please refer to the main README.md
