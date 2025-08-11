import Note from "../models/Note.js";

// Create Note

export const createNote = async (req, res) => {
  try {
    const { title, content, folder, tags, isPinned } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const attachments = [];

    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        attachments.push({
          data: file.buffer,
          contentType: file.mimetype,
        });
      });
    }

    const newNote = new Note({
      userId: req.user._id,
      title,
      content,
      folder,
      tags,
      isPinned,
      attachments,
    });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
};


// Get All Notes (for a user)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Failed to update note" });
  }
};

// Delete Note
export const deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete note" });
  }
};

