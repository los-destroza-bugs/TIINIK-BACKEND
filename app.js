var express = require('express');
var path = require('path');

require ('dotenv').config();
var bodyParser = require('body-parser');
const LoginController = require('./routes/loginController');

var app = express();


app.set('port', port);

module.exports = app;

const { API_PORT } = process.env;
var port = process.env.API_PORT || API_PORT;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); 
app.engine('html', require('ejs').__express) 


require('./lib/connectMongoose.js');

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const loginController = new LoginController();

app.use('/',            require('./routes/index'));
app.use('/',   loginController.postJWT);


app.get('/login',    loginController.index);
app.post('/login',   loginController.post);
app.get('/logout',   loginController.logout);


app.get('/', function(req, res){
	res.status(200).send({
		message: 'Creating Backend of TIINIK'
	});
});


