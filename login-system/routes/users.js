const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// User model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
 const { name, email, password, password2 } = req.body;
 let errors = [];

 // Check for blank required fields
 if(!name || !email || !password || !password2) {
   errors.push({ msg: 'All fields must be filled' });
 }

 // Check if passwords match
 if(password !== password2) {
  errors.push({ msg: 'Passwords do not match' });
 }

 // Check password length
 if(password.length < 6) {
  errors.push({ msg: 'Password should be at least six characters' })
 }
  if(errors.length > 0) {
   res.render('register', {
   errors,
   name,
   email,
   password,
   password2
   });
  } else {
    // Validation Pass
    User.findOne({ email: email })
    .then(user => {
      if(user) {
        //User exists
        errors.push({msg: 'Email is already registered'});
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
          });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
      }
    });
  }
});
module.exports = router;