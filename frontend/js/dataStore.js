let dataStore = (function() {
  var events = null;

  function init() {
    if (events === null) {
      let events = [];
      let allEventsJsonRepsonse
      fetch('../backend/php/events/get_all.php')
        .then(response => response.json())
        .then(data => {
          allEventsJsonRepsonse = data
          console.log(data);
        })
        .catch(error => {
         console.error('Error fetching data:', error);
        });
      events = allEventsJsonResponse.map(event => {
          const { event_id, merchant_id, title, description, available_tickets, price, date_and_time, image } = event;
          return new Event(event_id, merchant_id, title, description, available_tickets, price, date_and_time, image);
      });
    }
  }

  function reload() {
    events = null;
    init();
  }

  return {
    init: init,
    reload: reload,
    events: function() {
      return events;
    }
  };
})();

dataStore.init();
