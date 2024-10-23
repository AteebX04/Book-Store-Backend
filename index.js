import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';
import routes from './routes/web.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/books', routes);





// Connect to MongoDB and start the server
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Database Connection Established");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
