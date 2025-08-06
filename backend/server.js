const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Atlas Connection (ONLY THIS CHANGED)
mongoose.connect("mongodb+srv://rajputravi200331:ravi1234@cluster0.2vtcdsl.mongodb.net/virtual?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("mongo connect");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

app.listen(9000, (req, res) => {
    console.log("server working");
});

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
