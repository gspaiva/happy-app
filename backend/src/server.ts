import express, { Router } from 'express';
import './database/connection';
import routes from './routes';
import path from 'path';
import app from './app';

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.listen(process.env.PORT || 3333);