import express, { json } from 'express';
import todoController from './controllers/todoController.js';
import cookieParser from 'cookie-parser';

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(json());
app.use(cookieParser());

const port = process.env.PORT;
app.listen(port);

console.log('Listening to port 3000');

todoController(app);
