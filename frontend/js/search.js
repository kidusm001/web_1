const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', async function() {
  const locationInput = document.querySelector('.location-input input');
  const locationValue = locationInput.value;
  const dateInput = document.querySelector('.Date-input input');
  const dateValue = dateInput.value;
  const searchTextInput = document.querySelector('#search-text');
  const searchValue = searchTextInput.value;
  const allTags = await dataStore.tags()
  const allEvents = await dataStore.events()
  let filtered_events = []

  console.log('Location:', locationValue);
  console.log('Date:', dateValue);
  console.log('Search Text:', searchValue);


  let tags = searchValue.split(',') 
  tags.forEach((tag, idx) => tags[idx] = tag.trim().toLowerCase())
  tags = tags.filter(tag => tag !== '')
  tags = allTags.filter(obj => tags.includes(obj.tag_name.toLowerCase()));

  for(const tag of tags){
    let eventsArray = await getEventsByTag(tag.tag_id)
    console.log(`filtered by tags: ${eventsArray}`)
    filtered_events.push(...eventsArray) 
  }

  // tags by date 
  let events = dateValue === '' ? [] : allEvents.filter(event => event.dateAndTime.includes(dateValue))
  events = events.map(event => event.eventId)
  console.log(`filtered by date: ${events}`)
  filtered_events.push(...events)

  // tags by Title
  events = locationValue === '' ? [] : allEvents.filter(event => {
    return
      event.title.toLowerCase().includes(locationValue.toLowerCase()) && locationValue
      || locationValue.toLowerCase().includes(event.title.toLowerCase())
      || levenshtein(event.title.toLowerCase(), locationValue.toLowerCase()) < 2.7
  })
  events = events.map(event => event.eventId)
  console.log(`filtered by title ${events}`)
  filtered_events.push(...events)

  const frequency = filtered_events.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  let result = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => parseInt(key));

  if(localStorage.getItem('user_type') === 'merchant'){
    result = result.filter(item => item.merchantId === localStorage.getItem('user_id'))
  }

  await dataStore.set_filtered(result)
  let currentURL = window.location.href
  let newURL = currentURL.substring(0, currentURL.lastIndexOf("/") + 1) + "event_list.html"; 
  window.location.href = newURL;
});
