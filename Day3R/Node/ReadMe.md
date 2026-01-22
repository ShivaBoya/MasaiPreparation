# JWT & Authorization – Theoretical Notes

## 1. What is JWT (JSON Web Token)?

JWT is a compact, URL-safe token used to securely transmit information between a client and a server. It is widely used for authentication and authorization.

### Structure of JWT
A JWT consists of three parts separated by dots (`.`):

header.payload.signature

pgsql
Copy code

- **Header**  
  Contains metadata about the token, such as the signing algorithm and token type.
  ```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }
Payload
Contains claims (user data) like user ID, role, and expiration time.

json
Copy code
{
  "userId": "123",
  "role": "admin",
  "exp": 1710000000
}
Signature
Ensures token integrity and authenticity.

scss
Copy code
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
2. How Does JWT Authentication Work?
User logs in with credentials

Server validates credentials

Server generates a JWT

Client stores the token

Client sends the token in request headers

makefile
Copy code
Authorization: Bearer <token>
Server verifies signature and expiration

Access is granted or denied based on token data

3. Advantages and Disadvantages of JWT over Sessions
Advantages
Stateless (no server-side storage)

Scales well for distributed systems

Works across domains

Reduces database lookups

Disadvantages
Difficult to revoke tokens

Larger payload size

Token leakage is a security risk

Requires careful expiration handling

4. Where Should JWT Be Stored on the Client?
localStorage
Easy to implement

Vulnerable to XSS attacks

Cookies (HTTP-Only, Secure)
Protected from XSS

Automatically sent with requests

Vulnerable to CSRF (can be mitigated)

Memory (JS variables / React state)
Most secure

Lost on page refresh

Best Practice

Access Token → Memory

Refresh Token → HTTP-Only Cookie

5. Difference Between Access Tokens and Refresh Tokens
Feature	Access Token	Refresh Token
Lifetime	Short-lived	Long-lived
Purpose	Access protected APIs	Generate new access tokens
Storage	Memory	HTTP-Only Cookie
Sent with requests	Yes	No

6. Handling JWT Expiration and Refresh
Access token expires

API returns 401 Unauthorized

Client sends refresh token to refresh endpoint

Server validates refresh token

Server issues new access token

Client retries original request

7. What is Role-Based Access Control (RBAC)?
RBAC is an authorization approach where permissions are assigned based on user roles.

Example:

Admin → Full access

User → Read-only access

Roles are typically stored in the JWT payload and checked on the server.

8. How Would You Implement Authorization in an API?
Authentication Middleware

Verify JWT

Decode user data

Attach user info to request

Authorization Middleware

Check user role or permissions

Allow or deny access

Example (Express.js)
js
Copy code
const authorize = roles => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
Usage
js
Copy code
app.get("/admin", authMiddleware, authorize(["admin"]), handler);