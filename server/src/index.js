import express from "express";
import { connectDB } from "./utils/connectDB.js";

const app = express();
const PORT = process.env.PORT || 8000;


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});