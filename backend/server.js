<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
=======
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
>>>>>>> 842d68eef059e0aa09b4a07bde3870ac3d357017

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => console.error('❌ MongoDB Error:', err));

// Define Schema and Model
const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Login = mongoose.model('Login', loginSchema);

// POST /login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Save the login data
    const newLogin = new Login({ username, password });
    await newLogin.save();

    res.json({ statuscode: 1, message: 'Login saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscode: 0, message: 'Login failed' });
  }
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
=======
// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Schema and route
const loginschema = mongoose.Schema({
  username: String,
  password: String,
});

const loginmodel = mongoose.model("login", loginschema, "login");

app.post("/login", async (req, res) => {
  const result = new loginmodel({
    username: req.body.username,
    password: req.body.password,
  });

  const rr = await result.save();
  if (rr) {
    res.send({ statuscode: 1 });
  } else {
    res.send({ statuscode: 0 });
  }
});

app.get("/login", async (req, res) => {
  try {
    const logins = await loginmodel.find();
    res.send(logins);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch login data" });
  }
});

// Serve static frontend files from React
app.use(express.static(path.join(__dirname, 'build')));

// Fallback to frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> 842d68eef059e0aa09b4a07bde3870ac3d357017
});
