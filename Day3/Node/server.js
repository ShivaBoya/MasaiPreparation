const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const PORT = 3000;
const JWT_SECRET = "supersecretkey";
const JWT_EXPIRES_IN = "10m";

const users = [];

const generateToken = user => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token expired or invalid" });
    }
};

app.post("/signup", (req, res) => {
    const { email, password, role } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
        id: users.length + 1,
        email,
        password,
        role: role || "user",
    };

    users.push(newUser);

    const token = generateToken(newUser);

    res.status(201).json({ token });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({ token });
});

app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected data",
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
