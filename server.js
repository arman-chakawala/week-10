var express = require('express');
let Books = require('./BookSchema');
let mongodbConnected = require('./mongoDBConnect');
const cors = require('cors');
var bodyparser = require('body-parser');

var app = express();

// Middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());

// Default Route
app.get('/', function (req, res) {
    res.send('Welcome to the Online Library Backend!');
});

// REST API Endpoints

// 1. Get All Books
app.get('/allbooks', async (req, res) => {
    const books = await Books.find();
    return res.json(books);
});

// 2. Get a Single Book by ID
app.get('/getbook/:id', function (req, res) {
    let id = req.params.id;
    Books.findById(id, function (err, book) {
        res.json(book);
    });
});

// 3. Add a New Book
app.post('/addbooks', function (req, res) {
    let newbook = new Books(req.body);
    newbook.save()
        .then(() => res.status(200).json({ books: 'Book added successfully' }))
        .catch((err) => res.status(400).send('Adding new book failed'));
});

// 4. Update a Book by ID
app.post('/updatebook/:id', function (req, res) {
    let id = req.params.id;
    let updatedbook = req.body;
    Books.findByIdAndUpdate(id, updatedbook, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({ books: 'Book updated successfully' });
        }
    });
});

// 5. Delete a Book by ID
app.post('/deleteBook/:id', function (req, res) {
    let id = req.params.id;
    Books.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send('Book Deleted');
        }
    });
});

// Start the Server
app.listen(5500, function () {
    console.log('Server is running on port 5500');
});
