document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const event = {
        title,
        date,
        time,
        location,
        description
    };

    fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => response.json())
    .then(data => {
        alert('Event added!');
        loadEvents();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function loadEvents() {
    fetch('/api/events')
    .then(response => response.json())
    .then(events => {
        const eventsDiv = document.getElementById('events');
        eventsDiv.innerHTML = '';
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.innerHTML = `
                <h2>${event.title}</h2>
                <p>${event.date} ${event.time}</p>
                <p>${event.location}</p>
                <p>${event.description}</p>
            `;
            eventsDiv.appendChild(eventDiv);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
});
