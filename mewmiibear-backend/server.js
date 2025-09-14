// server.js
import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import crypto from "crypto";
import nodemailer from "nodemailer";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // change if needed
  database: "mewmiibear", // changed to your DB name
});

// JWT Secret
const JWT_SECRET = "your_jwt_secret"; // change to strong secret

// Email transporter (Zoho example)
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "hello@mewmiibear.com",
    pass: "NjxS1BL5a6Ss",
  },
});

/* ===========================
   USERS
=========================== */

// Register
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (email, password_hash, status, verified, is_verified) VALUES (?, ?, 'inactive', 0, 0)",
      [email, hashedPassword]
    );
    const userId = result.insertId;
    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
    const mysqlTime = expires.toISOString().slice(0, 19).replace("T", " ");
    await db.query(
      "INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
      [userId, token, mysqlTime]
    );
    // Send verification email
    const verifyUrl = `http://localhost:5000/api/verify?token=${token}`;
    await transporter.sendMail({
      from: 'Mewmii Bear <hello@mewmiibear.com>',
      to: email,
      subject: "Verify your Mewmii Bear account",
      html: `<h1>Welcome to Mewmii Bear!</h1><p>Click the link below to verify your email:</p><a href="${verifyUrl}">${verifyUrl}</a><p>This link expires in 24 hours.</p>`,
    });
    res.json({ message: "User registered successfully. Please verify email." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(400).json({ error: "Invalid email or password" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   PRODUCTS
=========================== */

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product
app.post("/api/products", async (req, res) => {
  const { name, description, price, image_url, category } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, image_url, category) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, image_url, category]
    );
    res.json({ id: result.insertId, message: "Product created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   VARIATIONS
=========================== */

// Get variations for a product
app.get("/api/products/:id/variations", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM product_variations WHERE product_id = ?", [
      req.params.id,
    ]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add variation
app.post("/api/products/:id/variations", async (req, res) => {
  const { variation_name, additional_price, stock, image_url } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO product_variations (product_id, variation_name, additional_price, stock, image_url) VALUES (?, ?, ?, ?, ?)",
      [req.params.id, variation_name, additional_price, stock, image_url]
    );
    res.json({ id: result.insertId, message: "Variation added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// CREATE ORDER
// =========================
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, productId, variationId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Get product base price
    const [productRows] = await pool.execute(
      "SELECT price FROM products WHERE id = ?",
      [productId]
    );
    if (productRows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    let basePrice = parseFloat(productRows[0].price);

    // 2. If variation, get additional price
    let additionalPrice = 0;
    if (variationId) {
      const [variationRows] = await pool.execute(
        "SELECT additional_price FROM product_variations WHERE id = ? AND product_id = ?",
        [variationId, productId]
      );
      if (variationRows.length === 0) {
        return res.status(404).json({ error: "Variation not found" });
      }
      additionalPrice = parseFloat(variationRows[0].additional_price);
    }

    // 3. Calculate final price
    const finalPrice = (basePrice + additionalPrice) * quantity;

    // 4. Insert order
    const [result] = await pool.execute(
      `INSERT INTO orders (user_id, product_id, variation_id, quantity, price) 
       VALUES (?, ?, ?, ?, ?)`,
      [userId, productId, variationId || null, quantity, finalPrice]
    );

    res.json({
      message: "Order placed successfully",
      orderId: result.insertId,
      finalPrice,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// =========================
// GET USER ORDERS
// =========================
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await pool.execute(
      `SELECT o.id, o.quantity, o.price, o.created_at,
              p.name AS product_name,
              v.variation_name
       FROM orders o
       JOIN products p ON o.product_id = p.id
       LEFT JOIN product_variations v ON o.variation_id = v.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Profile route (protected)
app.get("/api/profile", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Get user info
    const [userRows] = await db.query(
      "SELECT id, email, is_verified FROM users WHERE id = ?",
      [decoded.id]
    );
    if (userRows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    // Get orders
    const [orderRows] = await db.query(
      `SELECT o.id, o.quantity, o.price, o.created_at,
              p.name AS product_name,
              v.variation_name
       FROM orders o
       JOIN products p ON o.product_id = p.id
       LEFT JOIN product_variations v ON o.variation_id = v.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [decoded.id]
    );
    res.json({ user: userRows[0], orders: orderRows });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
});

// Email verification
app.get("/api/verify", async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).send("Token is required");
  }
  try {
    const [rows] = await db.query(
      "SELECT * FROM verification_tokens WHERE token = ?",
      [token]
    );
    if (rows.length === 0) {
      return res.status(400).send("Invalid or expired token");
    }
    const record = rows[0];
    const now = new Date();
    if (new Date(record.expires_at) < now) {
      return res.status(400).send("Token has expired");
    }
    // Update user as verified
    await db.query("UPDATE users SET verified = 1, is_verified = 1 WHERE id = ?", [record.user_id]);
    // Delete used token
    await db.query("DELETE FROM verification_tokens WHERE token = ?", [token]);
    res.send("<h1>Email verified successfully ✅</h1>");
  } catch (err) {
    res.status(500).send("Verification failed");
  }
});

/* ===========================
   START SERVER
=========================== */
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
