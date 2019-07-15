const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require( 'express-validator');

const database = require('./helpers/Database');

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


app.get('/api/animal', (req, res) => {

  database.query(`SELECT * FROM animals`)
  .then(result => {
    return res.json(result)
  })
  .catch(err => res.status(500).json({err}))
})

app.get('/api/animal/:id', (req, res) => {
  const { id } = req.params;

  database.query(`SELECT * FROM animals WHERE id=?`, [id])
  .then(result => {

    res.json(result[0])
  })
  .catch(err => res.status(500).json({err}))
})

app.post('/api/animal', [
  check('name').trim().isLength({ min: 1 }),
], (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, age, race, colorId } = req.body;

  database.query(`
    INSERT INTO animals
    SET name = ?, age = ?, race = ?, color_id = ?`, [
      name,
      age,
      race,
      colorId
  ])
  .then(result => {
    return res.json(result)
  })
  .catch(err => res.status(500).json({err}))
})

app.put('/api/animal/:id', [
  check('name').trim().isLength({ min: 1 }),
], (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { name, age, race, colorId } = req.body;

  database.query(`
    UPDATE animals
    SET name = ?, age = ?, race = ?, color_id = ? WHERE id = ?`, [
      name,
      age,
      race,
      colorId,
      id
  ])
  .then(result => {
    return res.json(result)
  })
  .catch(err => res.status(500).json({err}))
})

app.delete('/api/animal/:id', (req, res) => {
  const { id } = req.params;

  database.query(`
    DELETE FROM animals
    WHERE id = ?`, [id])
  .then(result => {
    return res.json(result)
  })
  .catch(err => res.status(500).json({err}))
})

app.listen(port);
console.log(`Express runing on port ${port}`)