const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        date TEXT,
        time TEXT,
        location TEXT,
        description TEXT
    )`);
});

const getEvents = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM events', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const addEvent = (event) => {
    return new Promise((resolve, reject) => {
        const { title, date, time, location, description } = event;
        db.run(`INSERT INTO events (title, date, time, location, description) VALUES (?, ?, ?, ?, ?)`,
            [title, date, time, location, description], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
};

module.exports = { getEvents, addEvent };