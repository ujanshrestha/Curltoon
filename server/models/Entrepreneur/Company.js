const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  entrepreneur: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
  address: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Company = mongoose.model("company", CompanySchema);
