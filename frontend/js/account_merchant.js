const createEventLi = document.getElementById('create-event');
    const allEventsLi = document.getElementById('all-events');
    const editEventsLi = document.getElementById('edit-events');

    // Get the content <div> elements
    const createEventContent = document.getElementById('create-event-content');
    const allEventsContent = document.getElementById('all-events-content');
    const editEventsContent = document.getElementById('edit-events-content');

    // Function to handle li click event
    function handleLiClick(liElement, contentElement) {
        // Remove active class from all <li> elements
        createEventLi.classList.remove('active');
        allEventsLi.classList.remove('active');
        editEventsLi.classList.remove('active');

        // Hide all content <div> elements
        createEventContent.style.display = 'none';
        allEventsContent.style.display = 'none';
        editEventsContent.style.display = 'none';

        // Add active class to the clicked <li> element
        liElement.classList.add('active');

        // Show the corresponding content
        contentElement.style.display = 'flex';
    }

    // Event listener for "Create Event" option
    createEventLi.addEventListener('click', () => {
        handleLiClick(createEventLi, createEventContent);
    });

    // Event listener for "All your events" option
    allEventsLi.addEventListener('click', () => {
        handleLiClick(allEventsLi, allEventsContent);
    });

    // Event listener for "Edit events" option
    editEventsLi.addEventListener('click', () => {
        handleLiClick(editEventsLi, editEventsContent);
    });