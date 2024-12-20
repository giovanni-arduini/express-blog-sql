const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "andnow71!!",
  database: "blog_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
