const topEventsCarouselContainer = document.querySelector('#top-events-carousel-container')
const moreEventsButton = document.querySelector('#more-events-button')
const topEventsPerCarousel = 3
const username = document.querySelector('#username_field')
const logo = document.querySelector('.logo')

logo.addEventListener('click', goHome)

// const merchant_id = sessionStorage.getItem('userId')
const merchant_id =  'Eleni#9821'
localStorage.setItem('user_type', 'merchant')

username.innerText = merchant_id

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
      card.addEventListener('click', () => {
        dataStore.set_selected_event(card.event)
        let currentURL = window.location.href
        let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "ticket_page.html"; 
        window.location.href = newURL 
      })
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
    let card = createCardComponent(merchEvents[i])
    card.event = merchEvents[i]
    cards.push(card) 
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
  dataStore.set_filtered(merchEvents)
  let currentURL = window.location.href
  let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "event_list.html"; 
  window.location.href = newURL
})

displayMerchantEvents()
