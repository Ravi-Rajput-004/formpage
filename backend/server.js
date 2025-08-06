require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

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
});
