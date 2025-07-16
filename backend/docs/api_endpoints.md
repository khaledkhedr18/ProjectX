# API Endpoints Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All endpoints except `/auth/register` and `/auth/login` require authentication via Bearer token in the Authorization header.

### Headers Required for Protected Routes:
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

---

## 🔐 Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

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
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Email already exists
- `500`: Server error

---

### Login User
**POST** `/auth/login`

Authenticate user and get access token.

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
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Invalid email or password
- `500`: Server error

---

## 📋 Task Management Endpoints

### Create Task
**POST** `/tasks`

Create a new task for the authenticated user.

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs for frontend team",
  "priority": "high",
  "deadline": "2025-07-25T10:00:00.000Z",
  "duration": 120
}
```

**Response (201):**
```json
{
  "_id": "task_id",
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs for frontend team",
  "priority": "high",
  "deadline": "2025-07-25T10:00:00.000Z",
  "duration": 120,
  "status": "pending",
  "user": "user_id",
  "createdAt": "2025-07-16T10:00:00.000Z",
  "updatedAt": "2025-07-16T10:00:00.000Z"
}
```

**Field Constraints:**
- `title`: Required, string
- `description`: Optional, string
- `priority`: Optional, enum: ["low", "medium", "high"], default: "medium"
- `deadline`: Optional, date
- `duration`: Optional, number (minutes), minimum: 0

---

### Get All Tasks
**GET** `/tasks`

Retrieve all tasks for the authenticated user.

**Response (200):**
```json
[
  {
    "_id": "task_id",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "priority": "high",
    "status": "pending",
    "deadline": "2025-07-25T10:00:00.000Z",
    "duration": 120,
    "user": "user_id",
    "createdAt": "2025-07-16T10:00:00.000Z",
    "updatedAt": "2025-07-16T10:00:00.000Z"
  }
]
```

---

### Get Single Task
**GET** `/tasks/:id`

Retrieve a specific task by ID (only if it belongs to the authenticated user).

**URL Parameters:**
- `id`: Task ID

**Response (200):**
```json
{
  "_id": "task_id",
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs",
  "priority": "high",
  "status": "pending",
  "deadline": "2025-07-25T10:00:00.000Z",
  "duration": 120,
  "user": "user_id",
  "createdAt": "2025-07-16T10:00:00.000Z",
  "updatedAt": "2025-07-16T10:00:00.000Z"
}
```

**Error Responses:**
- `404`: Task not found

---

### Update Task
**PUT** `/tasks/:id`

Update a specific task (only if it belongs to the authenticated user).

**URL Parameters:**
- `id`: Task ID

**Request Body:** (All fields optional)
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "low",
  "deadline": "2025-07-30T15:00:00.000Z",
  "duration": 90
}
```

**Response (200):**
```json
{
  "_id": "task_id",
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "low",
  "deadline": "2025-07-30T15:00:00.000Z",
  "duration": 90,
  "status": "pending",
  "user": "user_id",
  "createdAt": "2025-07-16T10:00:00.000Z",
  "updatedAt": "2025-07-16T12:00:00.000Z"
}
```

---

### Delete Task
**DELETE** `/tasks/:id`

Delete a specific task (only if it belongs to the authenticated user).

**URL Parameters:**
- `id`: Task ID

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**
- `404`: Task not found

---

### Update Task Status
**PATCH** `/tasks/:id/status`

Update only the status of a specific task.

**URL Parameters:**
- `id`: Task ID

**Request Body:**
```json
{
  "status": "completed"
}
```

**Valid Status Values:**
- `"pending"`
- `"in-progress"`
- `"completed"`

**Response (200):**
```json
{
  "message": "Task marked as completed",
  "task": {
    "_id": "task_id",
    "title": "Complete project documentation",
    "status": "completed",
    "completedAt": "2025-07-16T14:00:00.000Z",
    "user": "user_id",
    "createdAt": "2025-07-16T10:00:00.000Z",
    "updatedAt": "2025-07-16T14:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Invalid status value
- `404`: Task not found

---

## 🔍 Advanced Task Endpoints

### Get Filtered Tasks
**GET** `/tasks/filter`

Retrieve tasks with advanced filtering, sorting, search, and pagination.

**Query Parameters:**
- `status`: Filter by status ("pending", "in-progress", "completed")
- `priority`: Filter by priority ("low", "medium", "high")
- `search`: Search in title and description
- `sortBy`: Sort field (default: "createdAt")
- `order`: Sort order ("asc" or "desc", default: "desc")
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

**Example Request:**
```
GET /tasks/filter?status=pending&priority=high&search=documentation&sortBy=deadline&order=asc&page=1&limit=5
```

**Response (200):**
```json
{
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "priority": "high",
      "status": "pending",
      "deadline": "2025-07-25T10:00:00.000Z",
      "duration": 120,
      "user": "user_id",
      "createdAt": "2025-07-16T10:00:00.000Z",
      "updatedAt": "2025-07-16T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalTasks": 15,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### Get Task Statistics
**GET** `/tasks/stats`

Get statistics and analytics for the authenticated user's tasks.

**Response (200):**
```json
{
  "totalTasks": 25,
  "completedTasks": 18,
  "completionRate": 72,
  "statusBreakdown": [
    {
      "_id": "completed",
      "count": 18
    },
    {
      "_id": "pending",
      "count": 5
    },
    {
      "_id": "in-progress",
      "count": 2
    }
  ],
  "priorityBreakdown": [
    {
      "_id": "high",
      "count": 8
    },
    {
      "_id": "medium",
      "count": 12
    },
    {
      "_id": "low",
      "count": 5
    }
  ]
}
```

---

## 🚫 Error Handling

### Common Error Responses

**401 Unauthorized:**
```json
{
  "message": "Not authorized, no token"
}
```

**401 Token Failed:**
```json
{
  "message": "Not authorized, token failed"
}
```

**404 Not Found:**
```json
{
  "message": "Task not found"
}
```

**400 Bad Request:**
```json
{
  "message": "Error creating task",
  "error": "Validation error details"
}
```

**500 Server Error:**
```json
{
  "message": "Server error"
}
```

---

## 📝 Task Model Schema

```javascript
{
  "_id": "ObjectId",
  "title": "String (required)",
  "description": "String (optional)",
  "date": "Date (default: now)",
  "priority": "String (enum: ['low', 'medium', 'high'], default: 'medium')",
  "status": "String (enum: ['pending', 'in-progress', 'completed'], default: 'pending')",
  "reminders": ["Date"],
  "linkToNote": "ObjectId (ref: Note)",
  "duration": "Number (minutes, min: 0)",
  "deadline": "Date (optional)",
  "attachments": ["String (URLs/file paths)"],
  "user": "ObjectId (ref: User, required)",
  "completedAt": "Date (set when status = 'completed')",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

---

## 👤 User Model Schema

```javascript
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (hashed, required)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

---

## 🛠️ Usage Examples for Frontend

### Authentication Flow
```javascript
// Register
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});

// Store token
const { token } = await registerResponse.json();
localStorage.setItem('token', token);

// Use token for protected requests
const tasksResponse = await fetch('/api/tasks', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
```

### Task Management
```javascript
// Create task
const newTask = await fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'New Task',
    priority: 'high',
    deadline: '2025-07-25T10:00:00.000Z'
  })
});

// Update task status
const statusUpdate = await fetch(`/api/tasks/${taskId}/status`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ status: 'completed' })
});

// Get filtered tasks
const filteredTasks = await fetch('/api/tasks/filter?status=pending&priority=high', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

---

## 🔄 Status Codes Summary

- `200`: Success
- `201`: Created
- `400`: Bad Request / Validation Error
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

---

**Last Updated:** July 16, 2025
**API Version:** 1.0
**Backend Framework:** Node.js + Express.js
**Database:** MongoDB
