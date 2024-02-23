const express = require('express');
const { registerUser, authuser } = require('../controllers/userController');
const router = express.Router();
  
//router.route('/').post(registerUser)
router.post('/' , registerUser )
router.post('/login' , authuser )



module.exports = router; // Fix: Export the router