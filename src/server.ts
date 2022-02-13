import express, { Application } from 'express';
require('express-async-errors');
import cors from 'cors';
import initRoutes from './routes';

require('dotenv').config();

const app: Application = express();

// setup CORS
app.use(cors());
// setup body parser
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

export default app;
