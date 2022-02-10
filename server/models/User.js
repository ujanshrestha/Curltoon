const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "entrepreneur", "freelancer"],
  },
  avatar: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: false,
  },
  cardType: {
    type: String,
    required: false,
    enum: ["visa", "mastercard","discover"],
  },
  active: {
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: false,
  },
  fullAddress: { //for Freelancer for now
    type: String,
    required: false,
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

 module.exports = User = mongoose.model("user", UserSchema);
