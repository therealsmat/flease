const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('User', userSchema);