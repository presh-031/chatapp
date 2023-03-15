import Chatroom from "../models/chatrooms.js";

export const createNewChatRoom = async (req, res) => {
  const { user1Id, user2Id } = req.body;

  // Check if a chatroom already exists between these users
  const chatroom = await Chatroom.findOne({
    users: { $all: [user1Id, user2Id] },
  }).populate("messages");

  if (chatroom) {
    return res
      .status(200)
      .json({ chatroomId: chatroom._id, messages: chatroom.messages });
  }

  // Create a new chatroom with the two users
  const newChatroom = new Chatroom({
    users: [user1Id, user2Id],
    messages: [],
  });

  await newChatroom.save();

  return res
    .status(201)
    .json({ chatroomId: newChatroom._id, messages: newChatroom.messages });
};
