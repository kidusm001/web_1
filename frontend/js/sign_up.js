
if(document.querySelector("input[type=datetime]")) flatpickr("input[type=datetime]");

const form = document.querySelector("[data-slides]");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
});
function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return regex.test(password);
  }  
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
function validateCreditCardNumber(cardNumber) {
  // Remove any spaces or dashes from the card number
  cardNumber = cardNumber.replace(/\s+/g, '').replace(/-/g, '');

  // Check if the card number contains only digits
  if (!/^\d+$/.test(cardNumber)) {
    return false;
  }

  // Convert the card number string to an array of digits
  var digits = cardNumber.split('').map(Number);

  var sum = 0;
  var shouldDouble = false;

  // Iterate over the digits from right to left
  for (var i = digits.length - 1; i >= 0; i--) {
    var digit = digits[i];

    if (shouldDouble) {
      // Double the digit
      digit *= 2;

      // If the doubled digit is greater than 9, subtract 9
      if (digit > 9) {
        digit -= 9;
      }
    }

    // Add the digit to the sum
    sum += digit;

    // Toggle the flag for the next iteration
    shouldDouble = !shouldDouble;
  }

  // The card number is valid if the sum is divisible by 10
  return sum % 10 === 0;
}
 
function validateForm(card){
    const inputs = card.querySelectorAll("input[data-required]");
    let isValid = true;
    inputs.forEach((input) => {
        const label = card.querySelector(`label[for=${input.id}]`);
        const errorContainer = input.nextElementSibling;
        errorContainer.textContent = "";
        if (input.required && !input.value.trim()) {
            errorContainer.textContent = `${label.textContent} is required`;
            isValid = false;
        }
    });
    const radios = card.querySelectorAll("input[type=radio]");
    let radioSelected = false;
    if(radios.length > 0) {
        if(![...radios].some((radio) => radio.checked)) {
            const errorContainer = radios[0].closest(".gender-container").querySelector(".radio-error");
            if([...radios].some((radio) => radio.checked).required && ![...radios].some((radio) => radio.checked).value.trim()){
                errorContainer.textContent=`${radios[0].closest(".gender-container").parentElement.textContent} is required`;
                isValid = false;
            }
        }
    }
    const password = card.querySelector('input[name="password"]');
    const confirmPassword = card.querySelector('input[name="confirm-password"]');
    const currentPassword = card.querySelector('input[name="current-password"]');
    if(password && confirmPassword) {
        if(password.value !== confirmPassword.value) {
            const errorContainer = confirmPassword.nextElementSibling;
            errorContainer.textContent = "Passwords do not match";
            isValid = false;
        }
    }
    if(password && !validatePassword(password.value)) {
        const errorContainer = password.nextElementSibling;
        errorContainer.textContent = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character";
        isValid = false;
    }
    if(currentPassword && !validatePassword(currentPassword.value)) {
        const errorContainer = currentPassword.nextElementSibling;
        errorContainer.textContent = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character";
        isValid = false;
    }
    const email = card.querySelector('input[name="email"]');
    if(email && !validateEmail(email.value)) {
        const errorContainer = email.nextElementSibling;
        errorContainer.textContent = "Email is invalid";
        isValid = false;
    }
    const creditCardNumber= card.querySelector('input[name="credit-card"]');
    if(creditCardNumber && !validateCreditCardNumber(creditCardNumber.value)) {
        const errorContainer = creditCardNumber.nextElementSibling;
        errorContainer.textContent = "Credit card number is invalid";
        isValid = false;
    }
    /* isValid = validatePassword(password); */      
    return isValid;
}
/* const buttons = document.querySelectorAll("[data-carousel-button]");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 :button.dataset.carouselButton === "prev"? -1: 0;
      const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
      const progIndicators = button.closest("[data-carousel]").parentElement.querySelector("[data-progress]");
      const activeSlide = slides.querySelector("[data-active]");
  
      if (activeSlide) {
        const isValid = validateForm(activeSlide);
  
        if (!isValid) {
          // Validation failed, prevent navigation to the next slide
          return;
        }
  
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;
  
        if (offset === -1 && newIndex === slides.children.length - 1 && activeSlide === slides.firstElementChild) {
          // Do nothing if the active slide is the first slide and the previous button is clicked
          return;
        }
  
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
        progIndicators.children[newIndex].dataset.progressIndicator = true;
        if(button.dataset.carouselButton === "prev"){
            delete progIndicators.children[newIndex+1].dataset.progressIndicator;
        }
        if (button.dataset.carouselButton === "finish") {
          const form = button.closest("form");
          form.submit();
        }
      }
    });
  });
 */
  const buttons = document.querySelectorAll("[data-carousel-button]");
  const progressIndicatorCircles = document.querySelectorAll(".circle");
  
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : button.dataset.carouselButton === "prev" ? -1 : 0;
      const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
      const progIndicators = button.closest("[data-carousel]").parentElement.querySelector("[data-progress]");
      const activeSlide = slides.querySelector("[data-active]");
  
      if (activeSlide) {
        const isValid = validateForm(activeSlide);
  
        if (!isValid) {
          // Validation failed, prevent navigation to the next slide
          return;
        }
  
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;
  
        if (offset === -1 && newIndex === slides.children.length - 1 && activeSlide === slides.firstElementChild) {
          // Do nothing if the active slide is the first slide and the previous button is clicked
          return;
        }
  
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
        progIndicators.children[newIndex].dataset.progressIndicator = true;
        if (button.dataset.carouselButton === "prev") {
          delete progIndicators.children[newIndex + 1].dataset.progressIndicator;
        }
  
        // Additional code to handle removing gender portion if Merchant is selected
        if (slides.children[newIndex].querySelector("#merchant:checked")) {
          const genderSection = slides.querySelector("[data-gender-section]");
          if (genderSection) {
            genderSection.remove();
          }
        }
  
        if (button.dataset.carouselButton === "finish") {
          const form = button.closest("form");
          form.submit();
        }
      }
    });
  });
  
  progressIndicatorCircles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    const slides = circle.parentElement.previousElementSibling.querySelector("[data-slides]");
    const progIndicators = circle.parentElement;
    const activeSlide = slides.querySelector("[data-active]");

    if (activeSlide) {
      const isValid = validateForm(activeSlide);
  
        if (!isValid) {
          // Validation failed, prevent navigation to the next slide
          return;
        }
      const newIndex = index;
      const currentSlideIndex = [...slides.children].indexOf(activeSlide);

      if (newIndex === currentSlideIndex) {
        // Clicked on the active slide, do nothing
        return;
      }

      slides.children[newIndex].dataset.active = true;
      delete activeSlide.dataset.active;

      progIndicators.children[newIndex].dataset.progressIndicator = true;

      // Remove data-progress-indicator from circles with greater indices
      for (let i = newIndex + 1; i < progIndicators.children.length; i++) {
        delete progIndicators.children[i].dataset.progressIndicator;
      }

      // Additional code to handle removing gender portion if Merchant is selected
      if (slides.children[newIndex].querySelector("#merchant:checked")) {
        const genderSection = slides.querySelector("[data-gender-section]");
        if (genderSection) {
          genderSection.remove();
        }
      }
    }
  });
});

  