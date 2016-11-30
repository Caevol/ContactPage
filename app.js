var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/css", express.static(__dirname + '/css'));
app.use("/js", express.static(__dirname + '/js'));


function checkresults(req, res, next)
{
  var fName = req.body.firstname;
  var lName = req.body.lastname;
  var email = req.body.email;
  var conemail = req.body.email;
  // var results = document.getElementById("results").value;
  // var fName = document.getElementById("firstname").value;
  // var lName = document.getElementById("lastname").value;
  // var email = document.getElementById("email").value;
  // var conemail = document.getElementById("con-email").value;

console.log(fName);

if(fName != "" && lName != "" && email != "" && conemail != "")
{
  if(email != conemail)
  {
    //results.textContent = "Please enter same email for both boxes";
  }
  else{
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(regex.test(email))
    {
      //results.textContent = "Thank you! You will receive your kool-aid soon.";
      //handle info and send out
      sendmail({
        fromt: 'no-reply@server.com',
        to: 'logan@loganpedersen.com',
        subject: 'kool-aid order',
        html: 'First name: ' + req.firstname + ', Last name: ' + req.lastname + ', email: ' + req.email
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
      })
      res.redirect('/success');
    }
    else {
      //results.textContent = "Invalid email";
    }
  }

}
else {
  //results.textContent = "Please fill in all boxes";
}
}



app.use('/', index);
//app.use('/users', users);

app.post('/', function(req, res, next){
Console.log("PLEASE");
checkresults(req, res, next);



})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
