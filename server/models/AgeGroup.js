const mongoose = require("mongoose");
const AgeGroupSchema = new mongoose.Schema({
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

const AgeGroup = mongoose.model("agegroup", AgeGroupSchema);

module.exports = AgeGroup;
