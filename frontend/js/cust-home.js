const topEventsCarouselContainer = document.querySelector('#top-events-carousel-container')
const categoriesCarouselContainer = document.querySelector('#categories-carousel-container')
const concertsCarouselContainer = document.querySelector('#concerts-carousel-card')

// const customer_id = sessionStorage.getItem('userId')
const customer_id = 'Abebe#2314'

const maxCustomerTickets = 12
const maxTopTags = 6
const topEventsPerCarousel = 3
const categoriesPerCarousel = 4
const eventsPerConcertCarousel = 2

const concertsTagId = 1

async function displayCustomerEvents() {
  let allEvents = await dataStore.events();
  let custEvents = await getCustomerEvents(customer_id)
  custEvents = allEvents.filter(event => custEvents.includes(event.eventId)) 

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
  for(let i = 0 ; i < custEvents.length; i++){
    cards.push(createCardComponent(custEvents[i])) 
    if(((i + 1) % topEventsPerCarousel === 0 && i !== 0) || i === custEvents.length - 1){
      appendCarousel(currentCarousel, cards, firstSlide)
      cards = []
      currentCarousel = newCarousel()
      firstSlide = false
    }
  }

  let totalSlides = document.querySelector("#total-top-events-slides")
  totalSlides.innerHTML = Math.ceil(custEvents.length / topEventsPerCarousel)
}

async function displayEventCategories() {
  let tags = await dataStore.tags();
  topTags = tags.slice(0, maxTopTags)

  function newCarousel(){
    const container = document.createElement('div')
    container.classList.add('category-cards-container')
    return container
  }

  async function  appendCarousel(carousel, cards, firstSlide) {
    cards.forEach(card => {
      card.addEventListener('click', async () => {
        let currentURL = window.location.href
        let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "event_list.html"; 
        let events_list = await getEventsByTag(card.tag_id)
        await dataStore.set_filtered(events_list)
        window.location.href = newURL 
      })
      carousel.appendChild(card)
    });
    firstSlide && carousel.setAttribute('data-active', '')
    categoriesCarouselContainer.appendChild(carousel)
  }
  let cards = new Array(topTags.length) 
  let currentCarousel = newCarousel()
  let firstSlide = true
  for(let i = 0; i < topTags.length ; i++){
    let element =createCategoryCard(topTags[i]) 
    element.tag_id = topTags[i].tag_id
    cards.push(element)
    if(((i + 1) % categoriesPerCarousel === 0 && i !== 0) || i === topTags.length - 1){
      await appendCarousel(currentCarousel, cards, firstSlide)
      cards = new Array(topTags.length) 
      currentCarousel = newCarousel()
      firstSlide = false
    }
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
  // const concertIds = await getConcerts();
  const concertIds = await getEventsByTag(concertsTagId);
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
    cards.push(createConcertCard(concerts[i]))
    if(((i + 1) % eventsPerConcertCarousel === 0 && i !== 0) || i === concerts.length - 1){
      console.log(cards)
      appendCarousel(currentCarousel, cards, firstSlide)
      cards = []
      currentCarousel = newCarousel()
      firstSlide = false
    }
  }
  let totalSlides = document.querySelector('#concerts-total-slides')
  totalSlides.innerText = Math.ceil( concerts.length / eventsPerConcertCarousel )

}
displayCustomerEvents();
displayEventCategories();
displayConcerts();
