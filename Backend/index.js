import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI || process.env.DATABASE_URL; // Use the correct variable

// Connect to MongoDB
try {
    mongoose.connect(URI); // No need to pass useNewUrlParser or useUnifiedTopology
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit if connection fails
}


// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
