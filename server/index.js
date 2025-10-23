require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db/connect_db")
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express()

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => res.send("Api is running"));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Server Error"})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))