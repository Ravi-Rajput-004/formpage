require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
  process.exit(1); // Stop app if DB connection fails
});

// Define Schema and Model
const loginSchema = new mongoose.Schema({
  username: String,
  password: String,
}, { timestamps: true });

const Login = mongoose.model('Login', loginSchema);

// POST /api/login route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const newLogin = new Login({ username, password });
    await newLogin.save();

    res.json({ statuscode: 1, message: 'Login saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statuscode: 0, message: 'Login failed' });
  }
});

// GET /api route (health check)
app.get('/api', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

