import express, { json } from 'express';
import todoController from './controllers/todoController.js';
import cookieParser from 'cookie-parser';

const port = 3000;
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(json());
app.use(cookieParser());
app.listen(port);

console.log('Listening to port ', port);
todoController(app);