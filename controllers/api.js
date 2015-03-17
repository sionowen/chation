var Question = require('../models/question.js');

var apiController = {
	addQuestion: function(req, res){
	//store a referance to the submitted data
	var newQuestion = req.body;
	console.log(newQuestion.question);

	//create new question instance from the data
	var question = new Question({'question': newQuestion.question});
	//save new instance
	question.save(function(err, savedQuestion){
		res.send(savedQuestion);


		});
	},

	deleteQuestion: function(req, res){
		var toDelete = req.body.targetId;
		Question.findByIdAndRemove(toDelete, function(err, result){
			//assume success here:
			res.send('success');
		});

	},

	getQuestion: function (req, res){
		var questionId = req.params.question_id;

		question.findById(questionId, function(err, result){
			res.send(result);
		});

	}
};

module.exports = apiController;











