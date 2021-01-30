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
                "Update Employee Role",
                "Delete Role",
                "Delete Department"
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
                case "Delete Role":
                    deleteRole();
                    break;
                case "Delete Department":
                    deleteDepartment();
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
            colWidths: [10, 23, 15, 15]
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

// Add Departments
function departmentAdd() {
    inquirer.prompt([{
        name: "deptName",
        message: "\nPlease enter the name of the department you would like to add.\n"
    }]).then(function (answers) {
        connection.query("INSERT INTO department SET ?", {
            name: answers.deptName,
        })
        departmentTable();
    })

}

// Add Role
function roleAdd() {
    inquirer.prompt([{
        name: "roleTitle",
        message: "\nPlease enter the name of the new role you would like to add.\n"
    }, {
        name: "salary",
        message: "What is the role's annual salary?\n"
    }, {
        name: "deptId",
        message: "What is this role's department id?\n"
    }]).then(function (answers) {
        connection.query("INSERT INTO role SET ?", {
            title: answers.roleTitle,
            salary: answers.salary,
            department_id: answers.deptId,
        })
        roleTable();
    })

}

// Update Employee Role
function updateRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        var newRole = [];
        for (var i = 0; i < res.length; i++) {
            newRole.push(res[i].title)
        }
        inquirer.prompt([{
            name: "roleTitle",
            type: "list",
            message: "Which role would you like to update?",
            choices: newRole,
        }, {
            name: "salary",
            message: "Enter the new salary for this role."
        }]).then(function (answers) {
            connection.query("UPDATE role SET ? WHERE?", [{
                salary: (answers.salary)
            }, {
                title: answers.roleTitle
            }],
                function (err, res) {
                    console.log("Here is an updated list of the nominees:")
                    roleTable();

                }
            )
        })
    })
}

// Delete Department
function deleteDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        var delDept = [];
        for (var i = 0; i < res.length; i++) {
            delDept.push(res[i].name)
        }
        inquirer.prompt([{
            name: "delete",
            type: "list",
            choices: delDept,
            message: "Which department would you like to delete?"
        }]).then(function (answer) {
            connection.query("DELETE FROM department WHERE ?", {
                name: answer.delete
            })
            departmentTable()

        })
    })

}

// Delete Role
function deleteRole() {
    connection.query("SELECT * FROM role", function (err, res) {
        var delRole = [];
        for (var i = 0; i < res.length; i++) {
            delRole.push(res[i].title)
        }
        inquirer.prompt([{
            name: "delete",
            type: "list",
            choices: delRole,
            message: "Which role would you like to delete?"
        }]).then(function (answer) {
            connection.query("DELETE FROM role WHERE ?", {
                title: answer.delete
            })
            roleTable()

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

// End Connection
function exit() {
    console.log("Thank you for using employee tracker!")
    connection.end()
}

manageEmployees();