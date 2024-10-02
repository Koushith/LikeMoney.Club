import express from "express";
import { connectDB } from "./utils/connectDB.js";
import dotenv from "dotenv";

// Add error handling to dotenv.config()
dotenv.config();

const app = express();
const PORT = 8000;

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Campaign routes
app.get("/api/campaigns", (req, res) => {
  // TODO: Implement get all campaigns
  res.send("Get all campaigns");
});

app.get("/api/campaigns/:id", (req, res) => {
  // TODO: Implement get single campaign
  res.send(`Get campaign with id ${req.params.id}`);
});

app.post("/api/campaigns", (req, res) => {
  // TODO: Implement create new campaign
  res.send("Create new campaign");
});

app.put("/api/campaigns/:id", (req, res) => {
  // TODO: Implement update campaign
  res.send(`Update campaign with id ${req.params.id}`);
});

app.delete("/api/campaigns/:id", (req, res) => {
  // TODO: Implement delete campaign
  res.send(`Delete campaign with id ${req.params.id}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
