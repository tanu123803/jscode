import Board from "../models/boardModel.js";
import User from "../models/userModel.js";


export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      name: req.body.name,
      createdBy: req.user._id,
      members: [req.user._id]
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const inviteMember = async (req, res) => {
  try {
    const { boardId, memberEmail } = req.body;
    const board = await Board.findById(boardId);
    const member = await User.findOne({ email: memberEmail });

    if (!board || !member)
      return res.status(404).json({ message: "Board or user not found" });

    if (!board.members.includes(member._id)) {
      board.members.push(member._id);
      await board.save();
    }

    res.json({ message: "Member invited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyBoards = async (req, res) => {
  try {
    const boards = await Board.find({ members: req.user._id })
      .populate("members", "name email role");
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
