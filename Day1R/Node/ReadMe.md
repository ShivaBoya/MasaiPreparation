# Day 1 – HTTP Fundamentals & REST APIs

## 1. What is HTTP and how does it work?
HTTP (HyperText Transfer Protocol) is a client-server communication protocol used on the web.
A client sends an HTTP request to a server, and the server responds with an HTTP response.
This is called the request–response cycle.

Steps:
1. Client sends request (method, URL, headers, body)
2. Server processes the request
3. Server sends response (status code, headers, body)
4. Connection closes or stays alive (keep-alive)

---

## 2. HTTP Methods
- GET: Retrieve data
- POST: Create new data
- PUT: Replace existing data completely
- PATCH: Update part of existing data
- DELETE: Remove data

---

## 3. HTTP Status Codes
- 2xx: Success (200 OK, 201 Created)
- 3xx: Redirection (301, 302)
- 4xx: Client errors (400 Bad Request, 404 Not Found)
- 5xx: Server errors (500 Internal Server Error)

---

## 4. HTTP Headers
Headers send metadata about request/response.

Common Request Headers:
- Content-Type
- Authorization
- Accept

Common Response Headers:
- Content-Type
- Cache-Control
- Set-Cookie

---

## 5. Stateless vs Stateful
- Stateless: Server does not store client state between requests
- Stateful: Server remembers client state

HTTP is stateless.

---

## 6. Idempotency
An operation is idempotent if multiple identical requests produce the same result.

Idempotent methods:
- GET
- PUT
- DELETE

Not idempotent:
- POST

---

## 7. REST
REST (Representational State Transfer) is an architectural style for APIs.

Principles:
- Client–Server separation
- Statelessness
- Resource-based URLs
- Use of HTTP methods
- Uniform interface

---

## 8. API Versioning
Common approaches:
- URL versioning: /api/v1/tasks
- Query params: /api/tasks?version=1
- Headers: Accept-Version: v1

---

## Task API

### Endpoints
- GET /tasks
- GET /tasks/:id
- POST /tasks
- PUT /tasks/:id
- PATCH /tasks/:id
- DELETE /tasks/:id

### Run
```bash
npm install express
node server.js
