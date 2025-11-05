import express from "express";

import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import PostRouter from "./routers/post.router.mjs";
import AuthRouter from "./routers/auth.router.mjs";
import UserRouter from "./routers/user.router.mjs";

dotenv.config();

const PORT = 5500;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi server");
});

app.use("/posts", PostRouter);
app.use("/users", UserRouter);

app.use(AuthRouter);


// MongoDB connection with error handling
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Handle MongoDB connection events
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});
