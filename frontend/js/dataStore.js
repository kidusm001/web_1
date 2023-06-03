// let dataStore = (function() {
//   var events = null;
//
//   function init() {
//     if (events === null) {
//       fetch('http://0.0.0.0:8000/events/get_all.php')
//         .then(response => response.json())
//         .then(data => {
//           events = data.map(event => {
//              const { event_id, merchant_id, title, description, available_tickets, price, date_and_time, image } = event;
//               return new Event(event_id, merchant_id, title, description, available_tickets, price, date_and_time, image);
//           });
//           console.log(events);
//         })
//         .catch(error => {
//          console.error('Error fetching data:', error);
//         });
//     }
//   }
//
//   function reload() {
//     events = null;
//     init();
//   }
//
//   return {
//     init: init,
//     reload: reload,
//     events: function() {
//       return events;
//     }
//   };
// })();
//
// dataStore.init();

let dataStore = (function() {
  var events = null;

  function init() {
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
          console.error('Error fetching data:', error);
          return null;
        });
    } else {
      return Promise.resolve(events);
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
      return init();
    }
  };
})();

dataStore.init();
