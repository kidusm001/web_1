const topEventsCarouselContainer = document.querySelector('#top-events-carousel-container')
const categoriesCarouselContainer = document.querySelector('#categories-carousel-container')
const concertsCarouselContainer = document.querySelector('#concerts-carousel-card')

const maxTopEvents = 12
const maxTopTags = 6
const topEventsPerCarousel = 3
const categoriesPerCarousel = 4
const eventsPerConcertCarousel = 2

const concertsTagId = 1

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

  let totalSlides = document.querySelector("#total-top-events-slides")
  totalSlides.innerHTML = Math.ceil(topEvents.length / topEventsPerCarousel)
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
  let totalSlides = document.querySelector('#total-category-slides')
  totalSlides.innerText = Math.ceil( topTags.length / categoriesPerCarousel )
}

async function getConcerts() {
  let concertIds = [];
  try {
    const response = await fetch(`http://0.0.0.0:8000/events/get_events_by_tag.php?tag_id=${concertsTagId}`);
    const events = await response.json();
    events.forEach(event => {
      concertIds.push(Number(event.event_id));
    });
    return concertIds;
  } catch (error) {
    console.error(error);
  }
}

async function displayConcerts() {
  const concertIds = await getConcerts();
  console.log(`ids: ${concertIds}`)
  let concerts = await dataStore.events()
  concerts = concerts.filter(event => concertIds.includes(Number(event.eventId)))
  console.log(`concerts: ${concerts}`) 
  function newCarousel(){
    const carousel = document.createElement('div')
    carousel.classList.add('concert-cards-container')
    return carousel
  }
  function appendCarousel(carousel, cards, firstSlide){
    cards.forEach(card => {
      console.log(card)
      carousel.appendChild(card)
    })
    const container = document.createElement('div')
    container.classList.add('carousel-card')
    firstSlide && container.setAttribute('data-active', '')
    container.appendChild(carousel)
    concertsCarouselContainer.appendChild(container)
  }

  let cards = []
  let currentCarousel = newCarousel()
  let firstSlide = true
  for(let i = 0; i < concerts.length ; i++){
    if((i % eventsPerConcertCarousel === 0 && i !== 0) || i === concerts.length - 1){
      console.log(cards)
      appendCarousel(currentCarousel, cards, firstSlide)
      cards = []
      currentCarousel = newCarousel()
      firstSlide = false
    }
    cards.push(createConcertCard(concerts[i]))
  }
  let totalSlides = document.querySelector('#concerts-total-slides')
  totalSlides.innerText = Math.ceil( concerts.length / eventsPerConcertCarousel )

}
displayTopEvents();
displayEventCategories();
displayConcerts();
