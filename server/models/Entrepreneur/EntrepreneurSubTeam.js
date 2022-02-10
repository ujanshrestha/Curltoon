const mongoose = require("mongoose");

const EntrepreneurSubTeamSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  entrepreneur: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  entrepreneurteam: { type: mongoose.SchemaTypes.ObjectId, ref: "entrepreneurteam" },
  members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }] ,
  description: { 
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = EntrepreneurSubTeam = mongoose.model(
  "entrepreneursubteam",
  EntrepreneurSubTeamSchema
);
