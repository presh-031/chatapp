import bcrypt from "bcrypt";
import User from "../models/users.js";

const hashRounds = 10;

// REGISTER new user
export const createNewUser = async (req, res) => {
  const { email, password, username } = req.body;

  // Add new user document to db
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

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    if (err instanceof MongoError) {
      // Handle MongoDB specific error
      res.status(500).json({
        success: false,
        error: "MongoDB error occurred",
      });
    } else if (err instanceof bcrypt.BcryptError) {
      // Handle bcrypt specific error
      res.status(500).json({
        success: false,
        error: "Bcrypt error occurred",
      });
    } else {
      // Handle generic error
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
  }
};

// LOGIN user
export const loginUser = async (req, res)=> {
  const { email, password } = req.body;
  // Search for the user in the database
  try {
    const user = await User.findOne({ email });
    if (!user){
      return res.status(404).json({
        success: false,
        error: "User not found",
      })
    }
    // Compare the password 
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Passwords do not match'
      })
    }
}

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
