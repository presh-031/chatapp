import bcrypt from "bcrypt";
import User from "../models/users.js";

const hashRounds = 10;

// REGISTER new user
export const createNewUser = async (req, res) => {
  const { email, password, username, createdAt } = req.body;

  // Add document to db
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, hashRounds);

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

// EDIT username
export const editUsername = async (req, res) => {
  const { userId, username } = req.body;

  try {
    // Find the user in the database by their userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's username
    user.username = username;

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// EDIT user password
export const editPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    // const userId = req.user.id; : Auth is not yet added
    const { userId } = req.body;

    // Get the user document from the database
    const user = await User.findById(userId);

    // Verify the old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, hashRounds);

    // Update the user document with the new password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
