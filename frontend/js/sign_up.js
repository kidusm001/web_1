
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
    const email = card.querySelector('input[name="email"]');
    if(email && !validateEmail(email.value)) {
        const errorContainer = email.nextElementSibling;
        errorContainer.textContent = "Email is invalid";
        isValid = false;
    }
    return isValid;
}
const buttons = document.querySelectorAll("[data-carousel-button]");
const progressIndicatorCircles = document.querySelectorAll(".circle");

buttons.forEach((button) => {
  button.addEventListener("click",async () => {
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

    if(document.querySelector('#merchant').checked){
      let section = document.querySelector('#gender-selection')
      if(section !== null) section.remove()
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
        password.value = await sha256(password.value)
        const user_name = document.createElement('input')
        const first_name = document.querySelector('#firstname')
        user_name.setAttribute('type', 'hidden')
        user_name.setAttribute('name', 'user_name')
        user_name.setAttribute('value', `${first_name.value}#${Math.floor(Math.random() * 9000) + 1000}`)
        form.appendChild(user_name)
        const formData = new FormData(form);
        formData.delete('confirm-password')
        if(document.querySelector('#customer').checked){
          let val = formData.get('sex') == 'M' ? 0 : 1;
          formData.set('sex', val)
        }
        for(let [name, value] of formData) console.log(`${name}: ${value}`)
        let address = document.querySelector('#merchant').checked
                            ? '../../backend/php/users/create_merchant.php'
                            : '../../backend/php/users/create_customer.php';
        fetch(address, {
         method: 'POST',
         body: formData
        }).then(response => {
          if(response.ok){
            alert(`Account with User name ${user_name.value} created successfully`)
            sessionStorage.setItem('user_id', user_name.value) 
            sessionStorage.setItem('user_type', 'merchant')
            window.location.href = "../merch-home.html"
          }else{
            alert(" Failed !")
          }
        }).catch(error => {
          alert(error);
        })
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
