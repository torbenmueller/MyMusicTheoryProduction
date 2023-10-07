const Survey = require('../models/survey');
const User = require('../models/user');

exports.saveSurvey = async (req, res, next) => {
	const userIp = req.body.ip;
	const existingIp = await User.findOne({ ip: userIp });

	if (existingIp) return res.status(400).json({ error: 'You have already taken the survey!' });

	const survey = new Survey({
		survey: req.body.survey
	});

	const user = new User({
		ip: userIp
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

	user.save();
}

exports.getResults = async (req, res, next) => {
  Survey.aggregate(
    [
      {
        $unwind: "$survey",
      },
      {
        $match: {
          survey: {
            $in: [
				'Notation',
				'Rhythm and meter',
				'Scales and key signatures',
				'Intervals',
				'Chords',
				'Chord progressions',
				'Modulation'
			],
          },
        },
      },
      {
        $group: {
          _id: "$survey",
          count: {
            $sum: 1,
          },
        },
      },
    ], (err, result) => {
      if (err) {
        console.error(err);
      } else {
		res.status(200).json({
			result: result
		});
      }
    }
  );
}

exports.getCount = async (req, res, next) => {
  Survey.countDocuments({}, (err, count) => {
    if (err) {
      console.error(err);
    } else {
      res.status(200).json({
        count: count
      });
    }
  });
};
