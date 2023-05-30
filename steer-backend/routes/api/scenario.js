const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Scenario = require('../../models/Scenario')

// @route    POST api/Scenario
// @desc     Create or update new Scenario
// @access   Private
router.post(
  '/',
  auth,
  check('scenarioId', 'ScenarioId is required').notEmpty(),
  check('type', 'Type is required').notEmpty(),
  check('description', 'Description is required').notEmpty(),
  check('goal', 'Goal is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      scenarioId,
      type,
      description,
      goal
    } = req.body;

    // build a scenario
    const scenarioFields = {
      scenarioId,
      type,
      description,
      goal
    };

    try {
      let scenario = await Scenario.findOneAndUpdate(
        { scenarioId },
        { $set: scenarioFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(scenario);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/scenario
// @desc     Get all scenario
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const scenarios = await Scenario.find();
    res.json(scenarios);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/scenario/:scenario_id
// @desc     Delete a scenario
// @access   Private
router.delete('/:scenario_id', auth, async (req, res) => {
  try {

    await Promise.all([
      Scenario.findOneAndRemove({ _id: req.params.scenario_id }),
    ]);

    res.json({ msg: 'Scenario deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
