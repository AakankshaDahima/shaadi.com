import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from '../routes/authRoutes.js';
import { requireAuth, checkUser, getUser } from '../middleware/authMiddleware.js';

const uri = "mongodb+srv://todotestingapp:todotestingapp@tododb.xexkz.mongodb.net/todoDB?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .catch((err) => console.log(err));

var todoSchema = new mongoose.Schema({
    updateAt: { type: Date, default: Date.now },
    item: String,
    userid: String,
    prioritize: Boolean
});

var Todo = mongoose.model('Todo', todoSchema);
var urlencodedParser = bodyParser.urlencoded({extended: false});

export default function(app){
    app.get('*', checkUser);
    app.get('/', (req, res) => res.render('home'));

    app.get('/todo', requireAuth, function(req, res){
        Todo.find({userid: getUser.userid.id.trim()}, function(err, data){
            if(err) throw err;
            res.render('todo', {todos: data});
        }).sort([['updateAt', 'descending']]);
    });
    app.post('/todo', urlencodedParser, function(req, res){
        var data = req.body;
        data.userid = getUser.userid.id.trim();
        var newTodo = Todo(data).save(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.put('/todo/:item', urlencodedParser, function(req, res){
        Todo.find({item: req.params.item}, function(err, result){
            var curr_priority = !result[0].prioritize;    
            Todo.updateOne({item: req.params.item.replace(/\-/g, " ")}, {prioritize: curr_priority}, function(err, data){
                if(err) throw err;
                res.json(data);
            });
        });
    });
    app.delete('/todo/:item', function(req, res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).deleteOne(function(err, data){
            if(err) throw err;
            res.json(data);
        });
    });
    app.use(router);
};
