import Note from "../models/Note.js";

// Helper to convert Buffer attachments to base64 strings
function convertAttachmentsToBase64(attachments) {
  return attachments.map(att => ({
    contentType: att.contentType,
    data: att.data.toString("base64"), // Convert Buffer to base64 string
  }));
}

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

// Get Note by ID
export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    const noteObj = note.toObject();
    if (noteObj.attachments && noteObj.attachments.length > 0) {
      noteObj.attachments = convertAttachmentsToBase64(noteObj.attachments);
    }

    res.json(noteObj);
  } catch (error) {
    res.status(400).json({ error: "Invalid note ID" });
  }
};

// Get All Notes (for user)
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id });

    const notesObj = notes.map(note => {
      const notePlain = note.toObject();
      if (notePlain.attachments && notePlain.attachments.length > 0) {
        notePlain.attachments = convertAttachmentsToBase64(notePlain.attachments);
      }
      return notePlain;
    });

    res.json(notesObj);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// Update Note
export const updateNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const noteId = req.params.id;

    // Parse tags, multer stores text fields as strings, so tags might be a JSON string or array of strings
    let tagsArray = [];
    if (tags) {
      if (typeof tags === "string") {
        // single string, parse it
        tagsArray = JSON.parse(tags); // if sent as JSON string
        // or
        // tagsArray = tags.split(",").map(t => t.trim());
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    // Find the note to update
    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // Update fields
    if (title) note.title = title;
    if (content) note.content = content;
    note.tags = tagsArray;

    // Handle new attachments (append or replace, depending on your logic)
    if (req.files && req.files.length > 0) {
      const newAttachments = req.files.map(file => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
      // Append new attachments to existing ones (or replace)
      note.attachments = [...note.attachments, ...newAttachments];
    }

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to update note", details: err.message });
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
