var mysql = require("mysql");
var inquirer = require("inquirer");
const { start } = require("repl");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employeeDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
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
                employeeView();
                break;
            case "View all Roles":
                roleView();
                break;
            case "View Departments":
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
        });
    }
