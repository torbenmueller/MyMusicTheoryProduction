const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
	survey: []
});

module.exports = mongoose.model('Survey', surveySchema);
