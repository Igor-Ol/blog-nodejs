var mysql = require("mysql");

var conectebanco = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
    database: "blog"
});

module.exports = conectebanco;