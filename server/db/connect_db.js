// const mongoose = require("mongoose");
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb Connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

