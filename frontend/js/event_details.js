const image = document.querySelector('#event_image')
const description = document.querySelector('#event_details')
const dateTime = document.querySelector('#event_datetime')
const price = document.querySelector('#event_price')
const title = document.querySelector('#event_title')
const button = document.querySelector('#buy_ticket_button')
const username = document.querySelector('#username_field')

const selected_event = dataStore.get_selected_event()
const user_id = localStorage.getItem('user_id')

username.innerText = user_id

async function isBought(user_id){
  console.log('checking isBought')
  let bought = await getBought(user_id)
  console.log(`bought lenght ${bought.length}`)
  bought.forEach(item => console.log(item.event_id))
  console.log(`user_id ${user_id}`)
  console.log(`selected_event id ${selected_event.eventId}`)

  let hasTicket = false
  for(let i = 0; i < bought.length; i++){
    console.log(`bought at ${bought[i].event_id} event ${selected_event.eventId} verdict ${Number(bought[i].event_id) === selected_event.eventId}`)
    if(Number(bought[i].event_id) === selected_event.eventId){
      hasTicket = true; break;
    }
  }
  return hasTicket
}

// let hasTicket = await isBought(user_id)
// console.log(`hasTicket ${hasTicket}`)

image.setAttribute('src', selected_event.image)
description.innerText = selected_event.description
dateTime.innerText = selected_event.dateAndTime
price.innerText = selected_event.price
title.innerText = selected_event.title

async function initButton() {
  if(!(await isBought(user_id))){
    console.log('not bought')
    button.addEventListener('click', () => {
      // payment
      initTransaction(selected_event.price)
    })
  }else{
    button.innerText = 'Purchased'
    button.disabled = true
  }
}
initButton()
