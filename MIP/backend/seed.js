const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
  }
  console.log('Connected to the SQLite database for seeding.');
});

const tasksData = [
  {
    title: "React Frontend Development for E-commerce App",
    description: "We are looking for a skilled React developer to build responsive components for our new e-commerce storefront. You will work closely with our design team to implement pixel-perfect UIs.",
    company: "TechNova Solutions",
    timeEstimate: "2 Weeks",
    price: "15000",
    category: "Technical",
    subCategory: "Software Development",
    skills: ["React", "Tailwind CSS", "JavaScript"]
  },
  {
    title: "Social Media Marketing Strategy",
    description: "Create a comprehensive 30-day social media calendar and strategy for our sustainable fashion brand. Includes creating 15 graphics and captions.",
    company: "EcoWear",
    timeEstimate: "1 Week",
    price: "8000",
    category: "Non-Technical",
    subCategory: "Marketing & SEO",
    skills: ["Social Media", "Canva", "Copywriting"]
  },
  {
    title: "Database Optimization & Indexing",
    description: "Review our existing PostgreSQL database schema and identify slow queries. Create and implement proper indexes to improve overall application performance.",
    company: "DataSync Inc.",
    timeEstimate: "3 Days",
    price: "12000",
    category: "Technical",
    subCategory: "Cloud Computing",
    skills: ["PostgreSQL", "Database Design", "Performance Tuning"]
  },
  {
    title: "Technical Content Writer for Developer Blog",
    description: "Write two high-quality, 1500-word articles about modern web development practices (e.g., Server-Side Rendering vs Static Site Generation).",
    company: "DevRel Masters",
    timeEstimate: "5 Days",
    price: "6000",
    category: "Non-Technical",
    subCategory: "Content Writing",
    skills: ["Technical Writing", "Web Development", "SEO"]
  }
];

const seedDatabase = async () => {
  try {
    // 1. Clear existing data (optional, but good for a fresh seed)
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM applications", (err) => err ? reject(err) : resolve());
    });
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM tasks", (err) => err ? reject(err) : resolve());
    });
    await new Promise((resolve, reject) => {
      db.run("DELETE FROM users", (err) => err ? reject(err) : resolve());
    });

    console.log("Cleared existing data.");

    // 2. Insert Users
    const passwordHash = await bcrypt.hash('password123', 10);
    
    const insertUser = (name, email, role, skills) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO users (name, email, password, role, skills) VALUES (?, ?, ?, ?, ?)`,
          [name, email, passwordHash, role, JSON.stringify(skills)],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    };

    const adminId = await insertUser('System Admin', 'admin@mip.com', 'Admin', []);
    const companyId = await insertUser('TechNova HR', 'company@mip.com', 'Company', []);
    const studentId = await insertUser('Alex Student', 'student@mip.com', 'Student', ['React', 'JavaScript', 'Tailwind CSS']);

    console.log(`Created Users - Admin ID: ${adminId}, Company ID: ${companyId}, Student ID: ${studentId}`);

    // 3. Insert Tasks
    const insertTask = (task) => {
      return new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO tasks (title, description, company, timeEstimate, price, category, subCategory, skills) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [task.title, task.description, task.company, task.timeEstimate, `₹${task.price}`, task.category, task.subCategory, JSON.stringify(task.skills)],
          function(err) {
            if (err) reject(err);
            else resolve(this.lastID);
          }
        );
      });
    };

    let taskIds = [];
    for (const task of tasksData) {
      const id = await insertTask(task);
      taskIds.push(id);
    }
    console.log(`Created ${taskIds.length} tasks.`);

    // 4. Insert one Application from the Student
    if (taskIds.length > 0) {
      await new Promise((resolve, reject) => {
        db.run(
          `INSERT INTO applications (taskId, userId, fullName, collegeName, department, year, status) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [taskIds[0], studentId, 'Alex Student', 'Engineering College', 'Computer Science', '3rd Year', 'Pending'],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
      console.log("Created 1 sample application for the student.");
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    db.close();
  }
};

db.serialize(() => {
  seedDatabase();
});
