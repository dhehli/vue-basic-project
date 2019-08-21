const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require( 'express-validator');
const cors = require('cors')
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const database = require('./helpers/Database');
const USERPERMISSION = require('./helpers/Userpermission')

const publicRoutes = require('./routes/public/index')
const memberRoutes = require('./routes/member/index')
const adminRoutes = require('./routes/admin/index')
const superAdminRoutes = require('./routes/superadmin/index')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
  origin: process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:8080'
}))

app.use(cookieParser()); // read cookies (needed for auth
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// serve vue index.html for production
app.use(express.static('dist'));

// route middleware to make sure a user is logged in
const isMember = (req, res, next) => {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

// route middleware to make sure a user has admin right
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.userpermission_id === USERPERMISSION.admin || req.user.userpermission_id === USERPERMISSION.superadmin))
    return next();
  res.redirect('/');
}

const isSuperAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.userpermission_id === USERPERMISSION.superadmin)
    return next();
  res.redirect('/');
}

app.use(publicRoutes);
app.use(
  '/member', 
  passport.authenticate('jwt', {session: false}), 
  isMember, 
  memberRoutes
)
app.use(
  '/admin', 
  passport.authenticate('jwt', {session: false}), 
  isAdmin, 
  adminRoutes
)
app.use(
  '/superadmin', 
  passport.authenticate('jwt', {session: false}), 
  isSuperAdmin, 
  superAdminRoutes
);

// Redirect all unmatched routes to the index.html and use them with vue router 
app.all('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});























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

  const { name, age, race } = req.body;

  database.query(`
    INSERT INTO animals
    SET name = ?, age = ?, race = ?`, [
      name,
      age,
      race
  ])
  .then(() => {
    return res.json({
      state: "success"
    })
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

  const { name, age, race } = req.body;

  database.query(`
    UPDATE animals
    SET name = ?, age = ?, race = ? WHERE id = ?`, [
      name,
      age,
      race,
      id
  ])
  .then(() => {
    return res.json({
      state: "success"
    })
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