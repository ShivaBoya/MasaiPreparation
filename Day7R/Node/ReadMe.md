1. What is Express.js? Why use it over plain Node.js?

Express.js is a minimal and flexible Node.js web framework used to build APIs and web applications.

Why Express over plain Node.js?

Simplifies routing and request handling

Built-in middleware support

Cleaner syntax and better structure

Easier error handling

Faster development and scalability

Plain Node.js requires manually handling routes, request parsing, and responses, which Express abstracts neatly.

2. What is middleware in Express? Explain the middleware chain.

Middleware is a function that runs between the request and response cycle.

(req, res, next)

Middleware Chain Flow:
Request → Middleware 1 → Middleware 2 → Route Handler → Response


Each middleware must call next() to continue

Errors are forwarded using next(error)

3. Different types of middleware in Express

Application-level middleware

app.use(middleware)


Router-level middleware

router.use(middleware)


Error-handling middleware

(err, req, res, next)


Built-in middleware

express.json()

express.urlencoded()

express.static()

Third-party middleware

morgan

cors

multer

4. How does error handling work in Express?

Errors are passed using next(err)

Express looks for middleware with 4 parameters

Error-handling middleware must be defined after routes

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

5. Difference between app.use() and app.all()
app.use()	app.all()
Used for middleware	Used for routing
Applies to all methods	Applies to all methods for a route
Path can be partial	Exact route match

Example:

app.use("/api", middleware);
app.all("/login", handler);

6. Explain routing in Express. How do route parameters work?

Routing maps HTTP methods + URLs to handlers.

app.get("/users/:id", (req, res) => {
  res.send(req.params.id);
});


:id is a route parameter

Accessed using req.params

7. Route handlers vs middleware
Middleware	Route Handler
Runs before route	Sends final response
Calls next()	Ends response
Reusable	Endpoint-specific
8. How do you handle file uploads in Express?

Using multer:

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("File uploaded");
});

9. What is morgan? Logging strategies?

Morgan is an HTTP request logging middleware.

app.use(morgan("dev"));

Logging strategies:

Console logs for development

File-based logs for production

Separate error logs

Log rotation for large systems

10. How would you structure a large Express application?
src/
 ├── routes/
 ├── controllers/
 ├── middlewares/
 ├── services/
 ├── models/
 ├── utils/
 ├── app.js
 └── server.js


Benefits:

Separation of concerns

Easy scalability

Maintainable codebase

Machine Coding Question
Custom Middleware Chain
Requirements Implemented:

Logging Middleware

Authentication Middleware

Request Timing Middleware

Error Handling Middleware

Proper middleware chaining and error propagation