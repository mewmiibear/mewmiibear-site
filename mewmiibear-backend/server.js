import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

app.use(express.json());

// ============================
// Database connection
// ============================
const pool = await mysql.createPool({
  host: "localhost",
  user: "root",   // XAMPP default
  password: "",   // XAMPP default (empty password)
  database: "mewmiibear",
});

// ============================
// Zoho SMTP config
// ============================
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "admin@mewmiibear.com", // your Zoho email
    pass: "NjxS1BL5a6Ss",    // generate app password in Zoho
  },
});

// ============================
// JWT Secret
// ============================
const JWT_SECRET = "super-secret-key"; // ⚠️ replace with .env in production

// ============================
// REGISTER
// ============================
app.post("/register", async (req, res) => {
  console.log("Incoming register request:", req.body);
  const { email, password } = req.body;

  try {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert user into DB
    const [result] = await pool.execute(
      "INSERT INTO users (email, password, is_verified) VALUES (?, ?, 0)",
      [email, hashedPassword]
    );
    const userId = result.insertId;

    // 3. Create token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h expiry
    const mysqlTime = expires.toISOString().slice(0, 19).replace("T", " ");

    await pool.execute(
      "INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, mysqlTime]
    );

    // 4. Send email
    const verifyUrl = `http://localhost:3000/verify?token=${token}`;
    await transporter.sendMail({
      from: '"Mewmii Bear" <hello@mewmiibear.com>',
      to: email,
      subject: "Verify your Mewmii Bear account",
      html: `
        <h1>Welcome to Mewmii Bear!</h1>
        <p>Click below to verify your account:</p>
        <a href="${verifyUrl}">${verifyUrl}</a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    res.json({ message: "User registered (check email to verify)" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ============================
// VERIFY EMAIL
// ============================
app.get("/verify", async (req, res) => {
  const { token } = req.query;

  try {
    // 1. Find token
    const [rows] = await pool.execute(
      "SELECT * FROM verification_tokens WHERE token = ? AND expires_at > NOW()",
      [token]
    );

    if (rows.length === 0) {
      return res.status(400).send("Invalid or expired token");
    }

    const tokenData = rows[0];

    // 2. Mark user as verified
    await pool.execute("UPDATE users SET is_verified = 1 WHERE id = ?", [
      tokenData.user_id,
    ]);

    // 3. Delete token
    await pool.execute("DELETE FROM verification_tokens WHERE token = ?", [
      token,
    ]);

    res.send("✅ Email verified! You can now log in.");
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).send("Verification failed");
  }
});

// ============================
// LOGIN
// ============================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // 1. Find user
    const [rows] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const user = rows[0];
    // 2. Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // 3. Check if verified
    if (!user.is_verified) {
      return res.status(403).json({ error: "Email not verified" });
    }
    // 4. Issue JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );
    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ============================
// PROTECTED ROUTE
// ============================
app.get("/profile", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Get user info
    const [userRows] = await pool.execute(
      "SELECT id, email, is_verified FROM users WHERE id = ?",
      [decoded.id]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // Get orders
    const [orderRows] = await pool.execute(
      "SELECT * FROM orders WHERE user_id = ?",
      [decoded.id]
    );
    res.json({ user: userRows[0], orders: orderRows });
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
});

// ============================
// START SERVER
// ============================
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
