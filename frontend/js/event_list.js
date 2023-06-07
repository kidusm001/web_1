let container = document.querySelector('#events_container')

async function displayFilteredEvents(){
  let filtered_events = await dataStore.get_filtered()
  filtered_events.forEach(event => {
    container.appendChild(createCardComponent(event))
  })
}

displayFilteredEvents()
