import { chatInChatRoom, createNewChatRoom } from "../controllers/chatrooms.js";

import express from "express";

const router = express.Router();

// CREATE new chatroom
router.post("new", createNewChatRoom);

// POST /chatrooms/:chatroomId/message
router.post(":chatroomId/message", chatInChatRoom);

router.get("/", (req, res) => {
  res.send("Holla!").json(200);
});
export default router;
