const express = require('express');
const router = express.Router();
const MelodiesController = require('../controllers/survey');

router.post('', MelodiesController.saveSurvey);

module.exports = router;
