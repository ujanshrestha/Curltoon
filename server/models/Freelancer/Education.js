const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  freelancer: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  description: { 
    type: String,
    // required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
  stillStudying: {
      type: Boolean,
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

module.exports = Education = mongoose.model(
  "education",
  EducationSchema
);
