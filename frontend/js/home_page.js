const topEventsContainer = document.querySelector('#top-events-section')
const maxTopEvents = 8

async function displayTopEvents() {
  let events = await dataStore.events();
  topEvents = events.sort((a, b) => {
      const aScore = a.availableTickets * a.price;
      const bScore = b.availableTickets * b.price;
      return bScore - aScore;
  }).slice(0,maxTopEvents);

  topEvents.forEach(event => {
   topEventsContainer.appendChild( createCardComponent(event) )
  })
}

displayTopEvents();
