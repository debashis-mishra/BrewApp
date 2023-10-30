# Project Title

Node.js Book Manager

A RESTful API using Node.js for managing books

## Installation

1. Git clone or download the project.
2. Run 'npm i' to install all the required dependencies.
3. Run 'npm start' to start the server.

## Usage

1. Add a new book: 
    POST request: http://localhost:3000/books
    Request Body:
    {
        "title":"Enter title",
        "author":"Enter author",
        "summary":"Enter summary"
    }

    Description: It will check if the book with the given details exists, if not then it will to the database.

2. View a list of all books:
    GET request: http://localhost:3000/books
    Description: It will return a list of all books in the database.

3. View details of a specific book by its ID:
    GET request: http://localhost:3000/books/:id
    Description: Pass the id in the params. If a book exists with the given id then it returns that particular book or else if it doesn't exist it will log that the book doesnt exist.

4. Update a book's details:
    PUT request: http://localhost:3000/books/:id
    Description: Pass the id in the params. If a book exists with the given id then it updates the book details or else if the book doesn't exist it will log that the book doesnt exist.

5. Delete a book:
    DELETE request: http://localhost:3000/books
    Description: Pass any one or more parameters such as id, title, author and summaries. If the book with the matching combination of parameters, it will delete that record or else it will throw error.