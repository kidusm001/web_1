const mainCards = document.querySelectorAll('[data-personal-info], [data-login-security], [data-payment], [data-log-out]');
  const moduleCards = document.querySelectorAll('.personal-info-card, .login-security-card, .payment-delivery-card, .logout-card');
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