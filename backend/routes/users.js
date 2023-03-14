import express from "express";
import { createNewUser } from "../controllers/users.js";

const router = express.Router();

// REGISTER new user
router.post("/new-user", createNewUser);

// AUTHENTICATE a user
// CHANGE user password

export default router;
