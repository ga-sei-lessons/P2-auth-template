const express = require('express');
const router = express.Router();
const db = require('../models');
// import middleware

// register GET route
router.get('/register', (req, res) => {
  res.render('auth/register');
});
// register POST route

// login GET route
router.get('/login', (req, res) =>{
  res.render('auth/login');
});
// login POST route


//export router
module.exports = router;