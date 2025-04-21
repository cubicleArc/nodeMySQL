const{ DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env; // process (a global object) holds system environment variables

let mysql = require('mysql');
let db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD, 
    database: DB_NAME
})

db.connect((error) => {
    if(error) throw error;
    console.log(DB_NAME + ' database connected successfully');
});

module.exports = db;
