const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Inspection = require('../../models/Inspection');

// @route    GET api/inspection
// @desc     Get all inspections
// @access   private
router.get('/:page_number/:from/:to/:search', auth, async (req, res) => {
  try {
    let {
      page_number,
      from,
      to,
      search
    } = req.params;
    let searchString = '';
    if(search != 'all') searchString = search;
    let inspections = await Inspection.find({startTime:{$gte: new Date(from),$lte: new Date(to)}})
                                        .sort({startTime: -1})
                                        .skip(5*(page_number - 1))
                                        .limit(5);
    let temp_data = inspections;
    let temp_p = [];
    let t = [];
    temp_data.forEach((element) => {
      let startTime = new Date(element.get('startTime'))
      let _startTime = startTime.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      let endTime = new Date(element.get('endTime'))
      _endTime = endTime.toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      element.scenarioTest.forEach((e,index) => {
        temp_p.push({
          run: index + 1,
          scenarioID: element.get('scenarioID'),
          status: e.get('status'),
          driverID: element.get('driverID'),
          licensePlate: element.get('licensePlate'),
          disengagementType: e.get('disengagementType'),
          disengagementReason: e.get('disengagementReason'),
          disengagement: e.get('disengagement'),
          notes: e.get('notes'),
          dashcamVideo: e.get('dashcamVideo'),
          startTime: _startTime,
          endTime: _endTime,
          parkingStructure:
            element.get('environmentalConditions').parkingStructure,
          roadCondition: element.get('environmentalConditions').roadCondition,
          weather: element.get('environmentalConditions').weather,
          illumination: element.get('environmentalConditions').illumination,
          trafficCondition:
            element.get('environmentalConditions').trafficCondition,
        })
      })
      t = t.concat(temp_p)
      temp_p = []
    })
    let temp = t.filter((row) => {
      for (let key in row) {
        let ti = row[key]
        if (String(ti).toLowerCase().search(searchString.toLowerCase()) > -1) return true;
      }
      return false;
    });
    t = temp;
    res.json(t);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
