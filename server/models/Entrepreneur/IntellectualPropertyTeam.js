const mongoose = require("mongoose");

const IntellectualPropertyTeamSchema = new mongoose.Schema({
  intellectualProperty: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "intellectualproperty",
  },
  serviceType: { type: mongoose.SchemaTypes.ObjectId, ref: "serviceType" },
  status: {
    type: String,
  },
  // freelancers: [
  //   {
  //     freelancer: {
  //       type: mongoose.SchemaTypes.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     order: {
  //       type: Number,
  //       required: true,
  //     },
  //     created_at: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //     messages: [
  //       {
  //         from: {
  //           type: String,

  //         }
  //       }
  //     ]
  //   },
  // ],
  freelancers: [
    {
      freelancer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      rate: {
        type: Number,
      },
    },
  ]
,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = IntellectualPropertyTeam = mongoose.model(
  "intellectualpropertyteam",
  IntellectualPropertyTeamSchema
);
