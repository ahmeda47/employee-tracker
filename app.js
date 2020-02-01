const inquirer = require("inquirer");
const mysql = require("mysql");
const Functions = require("./functions");
const myFunctions = new Functions();

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
        "update roles",
        "exit"
      ]
    })
    .then(ans => {
      switch (ans.options) {
        case "add a department":
          myFunctions.addDepartment();
          break;

        case "add a role":
          addRole();
          break;

        case "add an employee":
          addEmployee();
          break;

        case "view departments":
          myFunctions.viewDepartments();
          break;

        case "view roles":
          viewRoles();
          break;

        case "view employees":
          viewEmployees();
          break;

        case "update employees":
          updateEmployees();
          break;

        case "update roles":
          updateRoles();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}
