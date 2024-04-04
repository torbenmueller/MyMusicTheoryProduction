const Survey = require("../models/survey");
const User = require("../models/user");

exports.saveSurvey = async (req, res, next) => {
  try{
    const userIp = req.body.ip;
    const existingIp = await User.findOne({ ip: userIp });
  
    if (existingIp)
      return res
        .status(400)
        .json({ error: "You have already taken the survey!" });
  
    const survey = new Survey({
      survey: req.body.survey,
    });
  
    const user = new User({
      ip: userIp,
    });
  
    survey
      .save()
      .then(() => {
        res.status(201).json({
          message: "Survey saved successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Saving the survey failed!",
        });
      });
  
    user.save();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const result = await Survey.aggregate([
      {
        $unwind: "$survey",
      },
      {
        $match: {
          survey: {
            $in: [
              "Notation",
              "Rhythm and meter",
              "Scales and key signatures",
              "Intervals",
              "Chords",
              "Chord progressions",
              "Modulation",
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
    ]);
    res.status(200).json({
      result: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.getCount = async (req, res, next) => {
  try {
    const count = await Survey.countDocuments();
    res.status(200).json({
      count: count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
