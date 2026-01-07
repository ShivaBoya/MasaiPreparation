Task Manager REST API
Objective
Build a secure REST API for a Task Manager application using Node.js and Express. The API should have protected endpoints that require API key authentication passed via query parameters.

Technology Stack (Required)
Node.js with Express.js - MUST use Express to create the server
MongoDB with Mongoose
dotenv for environment variables
uuid or crypto for generating API keys
Middleware for route protection
Server Setup Requirement
You MUST use Express.js to create your server. Express should handle:

All HTTP request routing (GET, POST, PUT, PATCH, DELETE)
Middleware implementation and execution
Request/response handling
JSON parsing with express.json()
Server listening on specified port
Initial Dummy Data for MongoDB
Tasks Collection (tasks.json)
[
  {
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation for the API project including setup instructions and endpoint details",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-02-15",
    "tags": ["documentation", "urgent"],
    "createdAt": "2024-01-10T10:00:00.000Z"
  },
  {
    "title": "Fix login bug",
    "description": "Resolve the authentication issue where users are getting logged out randomly",
    "status": "todo",
    "priority": "critical",
    "dueDate": "2024-02-08",
    "tags": ["bug", "authentication"],
    "createdAt": "2024-01-12T14:30:00.000Z"
  },
  {
    "title": "Design new dashboard",
    "description": "Create wireframes and mockups for the new analytics dashboard",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2024-01-20",
    "tags": ["design", "ui"],
    "createdAt": "2024-01-05T09:15:00.000Z"
  },
  {
    "title": "Database optimization",
    "description": "Improve query performance and add indexes to frequently accessed collections",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2024-02-10",
    "tags": ["database", "performance"],
    "createdAt": "2024-01-08T11:20:00.000Z"
  },
  {
    "title": "Code review for PR #234",
    "description": "Review and provide feedback on the new feature implementation",
    "status": "todo",
    "priority": "low",
    "dueDate": "2024-02-05",
    "tags": ["review", "code-quality"],
    "createdAt": "2024-01-15T16:45:00.000Z"
  }
]

API Endpoints
1. Generate API Key (PUBLIC - No authentication required)
POST /api/auth/generate-key

Request Body:

{
  "email": "user@example.com"
}

Response (Success - 201):

{
  "success": true,
  "message": "API key generated successfully",
  "data": {
    "email": "user@example.com",
    "apiKey": "ak_1234567890abcdef"
  }
}

Response (Error - If email already exists):

{
  "success": false,
  "message": "Email already registered. Use existing API key."
}

2. Get All Tasks (PROTECTED)
GET /api/tasks?apiKey=YOUR_API_KEY

Query Parameters:

apiKey (required) - Your API key
status (optional) - Filter by status (todo, in-progress, completed)
priority (optional) - Filter by priority
sortBy (optional) - Sort field (createdAt, dueDate, priority)
Response (Success - 200):

{
  "success": true,
  "count": 5,
  "data": [/* array of tasks */]
}

3. Get Single Task (PROTECTED)
GET /api/tasks/:id?apiKey=YOUR_API_KEY

Response (Success - 200):

{
  "success": true,
  "data": {/* task object */}
}

4. Create New Task (PROTECTED)
POST /api/tasks?apiKey=YOUR_API_KEY

Request Body:

{
  "title": "New task title",
  "description": "Task description",
  "status": "todo",
  "priority": "medium",
  "dueDate": "2024-03-01",
  "tags": ["work", "important"]
}

Response (Success - 201):

{
  "success": true,
  "message": "Task created successfully",
  "data": {/* created task object */}
}

5. Update Task (PROTECTED)
PUT /api/tasks/:id?apiKey=YOUR_API_KEY - Full update

PATCH /api/tasks/:id?apiKey=YOUR_API_KEY - Partial update

Request Body (example):

{
  "status": "completed",
  "priority": "high"
}

Response (Success - 200):

{
  "success": true,
  "message": "Task updated successfully",
  "data": {/* updated task object */}
}

6. Delete Task (PROTECTED)
DELETE /api/tasks/:id?apiKey=YOUR_API_KEY

Response (Success - 200):

{
  "success": true,
  "message": "Task deleted successfully"
}

Unauthorized Access Error Response
All protected endpoints should return this when API key is missing or invalid:

Response (401 Unauthorized):

{
  "success": false,
  "message": "Unauthorized access. Valid API key required.",
  "error": "Invalid or missing API key"
}

Technical Requirements
1. Middleware Implementation (MANDATORY)
Create an authentication middleware verifyApiKey.js:

Requirements:

Check for API key in query parameters (req.query.apiKey)
Validate API key against the database
If valid, allow request to proceed to route handler
If invalid/missing, return 401 Unauthorized error
Middleware should be reusable across all protected routes
Example Usage:

// Apply to specific routes
router.get('/tasks', verifyApiKey, taskController.getAllTasks);

// Or apply to all routes in a router
router.use(verifyApiKey);

2. API Key Generation
Use crypto or uuid to generate unique API keys
Format: ak_ + random string (e.g., ak_7f8d9e2a4b5c6d1e)
Store hashed version in database (optional but recommended)
Each email should have only one API key
3. Error Handling
Implement proper error handling for:

Missing required fields
Invalid task ID (not found)
Database connection errors
Duplicate email registration
Invalid API key
Malformed request body
4. Input Validation
Validate email format
Validate task status values
Validate priority values
Validate date formats
Sanitize user inputs
5. Environment Variables
Create a .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
NODE_ENV=development

Evaluation Criteria
✅ Express.js used to create and configure the server
✅ All CRUD operations work correctly
✅ Middleware properly validates API keys from query params
✅ Protected routes return 401 without valid API key
✅ API key generation endpoint works and stores data in MongoDB
✅ Proper error handling with appropriate HTTP status codes
✅ MongoDB connection established successfully
✅ Code is well-organized with separation of concerns
✅ Input validation implemented
✅ RESTful principles followed
✅ No hardcoded sensitive data (use environment variables)
✅ Express middleware (express.json()) used for parsing JSON