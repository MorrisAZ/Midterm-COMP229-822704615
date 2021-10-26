//Express Portfolio
//morris Zuniga
//Student ID: 822704615



// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Books = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Books.find( (err, books) => {
    if (err) 
    {
      return console.error(err);
    }
    else 
    {
      res.render('books/index', {title: 'books',books: books});
    }

  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req,res, next) => {
  res.render('books/details', {title: 'add book'})
});


// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {
  let newBooks = Books({
    "Title":req.body.Title,
    "Price":req.body.Price,
    "Author":req.body.Author,
    "Genre":req.body.Genre
  });

  Books.create(newBooks, (err, Book)=>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }else
    {
      res.redirect('/books');
    }
  });



// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  let id = req.params.id;

  Books.findById(req.params.id, (err, Book) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //show edit view
      res.render('books/details', {title: 'Edit Book', Books : Book, action:''})
    }
  });
});

/*POST route for processing the EDiT page - UPDATE operation*/
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  
  let updatedBook = Books({
    "_id": id,
    "Title":req.body.Title,
    "Price":req.body.Price,
    "Author":req.body.Author,
    "Genre":req.body.Genre

  });

  Books.updateOne({_id: id}, updatedBook, (err)=> {
    if(err)
    {
      console.log(err);
      res.end(err);
    }else
    {
      //refresh book list
      res.redirect('/books');
    }
  });
});
});


// GET - process the delete by user id
router.get('/details/:id', (req, res, next) => {

  let id= req.params.id;

  Books.remove({_id:id}, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/books')
    }
  });
});


module.exports = router;
