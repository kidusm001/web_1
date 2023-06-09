let container = document.querySelector('#events_container')
const username = document.querySelector('#username_field')
const logo = document.querySelector('.logo')
const signout = document.querySelector('#signout')

signout.addEventListener('click', (event) => {showPopUp(event,signOut)})

logo.addEventListener('click', goHome)

username.innerText = sessionStorage.getItem('user_id')

async function displayFilteredEvents(){
  let filtered_events = await dataStore.get_filtered()
  if(filtered_events.length === 0){
    container.innerHTML = "No events match your discription";
  }else {
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
}

displayFilteredEvents()
