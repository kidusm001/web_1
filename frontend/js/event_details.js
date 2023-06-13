const image = document.querySelector('#event_image')
const description = document.querySelector('#event_details')
const dateTime = document.querySelector('#event_datetime')
const price = document.querySelector('#event_price')
const title = document.querySelector('#event_title')
const button = document.querySelector('#buy_ticket_button')
const username = document.querySelector('#username_field')
const logo = document.querySelector('.logo')

logo.addEventListener('click', goHome)

const selected_event = dataStore.get_selected_event()
const user_id = sessionStorage.getItem('user_id')

username.innerText = user_id

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

image.setAttribute('src', selected_event.image)
description.innerText = selected_event.description
dateTime.innerText = selected_event.dateAndTime
price.innerText = selected_event.price
title.innerText = selected_event.title

async function initButton() {
  if(localStorage.getItem('user_type') === 'merchant'){
    button.innerText = selected_event.availableTickets + ' Tickets left'
    button.disabled = true
  }else if(!(await isBought(user_id))){
    button.addEventListener('click', () => {
      initTransaction(selected_event.price)
    })
  }else{
    button.innerText = 'Purchased'
    button.disabled = true
  }
}
initButton()
