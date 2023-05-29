
let form = document.getElementsByClassName("login");
let username = form.elements["username"];
let password = form.elements["password"];
let container = form.parentElement;
img.style.display = "none";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function setError(element, message) {
  let error = element.nextElementSibling;
  error.textContent = message;
  error.style.display = "block";
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

  if (username.value == "") {
    setError(username, "Username is required");
    isValid = false;
  } else {
    setSuccess(username);
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

  if (isValid) {
    form.submit();
  } else {
    container.style.border = "2px solid red";
  }
}

function isValidPassword(password) {
  // Regular expression to match password pattern
  const passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
  return passwordPattern.test(password);
}

function clearForm() {
  username.value = "";
  password.value = "";

  // Clear error messages and styles
  setSuccess(username);
  setSuccess(password);

  const inputControls = document.querySelectorAll(".input-control");
  inputControls.forEach((control) => control.classList.remove("error"));

  container.style.border = "none";
}

form.addEventListener("reset", function (e) {
  clearForm();
});
