const mongoose = require("mongoose");
const ServiceTypeSchema = new mongoose.Schema({
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

const ServiceType = mongoose.model("serviceType", ServiceTypeSchema);

module.exports = ServiceType;
