DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)  
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(30),
    lastname VARCHAR(30),
    role_id INT,
    manager_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES role (id)
);

INSERT INTO department (name) VALUES ("Management");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Finance");

INSERT INTO role (title, salary, department_id) VALUES ("Chief Executive Officer", 1000000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Operations Officer", 900000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Financial Officer", 800000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Manager", 150000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Engineer", 70000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Salesman", 80000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Salesman", 60000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Lawyer", 120000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 70000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Manager of Finance", 90000, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 750000, 5);

INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Abdiwahab", "Ahmed", 1, NULL);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Justin", "Trudeau", 2, 1);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Angela", "Merkel", 3, 2);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Emmanuel", "Macron", 4, 1);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Xi", "Jinping", 5, 4);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Tayyip", "Erdogan", 6, 5);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Vladimir", "Putin", 7, 2);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Donald", "Trump", 8, 7);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Shinzo", "Abe", 9, 1);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Boris", "Johnson", 10, 9);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Narendra", "Modi", 11, 3);
INSERT INTO employee (firstname, lastname, role_id, manager_id) VALUES ("Mohammmad", "Salman", 12, 11);




