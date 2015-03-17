//client slide

var onQuestionSubmit = function(e){

	e.preventDefault();




	var newQuestionData = {
		question: $('#question').val()
	};

	this.reset();

	$.post('/api/addQuestion', newQuestionData, function(dataFromServer){
	  console.log('DataFromServer', dataFromServer);

	$('#question-List').append(
		'<li>' + dataFromServer.question + '</li>'
		);
	});
};

var questionDelete = function(e){
	e.preventDefault();

	var originalQuestionElement = $(this).closest('.question');
	var targetId = originalQuestionElement.attr('data-id');

	  $.post('/api/deleteQuestion', {targetId: targetId}, function(dataFromServer){
    // When a success response is sent back
    originalQuestionElement.remove();
  });
};

var questionView = function(e){
	e.preventDefault();

	$('view-modal').modal('show');

	var originalQuestionElement = $(this).closest('.question');
	var targetId = originalQuestionElement.attr('data-id');

	$.get('/api/getQuestion/' + targetId, function(dataFromServer){
		$('#view-modal .question').text(dataFromServer.question);
	});
};

//initializt the event listeners

$(document).on('ready', function(){
	//when submitting the new-question form,
	//use Ajax to post the data
	$('#newQuestion').on('submit', onQuestionSubmit);

	$(document).on('click', ".delete", questionDelete);

		//when you click the delete button you need the ID asosiated
		//with the question. send an ajax request to a route in the 
		//back end that will delete the question from the database.
	// $(document).on('click', 'view', questionView);
});




