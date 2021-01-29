DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
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
VALUES ("Beauty"), ("Food"), ("Technology");

INSERT INTO role (salary, department_id)
VALUES (15, 100), (10, 45), (17, 120);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rosalina", "Juarez", 23, 1), ("Trey", "Jackson", 70, 40), ("Nick", "Jones", 77, 5);