require("dotenv").config(); //config() reads .env
require("./config/dbConnection");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoute'); 
const app = express();

app.use(express.json()); //parse JSON data sent in http requests
app.use(bodyParser.json()); //same as above (optional)
app.use(bodyParser.urlencoded({ extended: true })); //parse HTML form data
app.use(cors()); //allows server to accept requests from different domains
app.use('/api', userRouter); //router as a middleware
app.use((err, req, res, next) => { //custom error handling middleware
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';
    res.status(err.statusCode).json({
        message: err.message
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})