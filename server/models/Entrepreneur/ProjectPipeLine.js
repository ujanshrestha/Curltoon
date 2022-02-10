const mongoose = require('mongoose');

const ProjectPipeLinesSchema = new mongoose.Schema({
  members: [{ type: mongoose.SchemaTypes.ObjectId, ref: "user" }],
  project: { type: mongoose.SchemaTypes.ObjectId, ref: 'Project' },
  pipelineStep: { type: mongoose.SchemaTypes.ObjectId, ref: 'pipelineSteps' },
});

module.exports = ProjectPipeLine = mongoose.model(
  'projectPipeLine',
  ProjectPipeLinesSchema
);
