import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);


const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Connect to database and then start server
const startServer = async () => {
    try {
        await Connection(username, password);
        app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();