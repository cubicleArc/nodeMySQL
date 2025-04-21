const { check } = require('express-validator'); //used to create validation rules for req.body

const signUpValidation = [ //an array of middleware
    check('name', 'Name is required').trim().not().isEmpty(), //the field must not be empty
    check('email', 'Please enter a valid mail').isEmail().normalizeEmail({
        gmail_remove_dots: true, //avoids duplicate signups with same Gmail
    }),
    check('password', 'Password is required').isLength({ min: 6 }),
];

module.exports = {signUpValidation};
