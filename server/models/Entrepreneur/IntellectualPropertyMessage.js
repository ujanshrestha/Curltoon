const mongoose = require("mongoose");

const IntellectualPropertyMessageSchema = new mongoose.Schema({
  freelancer: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  type: {
    type: String,
    required: false,
    enum: ["message", "file"],
  },
  message: {
    type: String,
  },
  file: {
    type: String,
  },
  attachments: [{}],
  // sentOn: {
  //   type: Date,
  // },
  team: { type: mongoose.SchemaTypes.ObjectId, ref: 'intellectualpropertyteam' },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = IntellectualPropertyMessage = mongoose.model(
  "intellectualpropertymessage",
  IntellectualPropertyMessageSchema
);
