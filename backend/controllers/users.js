import User from "../models/users.js";

// REGISTER new user
export const createNewUser = async (req, res) => {
  const { email, password, username, createdAt } = req.body;
  // add document to db
  try {
    const user = await User.create({
      email,
      password,
      username,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
