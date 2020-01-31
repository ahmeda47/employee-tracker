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
        case "add a department":
          addDepartment();
          break;

        case "add a role":
          addRole();
          break;

        case "add an employee":
          addEmployee();
          break;

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

function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "add a department"
    })
    .then(function(res) {
      connection.query(
        "INSERT INTO department (name) VALUES ?",
        res.name,
        function(err) {
          if (err) throw err;
          options();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "add a role"
      },
      {
        name: "salary",
        type: "input",
        message: "add a salary"
      },
      {
        name: "department_id",
        type: "input",
        message: "Enter a department id"
      }
    ])
    .then(function(res) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)",
        [res.title, res.salary, res.department_id],
        function(err) {
          if (err) throw err;
          options();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter first name"
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter last name"
      },
      {
        name: "role_id",
        type: "input",
        message: "Enter role ID"
      },
      {
        name: "manager_id",
        type: "input",
        message: "Enter manager ID"
      }
    ])
    .then(function(res) {
      connection.query(
        "INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [res.firstname, res.lastname, res.role_id, res.manager_id],
        err => {
          if (err) throw err;
          options();
        }
      );
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
