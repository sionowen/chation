var express = require('express');
var bodyParser = require('body-parser');

var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/question-app');

var session = require('express-session');
var cookieParser = require('cookie-parser');

var flash = require('connect-flash');

var passport = require('passport');

var passportConfig = require('./config/passport');
var indexController = require('./controllers/index.js');
var apiController = require('./controllers/api.js');
var authenticationController = require('./controllers/authentication');


var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));


app.use(cookieParser());
app.use(flash());

// Initialize the express session. Needs to be given a secret property.
// Also requires the resave option (will not force a resave of session if not modified)
// as well as saveUninitialized(will not automatically create empty data)
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

// Hook in passport to the middleware chain
app.use(passport.initialize());

// Hook in the passport session management into the middleware chain.
app.use(passport.session());

// Our get request for viewing the login page
app.get('/auth/login', authenticationController.login);

// Post received from submitting the login form
app.post('/auth/login', authenticationController.processLogin);

// Post received from submitting the signup form
app.post('/auth/signup', authenticationController.processSignup);

// Any requests to log out can be handled at this url
app.get('/auth/logout', authenticationController.logout);

// ***** IMPORTANT ***** //
// By including this middleware (defined in our config/passport.js module.exports),
// We can prevent unauthorized access to any route handler defined after this call
// to .use()
app.use(passportConfig.ensureAuthenticated);

// Because this route occurs after the ensureAuthenticated middleware, it will require
// authentication before access is allowed.

app.get('/chat', indexController.index);
app.get('/', indexController.middlePage);
//app.get('/splash', indexController.splash);
app.get('/question/:questionId', indexController.chat);
//api routes
app.post('/api/addQuestion', apiController.addQuestion);
app.post('/api/deleteQuestion', apiController.deleteQuestion);

var http = require('http').Server(app);
http.listen(8675, function(){
	console.log('listening on *:8675');
});

//attach the socket server
var io = require('socket.io')(http);

//listen for incoming connections from client
io.on('connection', function(socket){
	console.log('a Coder has connected');

//When the given socket is disconnected, print a message
	socket.on('disconnect', function(){
		console.log('Coder has left');
	});

//when the client emits a 'message', we print that here
	socket.on('message', function(msg){
		console.log('message:' +msg);
	});

});
//this portion takes the message that the server recieves
//and emits it to all connected clients
io.on('connection', function (socket){
	io.emit('userConnected', socket.id)
	socket.on('message', function(msg){
		io.emit('message', {msg: msg, id: socket.id});
	});
});
