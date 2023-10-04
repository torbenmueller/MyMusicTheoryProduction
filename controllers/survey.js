const Survey = require('../models/survey');
const Userip = require('../models/userip');

exports.saveSurvey = async (req, res, next) => {
	const userIp = req.body.ip;
	const existingIp = await Userip.findOne({ userip: userIp });

	if (existingIp) return res.status(400).json({ error: 'You have already taken the survey!' });

	const survey = new Survey({
		survey: req.body.survey
	});

	const userip = new Userip({
		userip: req.body.ip
	});
	
	survey.save().then(() => {
		res.status(201).json({
			message: 'Survey saved successfully!'
		});
	}).catch(error => {
		res.status(500).json({
			message: 'Saving the survey failed!'
		});
	});

	userip.save();
}
