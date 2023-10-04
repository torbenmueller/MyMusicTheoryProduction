const mongoose = require('mongoose');

const useripSchema = mongoose.Schema({
	userip: String
});

module.exports = mongoose.model('Userip', useripSchema);
