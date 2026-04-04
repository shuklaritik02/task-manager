import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// ✅ JSON middleware
app.use(express.json());

// ✅ URL encoded data
app.use(express.urlencoded({ extended: true }));

// ✅ Cookie parser
app.use(cookieParser());

// importing routes

// ✅ Health check route
import healthCheckRoute from "./routes/healthcheck.routes.js";

// using routes
app.use("/api/v1/healthcheck", healthCheckRoute);

export default app;