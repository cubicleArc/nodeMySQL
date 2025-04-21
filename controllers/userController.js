const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); 
const db = require('../config/dbConnection');
const register = (req, res) => { //runs when user hits the /register route (runs after signUpValidation)
    const errors = validationResult(req); //collects and shows errors from req object

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        //select all columns from users in MySQL
        // db.escape() prevents SQL injection by converting it to a string
        req.body.email
      )});`,
      (err, result) => { //result is returned from db after running query 
        if(result && result.length){
            return res.status(409).send({ //conflict response 
                msg: 'This email already exists!',
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => { //encrypt password before saving it to db
                if(err){
                    return res.status(400).send({
                        msg: err
                    });
                }
                else{
                    db.query(
                        `INSERT INTO users (name, email, password) VALUES (${db.escape(req.body.name)}, ${db.escape(req.body.email)}, ${db.escape(hash)});`,
                        (err, result) => {
                            if(err){
                                return res.status(400).send({
                                    msg: err
                                })
                            }
                            return res.status(500).send({
                                msg: 'User registered successfully!'
                            })
                        }
                    );
                }
            });
        }
      }
    );
}

module.exports = {
    register
}