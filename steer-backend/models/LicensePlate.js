const mongoose = require('mongoose');

const LicensePlate = new mongoose.Schema({
  licensePlate: {
    type: String
  },
  vehicalModel: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('licensePlate', LicensePlate);
