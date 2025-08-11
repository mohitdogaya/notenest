import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // future use
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    tags: [String],
    isPinned: {
      type: Boolean,
      default: false,
    },
    attachments: [
      {
        data: Buffer,
        contentType: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
