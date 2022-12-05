const express = require('express');

const validator = require('./validator');
const micromortModel = require('./micromortModel');

const app = express();

app.use(express.json());
app.use(validator);

app.post('/', (req, res) => {
  const commuterID = req.body.commuterID
  const micromorts = micromortModel(req.body);

  res.status(200).send({
    commuterID,
    micromorts: micromorts ? micromorts : 'Unable to calculate micromorts based on sent data.'
  });
});

module.exports = app;