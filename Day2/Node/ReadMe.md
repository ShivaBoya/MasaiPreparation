# Web Security & Authentication – Theory Guide

This document explains core web security and authentication concepts commonly asked in interviews, with clear definitions and comparisons.

---

## 1. What is HTTPS? How does it differ from HTTP?

**HTTP (HyperText Transfer Protocol)** is a protocol used for communication between a client (browser) and a server.  
It sends data in **plain text**, which makes it vulnerable to interception and attacks.

**HTTPS (HyperText Transfer Protocol Secure)** is the secure version of HTTP.  
It encrypts the data using **SSL/TLS**, ensuring secure communication.

### Key Differences:

| HTTP | HTTPS |
|----|----|
| Data is unencrypted | Data is encrypted |
| Vulnerable to attacks | Secure communication |
| Uses port 80 | Uses port 443 |
| No identity verification | Server identity is verified |

---

## 2. Explain SSL/TLS. What is the SSL Handshake Process?

**SSL (Secure Sockets Layer)** and **TLS (Transport Layer Security)** are cryptographic protocols that provide secure communication over a network.  
TLS is the modern and more secure version of SSL.

### SSL/TLS Handshake Process:
1. Client sends a request to the server.
2. Server responds with its **SSL certificate** (contains public key).
3. Client verifies the certificate with a Certificate Authority (CA).
4. Client generates a **session key** and encrypts it using the server’s public key.
5. Server decrypts the session key using its private key.
6. Secure, encrypted communication begins using the session key.

---

## 3. What is Encryption? Explain Symmetric vs Asymmetric Encryption.

**Encryption** is the process of converting data into an unreadable format to protect it from unauthorized access.

### Symmetric Encryption:
- Uses **one shared key** for encryption and decryption.
- Faster and efficient.
- Example: AES

**Pros:** Fast  
**Cons:** Key distribution is risky

### Asymmetric Encryption:
- Uses **two keys**: public key (encrypt) and private key (decrypt).
- More secure for key exchange.
- Example: RSA

**Pros:** Secure key exchange  
**Cons:** Slower than symmetric encryption

---

## 4. What are Certificates? What is a Certificate Authority (CA)?

A **Digital Certificate** verifies the identity of a server or website.  
It contains:
- Domain name
- Public key
- Issuer (CA)
- Expiry date

A **Certificate Authority (CA)** is a trusted organization that issues and verifies certificates.

Examples:
- DigiCert
- Let’s Encrypt
- GlobalSign

Browsers trust certificates signed by valid CAs.

---

## 5. Difference Between Authentication and Authorization

| Authentication | Authorization |
|----|----|
| Verifies who the user is | Verifies what the user can access |
| Happens first | Happens after authentication |
| Example: Login | Example: Access control |
| Uses credentials | Uses permissions/roles |

---

## 6. Explain Session-Based Authentication. How Do Sessions Work?

Session-based authentication stores user authentication data on the **server**.

### How it Works:
1. User logs in with credentials.
2. Server creates a session and stores it.
3. Session ID is sent to the client via cookie.
4. Client sends the cookie on every request.
5. Server validates the session ID.

### Pros:
- Easy to implement
- Secure when configured correctly

### Cons:
- Server memory usage
- Not ideal for large-scale systems

---

## 7. What are Cookies? Security Attributes of Cookies

**Cookies** are small pieces of data stored in the browser and sent with every request.

### Important Cookie Attributes:

- **HttpOnly**  
  Prevents JavaScript access → protects from XSS attacks

- **Secure**  
  Cookie is sent only over HTTPS

- **SameSite**  
  Controls cross-site cookie sharing  
  Values: `Strict`, `Lax`, `None`

---

## 8. What is Token-Based Authentication? Difference from Session-Based Auth

**Token-based authentication** uses tokens (usually JWT) instead of server sessions.

### How it Works:
1. User logs in.
2. Server generates a token.
3. Client stores token (localStorage or cookie).
4. Client sends token in headers for each request.
5. Server validates token.

### Session vs Token-Based Auth:

| Session-Based | Token-Based |
|----|----|
| Server stores session | Stateless |
| Uses cookies | Uses tokens |
| Harder to scale | Highly scalable |
| Server memory required | No server storage |

---

## Summary

- HTTPS ensures secure communication
- SSL/TLS encrypts data and verifies identity
- Encryption protects data using keys
- Certificates prove server authenticity
- Authentication verifies identity
- Authorization controls access
- Sessions store auth state on server
- Tokens store auth state on client

---

📌 **Ideal for interviews, revision, and backend security fundamentals**
