//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
// require mongodb
var mongoose = require('mongoose');
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



const GardenPlot = require('./models/gardenPlot.model')
const mongoDB ="mongodb+srv://Gardener:Nicole708@cluster2.rkbio.mongodb.net/Plots?retryWrites=true&w=majority";
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true});
console.log('Read mongoose connect line');
mongoose.Promise = global.Promise;
console.log('read mongoose promise line');
let db =  mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB conneciton error'));




//home page
app.get('/',function(req,res){
    //var usedPlots=['plot3','plot44']
    var usedPlots = []
    GardenPlot.find(function(err, gardenPlot){
       if(err){
            console.log(err);
        }
        else{
            console.log("i am outside of the loop")
            console.log(gardenPlot)
            for(i = 0 ; i < gardenPlot.length ; i++){
              console.log("i made it in the loop")
                if(gardenPlot[i].used){
                    usedPlots.push(gardenPlot[i])
                    console.log(gardenPlot[i])
                }
            }
        }
    })

    //console.log(usedPlots);
    res.render('index',{usedPlots:usedPlots})
});

app.post('/cropForm',(req,res)=>{
    //intall the SMTP server
    
    console.log("form sent");
   
   var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projectgarden706@gmail.com',
    pass: 'GardenProject123!'
  }
});
var Vrenter = req.body.personEmail;
var Vplot = req.body.plotnumber;
var Vcrop= req.body.chosenCrop;
var Vdate= req.body.datetimepicker1;
var mailOptions = {
  from: 'projectgarden706@gmail.com',
  to: Vrenter,
  subject: 'Your plot from the Community Garden',
  text: 'Thank you for renting a plot at the community garden '+Vrenter+'. You have selected to plant '+Vcrop+' in ' + Vplot+ ' on '+Vdate+'.',
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};
console.log(mailOptions)
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    //const plotName = {name: Vplot}
    //GardenPlot.findOneAndUpdate(plotName,{renter:Vrenter})
    //GardenPlot.findOneAndUpdate(plotName,{crop:Vcrop})
    //GardenPlot.findOneAndUpdate(plotName,{date:Vdate})
    //GardenPlot.findOneAndUpdate(plotName,{used:true})
    
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

app.post('/sendEmail', (req, res) => {
    //intall the SMTP server
    const smtpTrans = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'projectgarden706@gmail.com', 
            pass: 'GardenProject123!'
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    var user = req.body.email;
    var message = req.body.message;
    //specify what the email will look like
    const mailOpts = {
        from: user,
        to: 'projectgarden706@gmail.com',
        subject: 'You have a new message from Community Garden Website',
        text: user + ' wrote: ' + message
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
    res.redirect('/contact');
});


//<<<<<<< AshleyBranch
//information page
const selectedOption =  "";
let id = "1";

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