const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  intellectualProperty: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'IntellectualProperty',
  },
  budget: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  entrepreneur: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  pipeline: { type: mongoose.SchemaTypes.ObjectId, ref: 'pipelineTypes' },
  inspirationLinks: [String],
  materials: [String],
  // pipelines: [String],
  createDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Project = mongoose.model('project', ProjectSchema);
