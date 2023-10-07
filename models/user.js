const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	ip: String
});

module.exports = mongoose.model('User', userSchema);
