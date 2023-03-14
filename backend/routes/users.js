import express from "express";
import { createNewUser } from "../controllers/users.js";

const router = express.Router();

// REGISTER new user
router.post("/create-user", createNewUser);

// AUTHENTICATE a user
// CHANGE user password
router.get("/top-rated", () => {
  res.send("Hello World!");
});

export default router;
