const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const DriverId = require('../../models/DriverID')

// @route    POST api/driverId
// @desc     Create or update new driverId
// @access   Private
router.post(
  '/',
  auth,
  check('driverId', 'DriverId is required').notEmpty(),
  check('user', 'User is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      _id,
      driverId,
      user
    } = req.body;

    // build a driverId
    const driverIdFields = {
      driverId,
      user
    };
    if(_id == null) 
    {
      let driver = new DriverId(driverIdFields);
      driver.save();
      return res.json(driver);
    }
    try {
      let driver = await DriverId.findOneAndUpdate(
        { _id },
        { $set: driverIdFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(driver);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/driverId
// @desc     Get all driverId
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const driverIds = await DriverId.find().populate('user', ['username']);;
    res.json(driverIds);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/driverId/:driver_id
// @desc     Delete a driverId
// @access   Private
router.delete('/:driver_id', auth, async (req, res) => {
  try {

    await Promise.all([
      DriverId.findOneAndRemove({ _id: req.params.driver_id }),
    ]);

    res.json({ msg: 'DriverId deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
