const Survey = require('../models/survey');

exports.saveSurvey = (req, res, next) => {
	const survey = new Survey({
		survey: req.body.survey
	});
	
	console.log(survey);
	const ip = req.clientIp;
	console.log("IP", ip);
	
	survey.save().then(() => {
		res.status(201).json({
			message: 'Survey saved successfully!'
		});
	}).catch(error => {
		res.status(500).json({
			message: 'Saving the survey failed!'
		});
	});
}