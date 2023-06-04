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
          console.log(events);
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
          console.log(tags)
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

  return {
    initEvents: initEvents,
    initTags: initTags,
    reload: reload,
    events: function() {
      return initEvents();
    },
    tags: function() {
      return initTags();
    }
  };
})();

dataStore.initEvents();
dataStore.initTags();

