import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
            unique: true
        },
        author: {
            type: String,
            required: true
        },
        publishYear: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true // Corrected spelling
    }
);

const Book = mongoose.model('Book', bookSchema);

export { Book };
