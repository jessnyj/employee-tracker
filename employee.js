var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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

function employeeTable() {
    connection.query("SELECT * FROM employee", function (err, res) {

        var table = new Table({
            //You can name these table heads chicken if you'd like. They are simply the headers for a table we're putting our data in
            head: ["ID", "First Name", "Last Name", "Role ID", "Manager ID"],
            //These are just the width of the columns. Only mess with these if you want to change the cosmetics of our response
            colWidths: [10, 10, 10, 10, 10]
        });

        // table is an Array, so you can `push`, `unshift`, `splice`
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].firstw_name, res[i].num_seasons, res[i].genre, res[i].rating],
            );
        }
        console.log(table.toString());
        restart()
    });
}


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
        })
    }


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