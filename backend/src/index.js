import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from './routes/productRoutes.js';

config();

connectDB();

const app = express();

app.use(cors());

app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", router);

app.use((err, req, res, next) => {
  console.error(err);

  return response.status(500).json({
    message: 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
