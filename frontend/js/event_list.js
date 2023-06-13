let container = document.querySelector('#events_container')
const username = document.querySelector('#username_field')
const logo = document.querySelector('.logo')

logo.addEventListener('click', goHome)

username.innerText = sessionStorage.getItem('user_id')

async function displayFilteredEvents(){
  let filtered_events = await dataStore.get_filtered()
  filtered_events.forEach(event => {
    let card = createCardComponent(event)
    card.addEventListener('click', () => {
      dataStore.set_selected_event(event)
      let currentURL = window.location.href
      let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "ticket_page.html"; 
      window.location.href = newURL 
    })
    container.appendChild(card)
  })
}

displayFilteredEvents()
