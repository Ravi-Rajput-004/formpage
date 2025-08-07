const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

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
});
