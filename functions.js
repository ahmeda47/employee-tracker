const ctable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql");

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "trilogy123",
  database: "employee_trackerDB"
});

class Functions {
  constructor() {}
  addDepartment() {
    inquirer
      .prompt({
        name: "name",
        type: "input",
        message: "add a department"
      })
      .then(function(res) {
        db.query("INSERT INTO department (name) VALUES ?", res.name, function(
          err
        ) {
          if (err) throw err;
          options();
        });
      });
  }

  addRole() {
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
        conn.query(
          "INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)",
          [res.title, res.salary, res.department_id],
          function(err) {
            if (err) throw err;
            options();
          }
        );
      });
  }

  addEmployee() {
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
        conn.query(
          "INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [res.firstname, res.lastname, res.role_id, res.manager_id],
          err => {
            if (err) throw err;
            options();
          }
        );
      });
  }

  viewRoles() {
    conn.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      const table = ctable.getTable(res);
      console.log(table);
      options();
    });
  }

  viewDepartments() {
    conn.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      const table = ctable.getTable(res);
      console.log(table);
      options();
    });
  }

  viewEmployees() {
    conn.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      const table = ctable.getTable(res);
      console.log(table);
      options();
    });
  }

  updateEmployees() {
    inquirer
      .prompt([
        {
          name: "firstname",
          type: "input",
          message: "Enter first name of employee you want to update"
        },
        {
          name: "lastname",
          type: "input",
          message: "Enter last name of employee you want to update"
        },
        {
          name: "role_id",
          type: "input",
          message: "Enter ID of role you want to update"
        },
        {
          name: "manager_id",
          type: "input",
          message: "Enter manager ID of you want to update "
        }
      ])
      .then(function(res) {
        conn.query(
          "UPDATE employee SET firstname = ?, lastname = ?, role_id = ?, manager_id = ?",
          [res.firstname, res.lastname, res.role_id, res.manager_id],
          err => {
            if (err) throw err;
            options();
          }
        );
      });
  }

  updateRoles() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Enter title of role you want to update"
        },
        {
          name: "salary",
          type: "input",
          message: "Enter salary you want to update"
        },
        {
          name: "department_id",
          type: "input",
          message: "Enter ID of department you want to update"
        }
      ])
      .then(function(res) {
        connection.query(
          "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?",
          [res.title, res.salary, res.department_id],
          err => {
            if (err) throw err;
            options();
          }
        );
      });
  }
}

module.exports = Functions;
