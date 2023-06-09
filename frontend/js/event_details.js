const image = document.querySelector('#event_image')
const description = document.querySelector('#event_details')
const dateTime = document.querySelector('#event_datetime')
const price = document.querySelector('#event_price')
const button = document.querySelector('#buy_ticket_button')

const selected_event = dataStore.get_selected_event()
const user_id = localStorage.getItem('user_id')

async function isBought(user_id){
  let bought = await getBought(user_id)
  let hasTicket = false
  for(let i = 0; i < bought.length; i++){
    if(Number(bought[i].event_id) === selected_event.eventId){
      hasTicket = true; break;
    }
  }
  return hasTicket
}

let hasTicket = isBought(user_id)

image.setAttribute('src', selected_event.image)
description.innerText = selected_event.description
dateTime.innerText = selected_event.dateAndTime
price.innerText = selected_event.price

if(!hasTicket){
  button.addEventListener('click', () => {
    // payment 
  })
}else{
  button.innerText = 'Purchased'
  button.disabled = true
}

