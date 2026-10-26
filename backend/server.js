
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "20kb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Student Management API"
  });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/contact", contactRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found"
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      message: "Invalid JSON body"
    });
  }

  console.error("Server error:", err.message);

  return res.status(500).json({
    message: "Internal server error"
  });
});

const PORT = process.env.PORT || 5000;

if (!process.env.JWT_SECRET ||
    process.env.JWT_SECRET.length < 32) {
  throw new Error("Set a JWT_SECRET of at least 32 characters");
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });
