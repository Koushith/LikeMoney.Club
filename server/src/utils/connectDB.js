import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI 
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected", mongoose.connection.name);
  } catch (error) {
    console.log(error);
  }
};
