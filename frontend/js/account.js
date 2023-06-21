const mainCards = document.querySelectorAll(".main-card");
const moduleCards = document.querySelectorAll(".module-card");
const backButton = document.querySelectorAll(".back");
const personalForm = document.querySelector("#personal-info-form");
const passwordForm = document.querySelector("#password-form");
const username_id = sessionStorage.getItem("user_id");
const username = document.querySelector("#username_field");

// const username_id = 'Abebe#2314'
// localStorage.setItem('user_id','Abebe#2314')

username.innerText = username_id;
// Add event listeners to the main cards to show the corresponding module card
mainCards.forEach((card) => {
  card.addEventListener("click", () => {
    const target = card.getAttribute("data-target");
    showModuleCard(target);
  });
});

// Add event listeners to the back buttons to go back to the main cards
backButton.forEach((button) => {
  button.addEventListener("click", () => {
    showMainCards();
  });
});

// Function to show a specific module card and hide the rest
function showModuleCard(target) {
  moduleCards.forEach((card) => {
    if (card.classList.contains(target)) {
      card.setAttribute("data-show", "");
    } else {
      card.removeAttribute("data-show");
    }
  });
  document
    .querySelector(".main-cards-container")
    .removeAttribute("data-show-main");
}

// Function to show the main cards and hide the module cards
function showMainCards() {
  moduleCards.forEach((card) => {
    card.removeAttribute("data-show");
  });
  document
    .querySelector(".main-cards-container")
    .setAttribute("data-show-main", "");
}
// Get the search input element and user-account-btn element
var searchInput = document.querySelector('input[name="search"]');
var userAccountBtn = document.querySelector(".user-account-btn");

// Add event listener for focus event on search input
searchInput.addEventListener("focus", function () {
  if (window.innerWidth <= 500) {
    userAccountBtn.classList.add("hidden");
  }
});

// Add event listener for blur event on search input
searchInput.addEventListener("blur", function () {
  if (window.innerWidth <= 500) {
    userAccountBtn.classList.remove("hidden");
  }
});
personalForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Retrieve form data
  const formData = new FormData(personalForm);

  // Send form data to the backend
  fetch("http://0.0.0.0:8000/users/update_user.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response from the backend
      console.log(data); // Log the response data
      // Perform any necessary actions based on the response
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  // Retrieve form data
  const formData = new FormData(passwordForm);
  console.log(formData);
  // Send form data to the backend
  fetch("http://0.0.0.0:8000/users/update_password.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle response from the backend
      console.log(data); // Log the response data
      // Perform any necessary actions based on the response
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
});
