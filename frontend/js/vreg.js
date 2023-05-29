
let form = document.getElementsByClassName("reg");
let fname = form.elements["fname"];
let lname = form.elements["lname"];
let username = form.elements["username"];
let email = form.elements["email"];
let password = form.elements["password"];
let number = form.elements["phone"];
img.style.display = "none";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function setError(element, message) {
  let error = element.nextElementSibling;
  error.textContent = message;
  error.style.display = "block";
  //element.classList.add("error-input");
  img.style.display = "inline-block";

  const inputControl = element.parentElement;
  inputControl.classList.add("error");
}

function setSuccess(element) {
  let errorElement = element.nextElementSibling;
  errorElement.textContent = "";
  const inputControl = element.parentElement;
  inputControl.classList.remove("error");
}

function validateForm() {
  let isValid = true;

  if (fname.value == "") {
    setError(fname, "fname is required");
    isValid = false;
  } else {
    setSuccess(fname);
  }

  if (lname.value == "") {
    setError(lname, "lname is required");
    isValid = false;
  } else {
    setSuccess(lname);
  }

  if (username.value == "") {
    setError(username, "Username is required");
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (email.value == "") {
    setError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    setError(email, "Invalid email format");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (password.value == "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (password.value.length < 8) {
    setError(password, "Password must be at least 8 characters");
    isValid = false;
  } else if (!isValidPassword(password.value)) {
    setError(
      password,
      "Password must contain at least 1 uppercase letter and 1 number"
    );
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (phone.value == "") {
    setError(phone, "phone number is required");
    isValid = false;
  } else {
    setSuccess(phone);
  }

  if (isValid) {
    form.submit();
  } else {
    container.style.border = "2px solid red";
  }
}

function isValidEmail(email) {
  // basic email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}
function isValidPassword(password) {
  // Regular expression to match password pattern
  const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
  return passwordPattern.test(password);
}

function isValidPhone(phone) {
    // Regular expression to match phone pattern
    const phonePattern = /^\+?[\d\s\-\(\)]{7,}$/;
    return phonePattern.test(phone);
}

function clearForm() {
  username.value = "";
  email.value = "";
  password.value = "";
  phone.value = "";
  img.style.display = "none";

  // Clear error messages and styles
  setSuccess(fname);
  setSuccess(lname);
  setSuccess(username);
  setSuccess(email);
  setSuccess(password);
  setSuccess(phone);

  const inputControls = document.querySelectorAll(".input-control");
  inputControls.forEach((control) => control.classList.remove("error"));

  container.style.border = "none";
}

form.addEventListener("reset", function (e) {
  clearForm();
});
