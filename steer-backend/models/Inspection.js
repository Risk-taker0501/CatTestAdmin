const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema({
  scenarioId: {
    type: String
  },
  driverId: {
    type: String
  },
  licensePlate: {
    type: String
  },
  environmentalConditions: {
    parkingStructure: {
      type: String
    },
    weather: {
      type: String
    },
    roadCondition: {
      type: String
    },
    illumination: {
      type: String
    },
    traffic: {
      type: String
    }
  },
  scenarioTest: [
    {
      number: {
        type: Number
      },
      disengagement: {
        type: Boolean
      },
      disengagementType: {
        type: String
      },
      disengagementReason: {
        type: String
      },
      dashcamVideo: {
        type: Boolean
      },
      status: {
        type: String
      },
      notes: {
        type: String
      },
      startTime: {
        type: Date
      },
      endTime: {
        type: Date
      }
    }
  ]
},{toJSON: { virtuals: true }});

module.exports = mongoose.model('inspection', InspectionSchema);
