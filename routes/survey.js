const express = require('express');
const router = express.Router();
const SurveyController = require('../controllers/survey');

router.post('', SurveyController.saveSurvey);

module.exports = router;
