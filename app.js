const inquirer = require("inquirer");
const mysql = require("mysql");
const ctable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "trilogy123",
  database: "employee_trackerDB"
});

connection.connect(() => {
  console.log(`connected to database ${connection.threadId}`);
  options();
});

function options() {
  inquirer
    .prompt({
      name: "options",
      type: "list",
      choices: [
        "add a department",
        "add a role",
        "add an employee",
        "view departments",
        "view roles",
        "view employees",
        "update employees",
        "update roles"
      ]
    })
    .then(ans => {
      switch (ans.options) {
        case "view departments":
          viewDepartments();
          break;

        case "view roles":
          viewRoles();
          break;

        case "view employees":
          viewEmployees();
          break;
      }
    });
}

function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    const table = ctable.getTable(res);
    console.log(table);
    options();
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    const table = ctable.getTable(res);
    console.log(table);
    options();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    const table = ctable.getTable(res);
    console.log(table);
    options();
  });
}
