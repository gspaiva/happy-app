import {ErrorRequestHandler} from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof ValidationError){
    let errors: ValidationErrors = {};
    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });
    response.status(400).json({ message: 'Validation fails', errors });
  } else {
    response.status(500).json({ message: 'Internal Server error'});
  }

  console.log(error);
}

export default errorHandler;