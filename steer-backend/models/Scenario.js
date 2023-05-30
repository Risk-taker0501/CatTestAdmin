const mongoose = require('mongoose');

const ScenarioSchema = new mongoose.Schema({
  scenarioId: {
    type: String
  },
  type: {
    type: String
  },
  description: {
    type: String
  },
  goal: {
    type: String
  }
},{ timestamps: true });

module.exports = mongoose.model('scenario', ScenarioSchema);
