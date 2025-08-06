import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/db.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
// ENV Setup
dotenv.config();
const port = process.env.PORT || 5000;

// Connect to database

dbConnect();

// cors configuration
app.use(cors());

// json parser
app.use(express.json());

// Home route

app.get("/", (req, res) => {
  res.send("Hello from deshora API!");
});

// routes

app.use("/api/auth", authRoutes);

// Error handler

app.use(errorHandlerMiddleware);

// Start Server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Client URL: ${process.env.CLIENT_URL}`);
});
