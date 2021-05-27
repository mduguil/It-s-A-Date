require('dotenv/config');
const fetch = require('node-fetch');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
app.get('/api/places', function (req, res, next) {
  const { query } = req;
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query.searchTerm}&key=${process.env.GOOGLE_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(userData => {
      res.json(userData);
    })
    .catch(err => next(err));

});
