require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const musicRoutes = require("./routes/musicRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS setup
app.use(
  cors({
    origin: [
      "https://meleti-app.vercel.app",
      process.env.CLIENT_URL,
      process.env.CLIENT_URL_LOCAL,
    ],
    credentials: true, // Allow credentials such as Authorization headers
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/music", musicRoutes); // Music-related routes

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
