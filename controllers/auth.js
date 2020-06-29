const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware
const flash = require('flash');

// register GET route
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// register POST route
router.post('/register', (req, res) =>{
  db.user.findOrCreate({
    where: {
      email: req.body.email
    }, 
    defualts: {
      name: req.body.name,
      password: req.body.password
    }
  }).then( ([user, created]) => {
    // if user was created
    if(created){
      // authenticate user and start authorization process
      console.log(`user created! 🎉`);
      res.redirect('/');
    } else {
      console.log('user email already exists 🛑');
      req.flash('error', 'Error: email already exists for user');
      res.redirect('/auth/register');
    }
    // else if use already exists
      // send error that user already exsists
      // sned redirect back to register GET route
  }).catch( error => {
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥\n', error, '\n', error.message);
    req.flash(' error', ` internal server error: \n${error.message}`);
    res.redirect('/auth/register');
  })
});

// login GET route
router.get('/login', (req, res) =>{
  res.render('auth/login');
});
// login POST route


//export router
module.exports = router;