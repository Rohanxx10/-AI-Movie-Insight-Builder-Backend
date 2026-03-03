import express from "express";
import dotenv from "dotenv";
import movieRoutes from "../routes/movieRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

 
app.get("/", (req, res) => {
  res.json({ message: "AI Movie Insight Backend Running 🚀" });
});

app.use("/api", movieRoutes);

 
export default app;