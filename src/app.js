import express from 'express';
import morgan from 'morgan';
import router from './routes/app.routes.js';

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api', router);


export default app;