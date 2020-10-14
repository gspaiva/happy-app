import express, { Router } from 'express';
import './database/connection';
import routes from './routes';

import app from './app';

app.use(express.json());
app.use(routes);
app.listen(process.env.PORT || 3333);