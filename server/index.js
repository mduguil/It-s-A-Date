require('dotenv/config');
const fetch = require('node-fetch');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const JSONParser = express.json();
const pg = require('pg');
const path = require('path');

const app = express();

app.use(staticMiddleware);
app.use(JSONParser);
app.use(errorMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/contacts', (req, res, next) => {
  const contacts = `
    select "name",
           "phoneNumber",
           "contactId"
      from "contacts"
  `;

  db.query(contacts)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/contacts', (req, res, next) => {
  const { name, number } = req.body;
  const phoneNumberInt = parseInt(number, 10);
  if (!name || !phoneNumberInt) {
    throw new ClientError(400, 'number and name are required fields');
  }
  if (isNaN(phoneNumberInt) || phoneNumberInt.toString().length !== 10) {
    throw new ClientError(400, 'number must be a 10 digit number');
  }
  const contacts = `
    insert into "contacts" ("name", "phoneNumber", "userId")
         values ($1, $2, $3)
      returning *
  `;
  const params = [name, phoneNumberInt, 1];

  db.query(contacts, params)
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/dates', (req, res, next) => {
  const dates = `
    select "location",
           "day",
           "time",
           "activity",
           "notes"
      from "dates"
  `;

  db.query(dates)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/dates', (req, res, next) => {
  const { location, day, time, activity, notes } = req.body;
  if (!location || !day || !time || !activity) {
    throw new ClientError(400, 'Location, day, time, and activity are required fields');
  }
  const dates = `
    insert into "dates" ("location", "day", "time", "activity", "notes", "userId")
    values ($1, $2, $3, $4, $5, $6)
    returning *
  `;
  const params = [location, day, time, activity, notes, 1];
  db.query(dates, params)
    .then(result => {
      const [date] = result.rows;
      res.status(201).json(date);
    })
    .catch(err => next(err));
});

app.get('/api/places', function (req, res, next) {
  const { query } = req;
  if (!query) {
    throw new ClientError(400, 'Location is a required field');
  }

  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query.searchTerm}&key=${process.env.GOOGLE_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(placesData => {
      res.status(201).json(placesData);
    })
    .catch(err => next(err));
});

app.use((req, res) => {
  res.sendFile('/index.html', {
    root: path.join(__dirname, 'public')
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
