alert('your browser supports javascript and it has been enabled, click to continue')

var password = document.getElementById("password")
  , confirm_password = document.getElementById("confirm_password");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('true');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;