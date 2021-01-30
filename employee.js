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
                    roleAdd;
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

// function updateRating(list) {

//     inquirer.prompt([{
//         name: "nominee",
//         type: "list",
//         message: "Which show do you want to change the rating for",
//         choices: list
//     }, {
//         name: "rating",
//         message: "Enter the new rating out of 10 (decimals up to two places are accepted)"
//     }]).then(function (answers) {
//         connection.query("UPDATE nominees SET ? WHERE?", [{
//             rating: parseFloat(answers.rating)
//         }, {
//             show_name: answers.nominee
//         }],
//             function (err, res) {
//                 console.log("Here is an updated list of the nominees:")
//                 review()

//             }
//         )
//     })

// SELECT nutrition.id, ingredients.foodname FROM ingredients INNER JOIN nutrition ON nutrition.foodname = ingredients.foodname

// Add Employee
function employeeAdd() {
    connection.query("SELECT title, id FROM role", function (err, res) {
        var titleRole = [];
        // var roleId = [];
        for (var i = 0; i < res.length; i++) {
            // var temp = {roleName: res[i].title, idNum: res[i].id}
            titleRole.push(res[i].title);
            // roleId.push(temp);
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
            choices: titleRole,
        }, {
            // name: "manager",
            // message: "Who is the employee's manager?\n"

        }]).then(function (answers) {
            console.log(answers.role);
            connection.query("INSERT INTO employee SET ?", {
                first_name: answers.firstName,
                last_name: answers.lastName,
                role_id: answers.titleRole,
                // manager_id: answers.manager
            })
            employeeTable();
        })

    }

    )
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
manageEmployees();