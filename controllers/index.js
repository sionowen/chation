var Question = require('../models/question.js');

var indexController = {

	index: function(req, res) {
		res.render('index');
	},
	middlePage: function(req, res) {
		Question.find({}, function(err, questionsFromDB){

		res.render('middlePage',  
			{
      			user: req.user,
				questions: questionsFromDB
			});
		});
	},
	chat: function(req, res) {
		var questionId = req.params.questionId;
		Question.find({_id: questionId}, function(err, arr){
		var data= arr;
			res.render('index', 
				{
					data: arr[0],
					user: req.user.username
				});
		});


	}
};

module.exports = indexController;