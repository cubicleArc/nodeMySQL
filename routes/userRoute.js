const express = require('express');
const router = express.Router(); //mini app router
const { signUpValidation } = require('../helpers/validation');
const userController = require('../controllers/userController');

router.post('/register', signUpValidation, userController.register); //activates when client makes a post request

module.exports = router;