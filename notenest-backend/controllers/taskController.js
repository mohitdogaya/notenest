import Task from "../models/Task.js";

// ✅ Create Task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      subtasks,
      tags,
      isCompleted,
    } = req.body;

    const attachments = req.files?.map(file => ({
      data: file.buffer,
      contentType: file.mimetype,
    })) || [];

    const task = new Task({
      userId: req.user._id,
      title,
      description,
      dueDate,
      priority,
      isCompleted,
      subtasks,
      tags,
      attachments,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error.message);
    res.status(500).json({ error: "Failed to create task" });
  }
};

// ✅ Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// ✅ Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// ✅ Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
