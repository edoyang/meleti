const mongoose = require("mongoose");

const musicSchema = new mongoose.Schema({
  musics: { type: [String], required: true },
  break_music: { type: [String], required: true },
  long_break: { type: [String], required: true },
});

module.exports = mongoose.model("Music", musicSchema, "musics");
