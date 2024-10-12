import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    googleId: {
      type: String,
      sparse: true, // Add this line
      unique: true, // Add this line if you want googleId to be unique when present
    },
    role: {
      type: String,
      enum: ["user", "admin", "brand"],
      default: "user",
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
