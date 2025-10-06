import Task from "../models/taskModel.js";
import { io } from "../server.js"; 


export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, column, boardId } = req.body;
    const newTask = await Task.create({ title, description, assignedTo, dueDate, column, boardId });

   
    io.to(boardId).emit("task_updated", { type: "CREATE", task: newTask });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    io.to(updatedTask.boardId.toString()).emit("task_updated", { type: "UPDATE", task: updatedTask });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    await task.deleteOne();
    io.to(task.boardId.toString()).emit("task_updated", { type: "DELETE", taskId: task._id });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBoardTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ boardId: req.params.boardId }).populate("assignedTo", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
