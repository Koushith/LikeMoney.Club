import express from "express";
import { connectDB } from "./utils/connectDB.js";
import dotenv from "dotenv";

// Add error handling to dotenv.config()
 dotenv.config();


const app = express();
const PORT =  8000;


connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});