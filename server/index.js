require('dotenv/config');
const fetch = require('node-fetch');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const JSONParser = express.json();
const pg = require('pg');

const app = express();

app.use(staticMiddleware);
app.use(JSONParser);
app.use(errorMiddleware);

const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/its-a-date',
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/contacts', (req, res, next) => {
  const contacts = `
    select "name",
           "phoneNumber"
      from "contacts"
  `;

  db.query(contacts)
    .then(result => {
      res.status(200).json(result.rows);
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

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
