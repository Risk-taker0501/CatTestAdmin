const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const LicensePlate = require('../../models/LicensePlate');

// @route    POST api/licensePlate
// @desc     Create or update new LicensePlate
// @access   Private
router.post(
  '/',
  auth,
  check('licensePlate', 'LicensePlate is required').notEmpty(),
  check('vehicalModel', 'VehicalModel is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      _id,
      licensePlate,
      vehicalModel
    } = req.body;

    // build a LicensePlate
    const licenseFields = {
      licensePlate,
      vehicalModel,
    };
    if(_id == null) 
    {
      let license = new LicensePlate(licenseFields);
      license.save();
      return res.json(license);
    };
    try {
      let license = await LicensePlate.findOneAndUpdate(
        { _id },
        { $set: licenseFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(license);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/licensePlate
// @desc     Get all licensePlate
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const licensePlates = await LicensePlate.find();
    res.json(licensePlates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/licensePlate/:license_id
// @desc     Delete a licensePlate
// @access   Private
router.delete('/:license_id', auth, async (req, res) => {
  try {

    await Promise.all([
      LicensePlate.findOneAndRemove({ _id: req.params.license_id }),
    ]);

    res.json({ msg: 'LicensePlate deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
