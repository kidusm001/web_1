function validateForm() {
  // Get the values of the form fields.
  var firstName = document.getElementsByClassName("firstName").value;
  var lastName = document.getElementsByClassName("lastName").value;
  var username = document.getElementsByClassName("username").value;
  var email = document.getElementsByClassName("email").value;
  var phone = document.getElementById("phone");
  var password = document.getElementsByClassName("password").value;

  // Validate the first name.
  if (firstName == "") {
    alert("Please enter your first name.");
    fname.style.border = "1px solid red";
    return false;
  }

  // Validate the last name.
  if (lastName == "") {
    alert("Please enter your last name.");
    lname.style.border = "1px solid red";
    return false;
  }

  // Validate the username.
  if (username == "") {
    alert("Please enter a username.");
    username.style.border = "1px solid red";
    return false;
  }

  // Validate the email address.
  if (email == "") {
    alert("Please enter an email address.");
    email.style.border = "1px solid red";
    return false;
  } else if (/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email address.");
    email.style.border = "1px solid red";
    return false;
  }

  //Validate the phone number.
  if (!/^[0-9]{10}$/.test(phone.value)) {
    alert("Please enter a valid phone number.");
    phone.style.border = "1px solid red";
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

  
  // If all of the validations pass, submit the form.
  document.getElementById("form").submit();
 // document.getElementById("form").clearForm();
}

function clearForm() {
  firstname.value= "";
  lastname.value= "";
  username.value = "";
  email.value = "";
  phone.value = "";
  password.value = "";
}