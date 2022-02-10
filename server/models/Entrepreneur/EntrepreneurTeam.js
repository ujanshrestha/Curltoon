const mongoose = require("mongoose");

const EntrepreneurTeamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  entrepreneur: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  description: {
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EntrepreneurTeam = mongoose.model(
  "entrepreneurteam",
  EntrepreneurTeamSchema
);
