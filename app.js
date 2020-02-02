const mysql = require("mysql");
const Functions = require("./functions");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "trilogy123",
  database: "employee_trackerDB"
});

connection.connect(() => {
  console.log(`connected to database ${connection.threadId}`);
  Functions.options();
});
