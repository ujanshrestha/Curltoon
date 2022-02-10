const mongoose = require("mongoose");

const WorkExperienceSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  freelancer: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  description: { 
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stillWorking: {
    type: Boolean
  },  
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = WorkExperience = mongoose.model(
  "workexperience",
  WorkExperienceSchema
);
