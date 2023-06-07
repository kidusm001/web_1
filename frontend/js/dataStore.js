let dataStore = (function() {
  let events = null;
  let tags = null;

  function initEvents() {
    if (events === null) {
      return fetch('http://0.0.0.0:8000/events/get_all.php')
        .then(response => response.json())
        .then(data => {
          events = data.map(event => {
             const { event_id, merchant_id, title, description, available_tickets, price, date_and_time, image } = event;
             return new Event(event_id, merchant_id, title, description, available_tickets, price, date_and_time, image);
          });
          return events;
        })
        .catch(error => {
          console.error('Error fetching data [events]:', error);
          return null;
        });
    } else {
      return Promise.resolve(events);
    }
  }

  function initTags(){
    if (tags === null) {
      return fetch('http://0.0.0.0:8000/tags/get_all_tags.php')
        .then(response => response.json())
        .then(data => {
          tags = data.map(tag => {
           const {tag_id, tag_name} = tag;
           return new Tag(tag_id, tag_name);
          });
          return tags;
        }).
        catch(error => {
          console.error('Error fetching data [tags] : ', error)
          return null;
        })
    }else{
      return Promise.resolve(tags);
    }
  }

  function reload() {
    events = null;
    tags = null;
    initEvents();
    initTags();
  }

  async function set_filtered(ids = []){
    console.log('set filtered called')
    let events = await initEvents()
    filtered_events = []
    ids.forEach(id => {
      filtered_events.push(events.find(e => e.eventId === id))
    })
    localStorage.setItem('filtered_events', JSON.stringify(filtered_events))
    return filtered_events
  }

  async function get_filtered(){
    return filtered_events = JSON.parse(localStorage.getItem('filtered_events')) || [];
  }

  return {
    initEvents: initEvents,
    initTags: initTags,
    reload: reload,
    events: function() {
      return initEvents();
    },
    tags: function() {
      return initTags();
    },
    set_filtered: set_filtered,
    get_filtered: get_filtered
  };
})();

dataStore.initEvents();
dataStore.initTags();
