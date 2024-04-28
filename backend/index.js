import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

app.use((error, request, response, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  response.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
