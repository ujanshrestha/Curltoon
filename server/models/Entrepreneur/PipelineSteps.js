const mongoose = require('mongoose');

const PipelineStepsSchema = new mongoose.Schema({
  name: { type: String },
  description: {type: String},
  image: {type: String},
  pipelineType : { type: mongoose.SchemaTypes.ObjectId, ref: 'pipelineTypes' }
    
});

module.exports = PipelineSteps = mongoose.model(
  'pipelineSteps',
  PipelineStepsSchema
);
