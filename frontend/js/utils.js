async function sha256(str) {
  const buffer = new TextEncoder().encode(str);
  return crypto.subtle.digest('SHA-256', buffer).then(hash => {
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  });
}

function Event(eventId, merchantId, title, description, availableTickets, price, dateAndTime, image) {
  this.eventId = Number(eventId);
  this.merchantId = merchantId;
  this.title = title;
  this.description = description;
  this.availableTickets = Number(availableTickets);
  this.price = Number(price);
  this.dateAndTime = dateAndTime;
  this.image = image;
}

function Tag(tag_id, tag_name){
  this.tag_id = tag_id;
  this.tag_name = tag_name;
}

async function getUserType(user_id) {
 try{
    const response = await fetch(`http://0.0.0.0:8000/users/get_user_type.php?user_id=${encodeURIComponent(user_id)}`)
    const data = await response.json()
    return data
  }catch(error){
    console.error(error);
    return null;
  }
}

async function getCustomerEvents(customer_id){
  try {
    const response = await fetch(`http://0.0.0.0:8000/events/get_customer_events.php?customer_id=${encodeURIComponent(customer_id)}`);
    const data = await response.json()
    return data.map(item => Number(item.event_id));
  }catch(error){
    console.error(error);
    return null;
  }
}

async function getMerchantEvents(merchant_id) {
  try {
    const response = await fetch(`http://localhost:8000/events/get_merchant_events.php?merchant_id=${encodeURIComponent(merchant_id)}`);
    const data = await response.json();
    return data.map(item => Number(item.event_id));
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getEventsByTag(tag_id){
  try {
    const response = await fetch(`http://localhost:8000/events/get_events_by_tag.php?tag_id=${encodeURIComponent(tag_id)}`)
    const data = await response.json()
    return data.map(item => Number(item.event_id))
  } catch (error){
    console.error(error);
    return null;
  }
}

function createCardComponent(eventData){
  const card = document.createElement('a')
  // add the link to the card card.setAttribute('href', 'the link')
  const eventCard = document.createElement('div')
  const eventImage = document.createElement('div')
  const eventNumberContainer = document.createElement('div')
  const eventNumberSpan = document.createElement('span')
  const numSvgContainer = document.createElement('div')
  const numSvg = document.createElement('svg')
  const svgPathNum = document.createElement('path')
  const image = document.createElement('img')
  const eventDetails = document.createElement('div')
  const eventTitle = document.createElement('h2')
  const eventDateTime = document.createElement('p')
  const eventLocation = document.createElement('p')
  const eventPriceContainer = document.createElement('div')
  const eventPrice = document.createElement('p')
  const priceSvg = document.createElement('svg')
  const pathPriceSvg = document.createElement('path')

  // set the number of the event eventNumberSpan.textContent('')
  // set event title
  eventTitle.textContent = eventData.title
  // set event date and time 
  eventDateTime.textContent = eventData.dateAndTime
  // set href of image
  image.setAttribute('src', eventData.image )
  eventNumberSpan.textContent = eventData.price

  eventCard.classList.add('event-card')
  eventImage.classList.add('event-image')
  eventNumberContainer.classList.add('event-number-container')
  eventNumberSpan.classList.add('event-number')
  numSvgContainer.classList.add('num-svg-container')
  eventTitle.classList.add('event-title')
  eventDateTime.classList.add('event-date-time')
  eventLocation.classList.add('event-location')
  eventPriceContainer.classList.add('event-price-container') 
  eventPrice.classList.add('event-price')

  const imgSvgAttributes = {
    width:"20",
    height:"36",
    viewBox:"0 0 20 36",
    fill:"none",
    xmlns:"http://www.w3.org/2000/svg"
  }
  const svgPathAttributes = {
    d:"M0 36H20L13.5149 6.05971C12.6246 2.49838 9.42473 0 5.75379 0H0V32Z",
    fill:"#FF5B49"
  }
  const priceSvgAttributes = {
    width:"1.5em",
    height:"1.5em",
    viewBox:"0 0 24 24",
    fill:"none",
    xmlns:"http://www.w3.org/2000/svg"
  }
  const pathPriceSvgAttributes = {
    'fill-rule':"evenodd",
    'clip-rule':"evenodd",
    d:"M9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711Z",
    fill:"currentColor"
  }
  for(let attribute in imgSvgAttributes)
    numSvg.setAttribute(attribute, imgSvgAttributes[attribute])
  for(let attribute in svgPathNum)
    svgPathNum.setAttribute(attribute, svgPathNum[attribute])
  for(let attr in priceSvgAttributes)
    priceSvg.setAttribute(attr, priceSvgAttributes[attr])
  for(let attr in pathPriceSvgAttributes)
    pathPriceSvg.setAttribute(attr, pathPriceSvgAttributes[attr])

  numSvg.appendChild(svgPathNum)
  numSvgContainer.appendChild(numSvg)
  eventNumberContainer.appendChild(numSvgContainer)
  eventNumberContainer.appendChild(eventNumberSpan)
  eventImage.appendChild(image)
  eventImage.appendChild(eventNumberContainer)
  priceSvg.appendChild(pathPriceSvg)
  eventPriceContainer.appendChild(eventPrice)
  eventPriceContainer.appendChild(priceSvg)
  eventDetails.appendChild(eventTitle) 
  eventDetails.appendChild(eventDateTime) 
  eventDetails.appendChild(eventLocation) 
  eventCard.appendChild(eventImage)
  eventCard.appendChild(eventDetails)
  eventCard.appendChild(eventPriceContainer)
  card.appendChild(eventCard)

  return card
}
 
function createCategoryCard(tag){
  const card = document.createElement('a');
  const categoryCard = document.createElement('div')
  const categoryImageContainer = document.createElement('div')
  const cardImage = document.createElement('img')
  const categoryName = document.createElement('p')
  categoryCard.classList.add('category-card')
  categoryImageContainer.classList.add('category-image-container')
  categoryName.classList.add('category-name')
  // fix the link card.setAttribute('href', '')
  cardImage.setAttribute('src', './img/header-bg-2.jpg')
  cardImage.setAttribute('alt', 'Card Image')
  categoryName.textContent = tag.tag_name 

  categoryImageContainer.appendChild(cardImage)
  categoryImageContainer.appendChild(categoryName)
  categoryCard.appendChild(categoryImageContainer)
  card.appendChild(categoryCard)

  return card
}

function createConcertCard(eventData){
  const card = document.createElement('a')
  const eventCard = document.createElement('div')
  const eventImage = document.createElement('div')
  const image = document.createElement('img')
  const eventDetails = document.createElement('div')
  const eventTitle = document.createElement('h2')
  const eventDateTime = document.createElement('p')
  const eventLocation = document.createElement('p')
  const eventPriceContainer = document.createElement('div')
  const eventPrice = document.createElement('p')

  eventCard.classList.add('event-card')
  eventCard.classList.add('specific-event')
  eventImage.classList.add('event-image')
  eventImage.classList.add('specific-event-image')
  eventDetails.classList.add('event-details')
  eventTitle.classList.add('event-title')
  eventDateTime.classList.add('event-date-time')
  eventLocation.classList.add('event-location')
  eventPriceContainer.classList.add('event-price-container')
  eventPriceContainer.classList.add('specific-event-price-container')
  eventPrice.classList.add('event-price')
  
  eventPrice.textContent = eventData.price
  eventTitle.textContent = eventData.title
  eventDateTime.textContent = eventData.dateAndTime
  // do something with location
  image.setAttribute('src', eventData.image)

  card.appendChild(eventCard)
  eventCard.appendChild(eventImage) 
  eventCard.appendChild(eventDetails) 
  eventCard.appendChild(eventPrice) 
  eventImage.appendChild(image)
  
  eventDetails.appendChild(eventTitle)
  eventDetails.appendChild(eventDateTime)
  eventDetails.appendChild(eventLocation)

  eventPriceContainer.appendChild(eventPrice)

  return card;
}
