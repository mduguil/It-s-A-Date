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
           "invites",
           "notes",
           "dateId"
      from "dates"
  `;

  db.query(dates)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/dates/:dateId', (req, res, next) => {
  const dateId = parseInt(req.params.dateId, 10);
  if (!Number.isInteger(dateId) || dateId < 1) {
    throw new ClientError(400, 'ID must be a positive integer');
  }

  const dates = `
    select "location",
           "day",
           "time",
           "activity",
           "invites",
           "notes",
           "dateId"
      from "dates"
      where "dateId" = $1
  `;

  const params = [dateId];

  db.query(dates, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/dates', (req, res, next) => {
  const { location, day, time, activity, invites, notes } = req.body;
  if (!location || !day || !time || !activity) {
    throw new ClientError(400, 'Location, day, time, and activity are required fields');
  }
  const dates = `
    insert into "dates" ("location", "day", "time", "activity", "invites", "notes", "userId")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
  `;
  const params = [location, day, time, activity, invites, notes, 1];
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

app.delete('/api/dates/:id', (req, res, next) => {
  const dateId = parseInt(req.params.id, 10);
  if (!Number.isInteger(dateId) || dateId < 1) {
    throw new ClientError(400, 'ID must be a positive integer');
  }

  const dates = `
    delete from "dates"
    where "dateId" = $1
    returning *
  `;

  const params = [dateId];
  db.query(dates, params)
    .then(result => {
      const [date] = result.rows;
      res.json(date);
    })
    .catch(err => next(err));
});

app.put('/api/dates/:id', (req, res, next) => {
  const { location, day, time, activity, invites, notes } = req.body.input;
  const dateId = parseInt(req.params.id, 10);
  if (!Number.isInteger(dateId) || dateId < 1) {
    throw new ClientError(400, 'ID must be a positive integer');
  }
  if (!location || !day || !time || !activity || !invites) {
    throw new ClientError(400, 'location, day, time, activity & invites are required');
  }

  const dates = `
    update "dates"
       set "location" = $1,
           "day" = $2,
           "time" = $3,
           "activity" = $4,
           "invites" = $5,
           "notes" = $6
     where "dateId" = $7
  `;

  const params = [location, day, time, activity, invites, notes, dateId];

  db.query(dates, params)
    .then(result => {
      const date = result.rows[0];
      if (!date) {
        throw new ClientError(404, `Cannot find date with "dateId" ${dateId}`);
      } else {
        res.status(200).json(date);
      }
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
