const ctable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "trilogy123",
  database: "employee_trackerDB"
});

class Functions {
  constructor() {}
  options() {
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
            inquirer
              .prompt({
                name: "name",
                type: "input",
                message: "add a department"
              })
              .then(function(res) {
                db.query(
                  "INSERT INTO department (name) VALUE (?)",
                  res.name,
                  function(err) {
                    if (err) throw err;
                    let user = new Functions();
                    user.options();
                  }
                );
              });

            break;

          case "add a role":
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
                db.query(
                  "INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)",
                  [res.title, res.salary, res.department_id],
                  function(err) {
                    if (err) throw err;
                    let user = new Functions();
                    user.options();
                  }
                );
              });

            break;

          case "add an employee":
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
                db.query(
                  "INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES (?, ?, ?, ?)",
                  [res.firstname, res.lastname, res.role_id, res.manager_id],
                  err => {
                    if (err) throw err;
                    let user = new Functions();
                    user.options();
                  }
                );
              });

            break;

          case "view departments":
            db.query("SELECT * FROM department", (err, res) => {
              if (err) throw err;
              const table = ctable.getTable(res);
              console.log(table);
              let user = new Functions();
              user.options();
            });

            break;

          case "view roles":
            db.query("SELECT * FROM role", (err, res) => {
              if (err) throw err;
              const table = ctable.getTable(res);
              console.log(table);
              let user = new Functions();
              user.options();
            });

            break;

          case "view employees":
            db.query("SELECT * FROM employee", (err, res) => {
              if (err) throw err;
              const table = ctable.getTable(res);
              console.log(table);
              let user = new Functions();
              user.options();
            });

            break;

          case "update employees":
            inquirer
              .prompt([
                {
                  name: "id",
                  type: "input",
                  message: "Enter ID of Employee you want to update"
                },
                {
                  name: "firstname",
                  type: "input",
                  message: "Enter new first name"
                },
                {
                  name: "lastname",
                  type: "input",
                  message: "Enter new last name"
                },
                {
                  name: "role_id",
                  type: "input",
                  message: "Enter new role ID"
                },
                {
                  name: "manager_id",
                  type: "input",
                  message: "Enter new manager ID"
                }
              ])
              .then(function(res) {
                db.query(
                  "UPDATE employee SET firstname = ?, lastname = ?, role_id = ?, manager_id = ? WHERE id = ?",
                  [
                    res.firstname,
                    res.lastname,
                    res.role_id,
                    res.manager_id,
                    res.id
                  ],
                  err => {
                    if (err) throw err;
                    let user = new Functions();
                    user.options();
                  }
                );
              });

            break;

          case "update roles":
            inquirer
              .prompt([
                {
                  name: "id",
                  type: "input",
                  message: "Enter ID of role you want to update"
                },
                {
                  name: "title",
                  type: "input",
                  message: "Enter new role"
                },
                {
                  name: "salary",
                  type: "input",
                  message: "Enter new salary"
                },
                {
                  name: "department_id",
                  type: "input",
                  message: "Enter new department ID"
                }
              ])
              .then(function(res) {
                db.query(
                  "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?",
                  [res.title, res.salary, res.department_id, res.id],
                  err => {
                    if (err) throw err;
                    let user = new Functions();
                    user.options();
                  }
                );
              });

            break;
          case "exit":
            process.exit();
            break;
        }
      });
  }
}

module.exports = new Functions();
