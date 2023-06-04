const topEventsCarouselContainer = document.querySelector('#top-events-carousel-container')
const categoriesCarouselContainer = document.querySelector('#categories-carousel-container')

const maxTopEvents = 12
const maxTopTags = 6
const topEventsPerCarousel = 3
const categoriesPerCarousel = 4

async function displayTopEvents() {
  let events = await dataStore.events();
  topEvents = events.sort((a, b) => {
      const aScore = a.availableTickets * a.price;
      const bScore = b.availableTickets * b.price;
      return bScore - aScore;
  }).slice(0,maxTopEvents);

  function newCarousel(){
    const topEventsContainer = document.createElement('div')
    topEventsContainer.classList.add('top-events-container')
    topEventsContainer.setAttribute('id', 'top-events-container')
    return topEventsContainer
  }

  function appendCarousel(carousel, cards, firstSlide){
    const carouselCard = document.createElement('div')
    carouselCard.classList.add('carousel-card')
    cards.forEach(card => {
      carousel.appendChild(card)
    })
    firstSlide && carouselCard.setAttribute('data-active', '')
    carouselCard.appendChild(carousel)
    topEventsCarouselContainer.appendChild(carouselCard)
  }

  let cards = [];
  let currentCarousel = newCarousel();
  let firstSlide = true;
  for(let i = 0 ; i < topEvents.length; i++){
    if((i % topEventsPerCarousel === 0 && i !== 0) || i === topEvents.length - 1){
      appendCarousel(currentCarousel, cards, firstSlide)
      cards = []
      currentCarousel = newCarousel()
      firstSlide = false
    }
    cards.push(createCardComponent(topEvents[i])) 
  }
}

async function displayEventCategories() {
  let tags = await dataStore.tags();
  topTags = tags.slice(0, maxTopTags)

  function newCarousel(){
    const container = document.createElement('div')
    container.classList.add('category-cards-container')
    return container
  }

  function  appendCarousel(carousel, cards, firstSlide) {
    cards.forEach(card => {
      carousel.appendChild(card)
    });
    firstSlide && carousel.setAttribute('data-active', '')
    categoriesCarouselContainer.appendChild(carousel)
  }
  let cards = []
  let currentCarousel = newCarousel()
  let firstSlide = true
  for(let i = 0; i < topTags.length ; i++){
    if((i % categoriesPerCarousel === 0 && i !== 0) || i === topTags.length - 1){
      appendCarousel(currentCarousel, cards, firstSlide)
      cards = []
      currentCarousel = newCarousel()
      firstSlide = false
    }
    cards.push(createCategoryCard(topTags[i]))
  }
}

displayTopEvents();
displayEventCategories();
