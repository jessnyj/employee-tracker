var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var colors = require('colors');

// Connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Username
    user: "root",

    // Password
    password: "password",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// Initial Prompt
function manageEmployees() {
    inquirer
        .prompt({
            name: "starterQs",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "View all Roles",
                "View Departments",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Role"
            ]
        })
        .then(function (answer) {
            switch (answer.starterQs) {
                case "View all Employees":
                    employeeTable();
                    break;
                case "View all Roles":
                    roleTable();
                    break;
                case "View Departments":
                    departmentTable();
                    break;
                case "Add Employee":
                    employeeAdd();
                    break;
                case "Add Department":
                    departmentAdd();
                    break;
                case "Add Role":
                    roleAdd();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
            }
        })
}

// Table Diplaying All Employees
function employeeTable() {
    connection.query("SELECT * FROM employee", function (err, res) {

        var table = new Table({
            head: ["ID", "First Name", "Last Name", "Role ID", "Manager ID"],
            colWidths: [10, 15, 15, 10, 15]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].manager_id],
            );
        }
        console.log(table.toString());
        restart()
    });
}

// Table Displaying All Roles
function roleTable() {
    connection.query("SELECT * FROM role", function (err, res) {

        var table = new Table({
            head: ["ID", "Title", "Salary", "Department Id"],
            colWidths: [10, 15, 15, 15]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].title, res[i].salary, res[i].department_id],
            );
        }
        console.log(table.toString());
        restart()
    });
}

// Table Displaying All Departments
function departmentTable() {
    connection.query("SELECT * FROM department", function (err, res) {

        var table = new Table({
            head: ["ID", "Name"],
            colWidths: [10, 15]
        });

        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].name],
            );
        }
        console.log(table.toString());
        restart()
    });
}

// Add Employee
function employeeAdd() {
    connection.query("SELECT role.title, role.id, employee.role_id FROM role INNER JOIN employee ON role.id = employee.role_id", function (err, res) {
        var roleId = [];
        for (var i = 0; i < res.length; i++) {
            var temp = { name: res[i].title, value: res[i].id }
            roleId.push(temp);
        }
        connection.query("SELECT role.id, employee.manager_id, employee.first_name, employee.last_name FROM role INNER JOIN employee ON role.id = employee.manager_id", function (err, res) {
            var managerId = [];
            for (var i = 0; i < res.length; i++) {
                var data = { name: res[i].first_name, value: res[i].id }
                managerId.push(data);

            }
        inquirer.prompt([{
            name: "firstName",
            message: "\nEnter the Employees first name\n"
        }, {
            name: "lastName",
            message: "Enter the Employees last name\n"
        }, {
            type: 'list',
            name: "role",
            message: "What is the employee's role?\n",
            choices: roleId,
        }, {
            type: 'list',
            name: "manager",
            message: "Who is the employee's manager?\n",
            choices: managerId,
        }]).then(function (answers) {
            console.log(answers.role);
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager,
            })
            employeeTable();
        })
    })
    })

}
// Start Over
function restart() {
    inquirer.prompt([{
        type: "list",
        name: "continue",
        choices: ["Yes", "No"],
        message: "Would you like to do more?\n"
    }]).then(function (answers) {
        if (answers.continue === "Yes") {
            manageEmployees();
        } else {
            exit()
        }

    });
}

function exit() {
    console.log("Thank you for using employee tracker!")
    connection.end()
}

manageEmployees();