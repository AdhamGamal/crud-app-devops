import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/crud_app";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Socket.io for Real-Time Updates
io.on("connection", (socket) => {
  console.log("🟢 New client connected");
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

// API Routes
app.use("/api/items", itemRoutes(io));

// Start Server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));