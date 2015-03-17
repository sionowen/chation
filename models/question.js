var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
	question: String
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;