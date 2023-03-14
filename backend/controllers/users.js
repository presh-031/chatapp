import User from "../models/users";

// REGISTER new user
const createNewUser = async (req, res) => {
  const { email, password, userName, createdAt } = req.body;
  // add document to db
  try {
    const user = await User.create({
      email,
      password,
      userName,
      createdAt,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
