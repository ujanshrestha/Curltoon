const mongoose = require("mongoose");
const GenreSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true
  },
  status: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Genre = mongoose.model("genre", GenreSchema);

module.exports = Genre;
