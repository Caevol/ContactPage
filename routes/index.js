var express = require('express');
var router = express.Router();
var sendmail = require('sendmail')();



function checkresults(req, res, next)
{
  var fName = req.body.firstname;
  var lName = req.body.lastname;
  var email = req.body.email;
  conemail = req.body.email;
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
      var print = 'First name: ' + fName + ', Last name: ' + lName + ', email: ' + email + ", has requested kool-aid.";
      //results.textContent = "Thank you! You will receive your kool-aid soon.";
      //handle info and send out
      sendmail({
        from: 'no-reply@server.com',
        to: 'loganped01@gmail.com',
        subject: 'kool-aid order',
        html: print
      }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
      });

      res.redirect('/success');


    }
    else {
      res.redirect('/fail');
    }
  }

}
else {
  res.redirect('/fail');
  //results.textContent = "Please fill in all boxes";
}
}


/* GET home page. */
router.get('/', function(req, res, next){
  res.render('index');
})

router.post('/', function(req, res, next){
checkresults(req, res, next);

// sendmail({
//   from: 'no-reply@server.com',
//   to: 'logan@loganpedersen.com',
//   subject: 'test',
//   html: 'THIS IS A TEST'
// }, function(err, reply) {
//   console.log(err && err.stack);
//   console.dir(reply);
//   res.redirect('fail');
// });

})


router.get('/fail', function(req, res, next){
  res.render('fail');
})

router.get('/success', function(req, res, next){
  res.render('success');
})



module.exports = router;
