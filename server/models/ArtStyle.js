const mongoose = require("mongoose");
const ArtStyleSchema = new mongoose.Schema({
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

const ArtStyle = mongoose.model("artstyle", ArtStyleSchema);

module.exports = ArtStyle;
