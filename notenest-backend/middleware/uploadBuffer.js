import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only image files are allowed!"), false); // reject file
  }
};

const uploadBuffer = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter, // add this line
});

export default uploadBuffer;
