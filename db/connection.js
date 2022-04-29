const mysql = require("mysql2");

const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "password",
    database: "movies_db",
  },
  console.log("connected to db")
);

module.exports = connection;
