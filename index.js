import express from 'express';
import { connect, Schema, model } from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const connectionURL = 'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@cluster0.okunbnk.mongodb.net/booksDB';

connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error(err);
});

// DB Schema
const bookSchema = new Schema({
    title: String,
    author: String,
    summary: String
});

const Book = model('Book', bookSchema);

// Add a new book (title, author, summary)
app.post('/books', async (req, res) => {
    const { title, author, summary } = req.body;

    // Check if a book with the same details already exists
    const existingBook = await Book.findOne({ title, author, summary });

    if (existingBook) {
        res.send('Book already exists!');
    } else {
        const newBook = new Book({ title, author, summary });
        await newBook.save()
            .then(() => {
                console.log('Book added!');
                res.send(newBook);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error adding book');
            });
    }
});


// View a list of all books
app.get('/books', async (req, res) => {
    await Book.find({}).then((books) => {
        res.send(books);
    }).catch((err) => {
        console.error(err);
    });
});


// View details of a specific book by its ID
app.get('/books/:id', async (req, res) => {
    const id = req.params;

    await Book.findById(id)
        .then((book) => {
            if (!book) {
                res.status(404).send('Book not found!');
            } else {
                res.send(book);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching book!');
        });
});


// Update a book's details
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, summary } = req.body;

    let book = await Book.findById(id);

    if (!book) {
        res.status(404).send('Book not found!');
    } else {
        await Book.updateOne({ _id: id }, { $set: { title, author, summary } })
            .then(() => {
                res.send('Book updated!');
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error updating book');
            });
    }
});


// Delete a book
app.delete('/books', async (req, res) => {
    const { id, title, author, summary } = req.query;

    if (!id && !title && !author && !summary) {
        res.status(400).send('Please enter the book id or title or author or summary');
    } else {
        const deleteConditions = {};
        if (id) deleteConditions._id = id;
        if (title) deleteConditions.title = title;
        if (author) deleteConditions.author = author;
        if (summary) deleteConditions.summary = summary;

        await Book.deleteMany(deleteConditions)
            .then(() => {
                res.send('Books deleted');
            })
            .catch((err) => {
                console.error(err);
            });
    }
});

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if (err)
        throw err;
    console.log('Server started');
});