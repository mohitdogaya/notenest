import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    dueDate: Date,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    subtasks: [
      {
        title: String,
        isDone: Boolean,
      },
    ],
    tags: [String],
    attachments: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
