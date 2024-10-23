import express from 'express';
const router = express.Router();
import { Book } from '../models/bookModel.js';

router.post('/', async (req, res) => {
    try {
        // Check if all required fields are present
        if (
            !req.body.title || 
            !req.body.author || 
            !req.body.publicationYear
        ) {
            return res.status(400).send({
                message: 'Send all fields: title, author, publicationYear'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publicationYear
        };

        const book = await Book.create(newBook); // Use the correct variable
        return res.status(201).send(book);
    }
    catch (err) {
        res.status(400).send(err);
    }
});


//get all books from DB
router.get('/', async (req, res) => {
   try {
    const books = await Book.find({})

    return res.status(200).json({
        count : books.length,
        data : books
    })
   }
   catch (err) {
    console.log(err)
   }
})


//get one books from DB
router.get('/:id', async (req, res) => {
   try {

    const { id } = req.params;
    const book = await Book.findById(id)

    return res.status(200).json(book)
   }
   catch (err) {
    console.log(err)
   }
})


//update a book with mongoose
router.put('/:id', async (req, res) => {
    try{
        if(
            !req.body.title || 
            !req.body.author || 
            !req.body.publicationYear 
        ){
            return res.status(400).send({ message : 'Invalid'})
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if (!result){
            return res.status(404).send({ message : 'Book not found'})
        }
        return res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
})


//delete mongoose database

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return res.status(404).send({ message : 'Book not found'})
        }
        return res.status(200).send(result);
    }
    catch (err) {
        console.log(err)
    }
})

export default router;