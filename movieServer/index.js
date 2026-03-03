import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
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
 
app.use("/api", movieRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(process.env.FRONTEND_URL)
});