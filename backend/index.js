import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./api/routes/auth.route.js";
import listingRouter from "./api/routes/listing.route.js";
import userRouter from "./api/routes/user.route.js";

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());


const isProduction = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: isProduction
    ? "https://mern-real-estate-gamma.vercel.app" // Production URL
    : "http://localhost:5173",                     // Development URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true, // Allow cookies
};

app.use(cors(corsOptions));

// API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
