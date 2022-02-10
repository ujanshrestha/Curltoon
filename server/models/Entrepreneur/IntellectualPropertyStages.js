const mongoose = require('mongoose');

const IntellectualPropertyStagesSchema = new mongoose.Schema({
    currentStage: { type: String },
    currentStageDueDate: { type: Date },
    currentStageFreelancer: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
    current: {type: Boolean},
    totalBudget: {type: String},
    intellectualProperty : { type: mongoose.SchemaTypes.ObjectId, ref: 'intellectualproperty' },
    dueDate: { type: Date }
});

module.exports = IntellectualPropertyStages = mongoose.model(
  'intellectualpropertystages',
  IntellectualPropertyStagesSchema
);
