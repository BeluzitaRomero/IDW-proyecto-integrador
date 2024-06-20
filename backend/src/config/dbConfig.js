const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "sql10.freemysqlhosting.net",
  user: "sql10710303",
  password: "ZgKr6Xbh9a",
  database: "sql10710303",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
