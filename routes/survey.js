const express = require('express');
const router = express.Router();
const SurveyController = require('../controllers/survey');

router.post('', SurveyController.saveSurvey);
router.get('/results', SurveyController.getResults);
router.get('/count', SurveyController.getCount);

module.exports = router;
