import express from "express";
import { connectDB } from "./utils/connectDB.js";
import dotenv from "dotenv";
import campaignRouter from "./router/campaign.route.js";
import cors from "cors";

// Add error handling to dotenv.config()
dotenv.config();

const app = express();
const PORT = 8000;

connectDB();
app.use(express.json());
app.use(cors());
// Use campaign router
app.use("/api/campaigns", campaignRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT} - http://localhost:${PORT}`);
});
