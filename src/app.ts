import express from 'express';
import morgan from 'morgan';
// import path from 'path'

import homeRouter from './router/home.js';
import { taskRouter } from './router/task.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/', homeRouter);
app.use('/task', taskRouter);
