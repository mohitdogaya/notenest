export const getUserProfile = async (req, res) => {
  try {
    // req.user is already populated by protect middleware
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};
