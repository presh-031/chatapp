import express from "express";
import { createNewChatRoom } from "../controllers/chatrooms.js";

const router = express.Router();

// CREATE new chatroom
router.post("/new-chat", createNewChatRoom);

export default router;
