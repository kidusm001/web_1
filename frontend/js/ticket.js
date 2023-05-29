var carousel = document.getElementById("banner");

var slideIndex = 0;

var nextSlide = function() {
  slideIndex++;
  if (slideIndex > carousel.children.length - 1) {
    slideIndex = 0;
  }
  carousel.children[slideIndex].style.display = "block";
};

var prevSlide = function() {
  slideIndex--;
  if (slideIndex < 0) {
    slideIndex = carousel.children.length - 1;
  }
  carousel.children[slideIndex].style.display = "block";
};

var autoplay = setInterval(nextSlide, 2000);

carousel.addEventListener("mouseover", function() {
  clearInterval(autoplay);
});

carousel.addEventListener("mouseleave", function() {
  autoplay = setInterval(nextSlide, 2000);
});
