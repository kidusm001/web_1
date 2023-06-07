const topEventsCarouselContainer = document.querySelector('#top-events-carousel-container')
const moreEventsButton = document.querySelector('#more-events-button')
const topEventsPerCarousel = 3

// const merchant_id = sessionStorage.getItem('userId')
const merchant_id =  'Eleni#9821'

async function displayMerchantEvents() {
  let allEvents = await dataStore.events();
  let merchEvents = await getMerchantEvents(merchant_id)
  merchEvents = allEvents.filter(event => merchEvents.includes(event.eventId)) 

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
  for(let i = 0 ; i < merchEvents.length; i++){
    cards.push(createCardComponent(merchEvents[i])) 
    if(((i + 1) % topEventsPerCarousel === 0 && i !== 0) || i === merchEvents.length - 1){
      appendCarousel(currentCarousel, cards, firstSlide)
      cards = []
      currentCarousel = newCarousel()
      firstSlide = false
    }
  }

  let totalSlides = document.querySelector("#total-top-events-slides")
  totalSlides.innerHTML = Math.ceil(merchEvents.length / topEventsPerCarousel)
}

moreEventsButton.addEventListener('click', async () => {
  let allEvents = await dataStore.events();
  let merchEvents = await getMerchantEvents(merchant_id)
  let currentURL = window.location.href
  let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "event_list.html"; 
  window.location.href = newURL
})

displayMerchantEvents()