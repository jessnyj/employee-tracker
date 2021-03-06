# employee-tracker

![License](https://img.shields.io/badge/license-MIT-181717?style=for-the-badge) 

## Table of Contents
||||
|:-:|:-:|:-:|
|[Table Contents](#table-of-contents)|[Demo](#demo)|[Technologies Used](#technologies-used)
|[Description](#description)|[Work Involved](#work-involved)|[Code Snippet](#code-snippet)
|[Usage](#usage)|[Authors](#authors)|[Acknowledgments](#acknowledgments)

## Demo
* Click this link to see a demo of the application.
[Demo](https://drive.google.com/file/d/1hWp9hMdw0AY_eXNW05clstLZgZBAgMry/view)

## Technologies Used
||||
|:-:|:-:|:-:|
|Express	|NodeJS |Javascript |	
|InquirerJS	|MySQL |console.table

## Description
The employer tracker application allows a user to manage a company's employees. It allows a user to add and view departments, roles, employees, as well as update employee roles. 

## Usage
* To use this application first you would type in employee.js into your terminal.
* Then a list of options will appear:
![Application](./images/info.png)
* You can use your cursor to select which option you would like to see.
![Role-Table](./images/role.png)

## Work Involved
In order to build this application, I utilized MySQL in order to create an employee database and connect it to my local host. I utilized InquirerJs to develop the user prompts, and console.table to print MySQL rows into the console.

## Code Snippet
* This code snippet allows for the employee table to be printed into the console.
```
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
```

## License
This project is covered under MIT.

## Authors
**UC Berkeley Coding Bootcamp**

**Jessny Joseph** 

[Github](https://github.com/jessnyj) | [LinkedIn](https://www.linkedin.com/in/jessny-joseph-361515201)

## Acknowledgments
I would like to thank the mentors and colleagues who helped inspire and improve upon this project.
