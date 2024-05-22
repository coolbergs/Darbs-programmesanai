const express = require('express');
const bodyParser = require('body-parser');
const { getEvents, addEvent } = require('./database');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/events', async (req, res) => {
    const events = await getEvents();
    res.json(events);
});

app.post('/api/events', async (req, res) => {
    const event = req.body;
    await addEvent(event);
    res.json({ message: 'Event added!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
