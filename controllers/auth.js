const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware
const flash = require('flash');
//TODO: update require below to passport conig file
const passport = require('../config/ppConfig');

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
router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(error, user, info){
    // if no user authenticated
    if(!user) {
      req.flash('error', 'Invalid username or password');
      req.session.save( function(){
        return res.redirect('/auth/login');
      });
    }

    if (error) {
      return next(error);
    }

    req.login( function(user, error) {
      // if error, move to error
      if (error) next(error); 
      // if succes flash succuss message
      req.flash('suceess', 'You are validated and logged in.')
      // if success save session annd redirect
      req.sessions.save(function(){
        return res.redirect('/');
      });   
    });
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  successFlash: 'welcome to our app',
  failureFlash: 'Invalid username and/or password'
}));


//export router
module.exports = router;