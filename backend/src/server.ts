import express from 'express';
import './database/connection';


const app = express();

app.get('/users', (request, response) => {
  response.json({"only": "test"})
})

app.listen(3333);