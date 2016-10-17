# Weekend Project 04 - To-Do List

This project uses the client-server-database relationship to create a to-do list application.  By using a database, tasks in the list can be permanently stored, and will not be reset when the page is refreshed.

## Features

- Using the database, tasks can be permanently stored, modified, and deleted as the user needs.
- The application allows the user to add, update, and remove tasks at any time.
- The application will ask the user to confirm removal of a task, to prevent accidental deletion.
- Completed tasks will be moved to the bottom of the page, keeping the layout clean and organized.

## Issues

- The checkbox is very small, but increasing the size leads to a distorted image.
- The 'preventDefault' function has not been properly included in the function, as the application will still refresh to the top of the screen when a change is made.

## Installation

- Requires Node, Express, NPM, and Postgresql
- Run npm install and npm start in the project directory
- Create the table by running the command in 'database.sql'
- Go to http://localhost:3000 to run the project
- Make sure to close the server using Control+C before closing the terminal!

## Author

- Barrett Amsrud
- October 16th, 2016
