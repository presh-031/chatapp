import { createNewUser, editPassword } from "../controllers/users.js";

import express from "express";

const router = express.Router();

// REGISTER new user
router.post("/new-user", createNewUser);

// AUTHENTICATE a user

// CHANGE username
// router.put("/edit-username", editUsername);

// CHANGE user password
router.put("/edit-password", editPassword);

export default router;
