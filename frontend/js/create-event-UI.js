

const form_page = document.querySelector("[data-slides]");

const buttons = document.querySelectorAll("[data-carousel-button]");
const progressIndicatorCircles = document.querySelectorAll(".circle");
buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 :button.dataset.carouselButton === "prev"? -1: 0;
      const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
      const progIndicators = button.closest("[data-carousel]").parentElement.querySelector("[data-progress]");
      const activeSlide = slides.querySelector("[data-active]");
      if (activeSlide) {
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
          const form_page = button.closest("form");
          form_page.submit();
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
  
