const mongoose = require("mongoose");

const ProjectMessageSchema = new mongoose.Schema({
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
  pipeline: { type: mongoose.SchemaTypes.ObjectId, ref: 'projectPipeLine' },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ProjectMessage = mongoose.model(
  "projectmessage",
  ProjectMessageSchema
);
