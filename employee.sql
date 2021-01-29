-- DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,4) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 100), ("Account Manager", 160000, 45), ("Accountant", 125000, 120), ("Account Manager", 160000, 16);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 23, null), ("Danielle", "Matthews", 70, 45), ("Nick", "Jones", 77, null), ("Natalie", "Martinez", 10, 16);