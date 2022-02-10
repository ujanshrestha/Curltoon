const mongoose = require("mongoose");

const IntellectualPropertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  entrepreneur: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  description: {
    type: String,
    // required: true
  },
  budget: {
    type: String,
  },
  status: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  attachments: [{}],
  inspirationLinks: [String],
  // team: [{
  //     serviceTypeId: {
  //         type: String
  //     },
  //     freelancers: [{
  //         freelancerId: {
  //             type: String,
  //             required: true
  //         },
  //         order: {
  //             type: Number,
  //             required: true
  //         },
  //         created_at: {
  //             type: Date,
  //             default:
  //                 Date.now
  //         },
  //     }]
  // }],
  teams: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'intellectualpropertyteam' }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = IntellectualProperty = mongoose.model(
  "intellectualproperty",
  IntellectualPropertySchema
);
