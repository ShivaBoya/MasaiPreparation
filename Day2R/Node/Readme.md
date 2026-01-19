# HTTPS, Security & Authentication

## 1. What is HTTPS? How is it different from HTTP?
HTTPS (HyperText Transfer Protocol Secure) is HTTP over SSL/TLS encryption.
- HTTP sends data in plain text
- HTTPS encrypts data, preventing man-in-the-middle attacks

HTTPS provides:
- Encryption
- Data integrity
- Authentication of the server

---

## 2. SSL/TLS and Handshake Process
SSL/TLS is a cryptographic protocol used to secure communication.

Handshake steps:
1. Client sends supported TLS versions and ciphers
2. Server responds with certificate
3. Client verifies certificate with CA
4. Client generates session key and encrypts it
5. Secure encrypted communication begins

---

## 3. Encryption
Encryption converts readable data into unreadable form.

### Symmetric Encryption
- Same key for encryption and decryption
- Fast
- Example: AES

### Asymmetric Encryption
- Public key encrypts, private key decrypts
- Slower
- Example: RSA

TLS uses both.

---

## 4. Certificates & Certificate Authority
A certificate verifies server identity.
Certificate Authority (CA) issues and validates certificates.
Examples: DigiCert, Let's Encrypt

---

## 5. Authentication vs Authorization
- Authentication: Who are you?
- Authorization: What can you access?

---

## 6. Session-Based Authentication
- User logs in
- Server creates session
- Session ID stored in cookie
- Server validates session on each request

Stateful authentication.

---

## 7. Cookies
Cookies store small data on client.

Security attributes:
- HttpOnly: Not accessible via JS
- Secure: Sent only over HTTPS
- SameSite: Prevents CSRF

---

## 8. Token-Based Authentication
- Server issues token (JWT)
- Client stores token
- Token sent in Authorization header

Differences:
- Stateless
- Scales better than sessions
- Used in mobile & SPAs

---

# Basic Authentication API

### Endpoints
- POST /login
- GET /protected
- GET /logout

### Run
```bash
npm install express cookie-parser
node server.js
