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

// Table diplaying All Employees
function employeeTable() {
    connection.query("SELECT * FROM employee", function (err, res) {

        var table = new Table({
            head: ["ID", "First Name", "Last Name", "Role ID", "Manager ID"],
            colWidths: [10, 10, 10, 10, 10]
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

// function roleTable() {
//     connection.query("SELECT * FROM employee", function (err, res) {

//         var table = new Table({
//             head: ["ID", "First Name", "Last Name", "Role ID", "Manager ID"],
//             colWidths: [10, 10, 10, 10, 10]
//         });

//         for (var i = 0; i < res.length; i++) {
//             table.push(
//                 [res[i].id, res[i].first_name, res[i].last_name, res[i].role_id, res[i].manager_id],
//             );
//         }
//         console.log(table.toString());
//         restart()
//     });
// }

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
        .then(function(answer) {
            switch (answer.starterQs) {
            case "View all Employees":
                employeeTable();
                break;
            case "View all Employees by Department":
                roleView();
                break;
            case "View all Employees by Manager":
                departmentView();
                break;
            case "Add Employee":
                employeeAdd();
                break;
            case "Add Department":
                departmentAdd();
                break;
            case "Add Role":
                roleAdd;
                break;
            case "Update Employee Role":
                updateRole();
                break;
            }
        })
    }

// Add Employee
    function add() {
        inquirer.prompt([{
            name: "firstName",
            message: "\nEnter the Employees first name\n"
        }, {
            name: "lastName",
            message: "Enter the Employees last name\n"
        }, {
            name: "role",
            message: "What is the employee's role?\n"
        }, {
            name: "manager",
            message: "Who is the employee's manager?\n"
    
        }]).then(function (answers) {
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.role,
                manager_id: answers.manager
            })
            employeeTable();
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