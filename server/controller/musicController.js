const Music = require("../model/music"); // Assuming a Music model exists in your models directory

// Get all music lists
exports.getMusicList = async (req, res) => {
  try {
    const musicData = await Music.findOne();
    if (!musicData) {
      return res.status(404).json({ message: "No music data found" });
    }

    res.status(200).json(musicData);
  } catch (error) {
    console.error("Error fetching music data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new music to the list
exports.addMusic = async (req, res) => {
  try {
    const { musics, break_music, long_break } = req.body;

    // Create a new music document
    const newMusicData = new Music({
      musics,
      break_music,
      long_break,
    });

    await newMusicData.save();

    res.status(201).json({ message: "Music data added successfully" });
  } catch (error) {
    console.error("Error adding music data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update music lists
exports.updateMusic = async (req, res) => {
  try {
    const { musics, break_music, long_break } = req.body;

    const updatedMusicData = await Music.findOneAndUpdate(
      {}, // Find the first document
      { musics, break_music, long_break }, // Update with the new data
      { new: true, upsert: true } // Create if it doesn't exist
    );

    res.status(200).json({
      message: "Music data updated successfully",
      data: updatedMusicData,
    });
  } catch (error) {
    console.error("Error updating music data:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete all music data
exports.deleteMusic = async (req, res) => {
  try {
    await Music.deleteMany(); // Delete all documents in the collection
    res.status(200).json({ message: "All music data deleted successfully" });
  } catch (error) {
    console.error("Error deleting music data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
