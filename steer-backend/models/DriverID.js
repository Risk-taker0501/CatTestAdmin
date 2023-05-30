const mongoose = require('mongoose');

const DriverIDSchema = new mongoose.Schema({
  driverId: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
},{ timestamps: true });

module.exports = mongoose.model('driverId', DriverIDSchema);