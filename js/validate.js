var submitButton = document.getElementById("submitI");

var postLocation = document.getElementById("results");



function checkresults()
{
  var fName = document.getElementById("firstname").value;
  var lName = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var conemail = document.getElementById("con-email").value;

console.log(fName);

if(fName != "" && lName != "" && email != "" && conemail != "")
{
  if(email != conemail)
  {
    results.textContent = "Please enter same email for both boxes";
  }
  else{
    var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if(regex.test(email))
    {
      results.textContent = "Thank you! You will receive your kool-aid soon.";
    }
    else {
      results.textContent = "Invalid email";
    }
  }

}
else {
  results.textContent = "Please fill in all boxes";
}


}
