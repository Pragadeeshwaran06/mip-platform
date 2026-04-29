const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// Initialize the Express app
const app = express();
const PORT = 5000;

// ==========================================
// FIREWALL / SECURITY MIDDLEWARE
// ==========================================

// 1. Helmet sets secure HTTP headers to prevent XSS and other attacks
app.use(helmet());

// 2. Strict CORS: Allow specific React frontend to talk to this API
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Uses Vercel URL in production, localhost in development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// 3. Rate Limiting: Prevent spam/DDoS by limiting users to 5 requests per 15 minutes
const taskLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { error: "Too many requests from this IP, please try again after 15 minutes." }
});

app.use(express.json()); // Allows our server to understand JSON data from React

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error connecting to SQLite database:', err.message);
  else console.log('Connected to the SQLite database.');
});

// Create Tables
db.serialize(() => {
  // Tasks Table
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      company TEXT NOT NULL,
      timeEstimate TEXT NOT NULL,
      price TEXT NOT NULL,
      category TEXT NOT NULL,
      subCategory TEXT NOT NULL,
      skills TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      skills TEXT,
      bio TEXT,
      notificationsEnabled INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Applications Table
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      taskId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      fullName TEXT NOT NULL,
      collegeName TEXT NOT NULL,
      department TEXT NOT NULL,
      year TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(taskId) REFERENCES tasks(id),
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);
  console.log('Database tables ready.');
});

// ==========================================
// API ROUTES (Endpoints)
// ==========================================

// --- AUTH ROUTES ---

// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    db.run(sql, [name, email, hashedPassword, role], function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: "Email already exists." });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User registered successfully!", userId: this.lastID, name, role });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration." });
  }
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "Invalid email or password." });

    // Compare the encrypted password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password." });

    res.json({ 
      message: "Login successful", 
      user: { 
        id: user.id, 
        name: user.name, 
        role: user.role, 
        email: user.email,
        skills: user.skills ? JSON.parse(user.skills) : [],
        bio: user.bio || '',
        notificationsEnabled: !!user.notificationsEnabled
      } 
    });
  });
});

// Update User Profile
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, bio, skills, notificationsEnabled } = req.body;

  const sql = `UPDATE users SET name = ?, bio = ?, skills = ?, notificationsEnabled = ? WHERE id = ?`;
  const params = [name, bio, JSON.stringify(skills), notificationsEnabled ? 1 : 0, id];

  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Profile updated successfully" });
  });
});

// --- TASK ROUTES ---

app.get('/api/tasks', (req, res) => {
  const sql = `SELECT * FROM tasks ORDER BY createdAt DESC`; // Sort by newest
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const tasks = rows.map(row => {
      try {
        return {
          ...row,
          skills: row.skills ? JSON.parse(row.skills) : []
        };
      } catch (e) {
        console.error(`Error parsing skills for task ${row.id}:`, e);
        return { ...row, skills: [] };
      }
    });
    res.json(tasks);
  });
});

// Apply the rate limiter only to the POST route to prevent spam
app.post('/api/tasks', taskLimiter, (req, res) => {
  const { title, description, timeEstimate, price, companyName, category, subCategory } = req.body;
  
  // Basic Server-Side Validation
  if (!title || title.length < 5) return res.status(400).json({ error: "Title must be at least 5 characters." });
  if (!price || isNaN(price) || Number(price) <= 0) return res.status(400).json({ error: "Price must be a positive number." });
  if (!category || !subCategory) return res.status(400).json({ error: "Category and Role are required." });

  // Use the provided company name from the logged in user, or default to anonymous
  const company = companyName || "Anonymous Startup"; 
  const skills = JSON.stringify([subCategory, 'General']); 

  const sql = `INSERT INTO tasks (title, description, company, timeEstimate, price, category, subCategory, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [title, description, company, timeEstimate, `₹${price}`, category, subCategory, skills];

  db.run(sql, params, function(err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Task created successfully!', taskId: this.lastID });
  });
});

// --- APPLICATION ROUTES ---

// Submit Application
app.post('/api/applications', (req, res) => {
  const { taskId, userId, fullName, collegeName, department, year } = req.body;

  if (!taskId || !userId || !fullName) {
    return res.status(400).json({ error: "Missing required application fields." });
  }

  const sql = `INSERT INTO applications (taskId, userId, fullName, collegeName, department, year) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [taskId, userId, fullName, collegeName, department, year], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Application submitted successfully!", applicationId: this.lastID });
  });
});

// Get User Applications
app.get('/api/applications/:userId', (req, res) => {
  const { userId } = req.params;
  const sql = `
    SELECT a.*, t.title, t.company, t.price 
    FROM applications a 
    JOIN tasks t ON a.taskId = t.id 
    WHERE a.userId = ? 
    ORDER BY a.appliedAt DESC
  `;
  db.all(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// --- ADMIN ROUTES ---

// Get all users
app.get('/api/admin/users', (req, res) => {
  const sql = `SELECT id, name, email, role, createdAt FROM users ORDER BY createdAt DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get all applications (Admin)
app.get('/api/admin/applications', (req, res) => {
  const sql = `
    SELECT a.*, t.title as taskTitle, u.name as applicantName 
    FROM applications a 
    JOIN tasks t ON a.taskId = t.id 
    JOIN users u ON a.userId = u.id 
    ORDER BY a.appliedAt DESC
  `;
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM tasks WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Task deleted successfully" });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running securely on http://localhost:${PORT}`);
});
