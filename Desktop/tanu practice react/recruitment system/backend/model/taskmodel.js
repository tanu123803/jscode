import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dueDate: Date,
  column: { type: String, enum: ["To Do", "In Progress", "Done"], default: "To Do" },
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
export default Task;
