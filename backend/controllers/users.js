import bcrypt from "bcrypt";
import User from "../models/users.js";

// REGISTER new user
export const createNewUser = async (req, res) => {
  const { email, password, username, createdAt } = req.body;

  // Add document to db
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document with the hashed password
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });

    // Save the user document to the database
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
