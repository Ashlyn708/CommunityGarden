//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
// require mongodb
//const MongoClient = require('mongodb').MongoClient;
//create express object, call express
var app = express();

//require nodemailer
const nodemailer = require('nodemailer');
//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));




//const uri = "mongodb+srv://Gardener:GardenerPassword@cluster2.rkbio.mongodb.net/plots?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//client.connect(err => {
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  //client.close();
//});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



//home page
app.get('/',function(req,res){
    res.render('index');
});

app.post('/cropForm',(req,res)=>{
    //intall the SMTP server
    console.log("form sent");
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'projectgarden706@gmail.com', 
            pass: 'GardenProject5!'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    var user = req.body.personEmail;
    var plot = req.body.plotNumber;
    var crop= req.body.chosenCrop;
    var date= req.body.datetimepicker1;
    //specify what the email will look like
    const mailOpts = {
        from: user,
        to: 'projectgarden706@gmail.com',
        subject: 'You have a new message from Community Garden Website',
        text: user + ' reserved '+ plot + ' and will be planting'+ crop + ' on '+ date + '.'
    }

    smtpTrans.sendMail(mailOpts, function (err, res) {
        if (err) {
            console.error('there was an error: ', err);
        }
        else {
            console.log("Message was sent!");
            sent = true;
        }
    })
    res.redirect('/');
});

//volunteer page
app.get('/volunteer',function(req,res){
    res.render('volunteer');
});

//get contact
var sent = false;

app.get('/contact', function(req, res){
    res.render('contact',  { sent: sent });
});

app.post('/sendEmail', (req, res) => {});
    //intall the SMTP server
    //const smtpTrans = nodemailer.createTransport({
      //  service: 'Gmail',
        //auth: {
          //  user: 'projectgarden706@gmail.com', 
            //pass: 'GardenProject5!'
        //},
        //tls: {
          //  rejectUnauthorized: false
        //}
    //})
    //var user = req.body.email;
    //var message = req.body.message;
    //specify what the email will look like
    //const mailOpts = {
      //  from: user,
        //to: 'projectgarden706@gmail.com',
        //subject: 'You have a new message from Community Garden Website',
        //text: user + ' wrote: ' + message
    //}

    //smtpTrans.sendMail(mailOpts, function (err, res) {
      //  if (err) {
        //    console.error('there was an error: ', err);
        //}
        //else {
          //  console.log("Message was sent!");
            //sent = true;
        //}
    //})
    //res.redirect('/contact');
//});


//<<<<<<< AshleyBranch
//information page
const selectedOption =  "";
let id = "";

app.get('/information', function(req, res){      
    fetch('http://harvesthelper.herokuapp.com/api/v1/plants/'+ id+ '?api_key=2f73e248712316f4c8935ca1028b7c0b',)
    .then(res => res.json())
    .then(data => {
        res.render('information', {data: data})
    });
})
app.post('/information', function(req, res){
    id = req.body.selectedOption;
    res.redirect('/information');
})

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});