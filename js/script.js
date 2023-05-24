
flatpickr("input[type=datetime]", {minDate: "today"});
const buttons = document.querySelectorAll("[data-carousel-button]");
buttons.forEach(button =>{button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]")
        console.log([...slides.children].indexOf(activeSlide));
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) {
            newIndex = slides.children.length - 1
            
        }
        if (newIndex >= slides.children.length) {
            newIndex = 0
            
        }
        
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        const currentSlide=button.closest("[data-carousel-slider-cont]").querySelector("[data-curr-slide]");
    currentSlide.innerHTML=newIndex+1;
    }); 
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");
    const activeSlide = slides.querySelector("[data-active]");
    const currentSlide=button.closest("[data-carousel-slider-cont]").querySelector("[data-curr-slide]");
    currentSlide.innerHTML=[...slides.children].indexOf(activeSlide)+1;
    const totalSlides=button.closest("[data-carousel-slider-cont]").querySelector("[data-total-slides]");
    totalSlides.innerHTML=slides.children.length;
});
