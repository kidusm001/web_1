const mainCards = document.querySelectorAll('.main-card');
  const moduleCards = document.querySelectorAll('.module-card');
  const backButton = document.querySelectorAll('.back');

  // Add event listeners to the main cards to show the corresponding module card
  mainCards.forEach((card) => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      showModuleCard(target);
    });
  });

  // Add event listeners to the back buttons to go back to the main cards
  backButton.forEach((button) => {
    button.addEventListener('click', () => {
      showMainCards();
    });
  });

  // Function to show a specific module card and hide the rest
  function showModuleCard(target) {
    moduleCards.forEach((card) => {
      if (card.classList.contains(target)) {
        card.setAttribute('data-show', '');
      } else {
        card.removeAttribute('data-show');
      }
    });
    document.querySelector('.main-cards-container').removeAttribute('data-show-main');
  }

  // Function to show the main cards and hide the module cards
  function showMainCards() {
    moduleCards.forEach((card) => {
      card.removeAttribute('data-show');
    });
    document.querySelector('.main-cards-container').setAttribute('data-show-main', '');
  }
  // Get the search input element and user-account-btn element
var searchInput = document.querySelector('input[name="search"]');
var userAccountBtn = document.querySelector('.user-account-btn');



// Add event listener for focus event on search input
searchInput.addEventListener('focus', function() {
  if (window.innerWidth <= 500) {
    userAccountBtn.classList.add('hidden');
  }
});

// Add event listener for blur event on search input
searchInput.addEventListener('blur', function() {
  if (window.innerWidth <= 500) {
    userAccountBtn.classList.remove('hidden');
  }
});

// Add event listener for window resize event
// window.addEventListener('resize', handleResize);

// Call handleResize initially to check the initial window size

