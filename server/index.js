import "./config/env.js"
import express from "express"
import cors from "cors"
// import mongoose from "mongoose";
import path from "path"
import {connectDB} from "./db/connect_db.js"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
// import { fileURLToPath } from "url";


const app = express()

app.use(cors());
app.use(express.json());

// const __filename = fileURLToPath(import.meta.url)
const __dirname = path.resolve()


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: "Server Error"})
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})