const User = require("../models/User");

// @desc		Send A Message
// @route		POST /api/messages
// @access	Private
exports.addMessage = async (req, res, next) => {
  try {
		const { recipientID, content } = req.body;

    const sender = await User.findById(req.user.id)
    const receiver = await User.findById(recipientID)
    if (!receiver) return res.status(400).json({ msg: "Invalid recipient" })

    var index = sender.conversation.toObject().findIndex(conversation => conversation.userID == recipientID)
    if (index === -1) {
      sender.conversation.push({ userID: recipientID, message: [] })
      receiver.conversation.push({ userID: sender.id, message: [] })
    }
    index = sender.conversation.toObject().findIndex(conversation => conversation.userID == recipientID)
    sender.conversation[index].message.push({ 
      dest: "to",
      content,
    })
    index = receiver.conversation.toObject().findIndex(conversation => conversation.userID == sender.id)
    receiver.conversation[index].message.push({ 
      dest: "from",
      content,
    })
    
    await sender.save();
    await receiver.save();
		return res.status(201).json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(val => val.message);
			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: "Server Error"
			});
		}
	}
}