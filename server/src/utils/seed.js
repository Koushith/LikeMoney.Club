import mongoose from "mongoose";
import User from "../model/user.js";
import dotenv from "dotenv";

dotenv.config();

// Add database connection function
async function connectToDatabase() {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB", db.connection.name);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// ... existing userSchema and User model ...

// Update the seed function to include error handling
export async function seedUsers() {
  try {
    await connectToDatabase();
    // Clear existing users
    await User.deleteMany({});
    console.log("Existing users cleared from the database");

    // Create users
    const users = [
      { username: "johndoe", email: "john@example.com" },
      { username: "janedoe", email: "jane@example.com" },
      { username: "alicesmith", email: "alice@example.com" },
      { username: "bobwilson", email: "bob@example.com" },
      { username: "carolbrown", email: "carol@example.com" },
      { username: "davidlee", email: "david@example.com" },
      { username: "evajones", email: "eva@example.com" },
      { username: "frankwhite", email: "frank@example.com" },
      { username: "gracemiller", email: "grace@example.com" },
      { username: "henrytaylor", email: "henry@example.com" },
      { username: "isabelclark", email: "isabel@example.com" },
      { username: "jackthomas", email: "jack@example.com" },
      { username: "katejohnson", email: "kate@example.com" },
      { username: "liamwhite", email: "liam@example.com" },
      { username: "morganbrown", email: "morgan@example.com" },
      { username: "nataliegreen", email: "natalie@example.com" },
      { username: "oliviahall", email: "olivia@example.com" },
      { username: "paulmiller", email: "paul@example.com" },
      { username: "quinnanderson", email: "quinn@example.com" },
      { username: "ryanmartin", email: "ryan@example.com" },
      { username: "samanthajones", email: "samantha@example.com" },
      { username: "thomaswhite", email: "thomas@example.com" },
      { username: "uanderson", email: "u@example.com" },
      { username: "vaughanmiller", email: "vaughan@example.com" },
      { username: "wendygreen", email: "wendy@example.com" },
      { username: "xanderhall", email: "xander@example.com" },
      { username: "yarawhite", email: "yara@example.com" },
      { username: "zacharymiller", email: "zachary@example.com" },
      { username: "koushith", email: "koushith97@gmail.com" },
    ];

    for (const userData of users) {
      //console.log("userData-------------------------", userData);
      const user = new User(userData);
      //console.log("user-------------------------", user);
      await user.save();
      console.log(`User created: ${user.username}`);
    }

    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

// Run the seed function
seedUsers()
  .then(() => {
    console.log("Seeding process finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding process failed:", error);
    process.exit(1);
  });
