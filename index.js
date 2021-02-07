//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
//create express object, call express
var app = express();
//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//home page
app.get('/',function(req,res){
    res.render('index');
});

//information page
app.get('/information',function(req,res){
    res.render('information');
});

//volunteer page
app.get('/volunteer',function(req,res){
    res.render('volunteer');
});

//contact page
app.get('/contact',function(req,res){
    res.render('contact');
});

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});