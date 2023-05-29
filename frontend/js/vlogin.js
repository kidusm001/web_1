function validateForm() {
  // Get the username and password values from the form.
  var username = document.getElementsByClassName("username").value;
  var password = document.getElementsByClassName("password").value;

  // Check if the username and password are valid.
  if (username == "") {
    alert("Please enter a username.");
    username.style.border = "1px solid red";
    return false;
  }

  // Validate the password.
  if (password == "") {
    alert("Please enter a password.");
    password.style.border = "1px solid red";
    return false;
  } else if (password.length < 8) {
    alert("Please enter a password that is at least 6 characters long.");
    password.style.border = "1px solid red";
    return false;
  }

  // The username and password are valid, so submit the form.
  document.getElementsById("Form").submit();
 // document.getElementsById("Form").clearForm();

}

function clearForm() {
  username.value = "";
  password.value = "";
}