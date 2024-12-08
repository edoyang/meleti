const express = require("express");
const router = express.Router();
const {
  getMusicList,
  addMusic,
  updateMusic,
  deleteMusic,
} = require("../controller/musicController");

// Get all music lists
router.get("/", getMusicList);

// Add new music data
router.post("/", addMusic);

// Update music lists
router.put("/", updateMusic);

// Delete all music data
router.delete("/", deleteMusic);

module.exports = router;
