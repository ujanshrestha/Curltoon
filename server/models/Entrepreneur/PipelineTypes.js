const mongoose = require('mongoose');

const PipelineTypesSchema = new mongoose.Schema({
  name: { type: String },
  description: {type: String},
  steps: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'pipelineSteps' }]
});

module.exports = PipelineTypes = mongoose.model(
  'pipelineTypes',
  PipelineTypesSchema
);
