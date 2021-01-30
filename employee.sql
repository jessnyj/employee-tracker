CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10, 2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES role (id)

);

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"), ("Legal"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Sales Manager", 160000, 1), ("Accountant", 120000, 2), ("Account Manager", 160000, 2), ("Lawyer", 125000, 3), ("Electrical Engineer", 160000, 4), ("Lead Engineer", 180000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 2), ("Danielle", "Matthews", 2, null), ("Nick", "Jones", 3, 4), ("Robert", "White", 4, null), ("Jorge", "Ramirez", 5, null), ("Natalie", "Martinez", 4, 5), ("Jessny", "Joseph", 5, null);