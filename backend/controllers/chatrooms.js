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

// POST /chatroom/:chatroomId/message
export const chatInChatRoom = async (req, res) => {
  try {
    const { chatroomId } = req.params;
    const { senderId, text } = req.body;

    console.log(chatroomId, senderId, text);
    // // Create a new message and add it to the chatroom
    // const newMessage = new Message({
    //   chatroom: chatroomId,
    //   sender: senderId,
    //   text: text,
    // });
    // await newMessage.save();

    // const chatroom = await Chatroom.findByIdAndUpdate(
    //   chatroomId,
    //   {
    //     $push: { messages: newMessage._id },
    //   },
    //   { new: true }
    // ).populate("messages");

    // return res.status(201).json(chatroom);
    return res.status(201).json({
      message: "controller runs",
    });
  } catch (err) {
    console.error(err);
  }
};
