const express = require('express');
const Todo = require('../model/todo.model');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const data = req.body;
    // data.created_by = 
    const TodoModel = new Todo(data);
    const response = {status: true, message: 'Todo created.'}
    try {
        await TodoModel.save();
    } catch (error) {
        console.log("error occured", error);
        response.status = false;
        response.message = 'Todo creation failed!';
    }

    return res.send(response);
});

router.patch('/:id', async (req, res, next) => {
    const data = req.body;
    const id = req.params.id;

    const response = {status: false, message: 'Todo updation failed.'}
    try {
        Todo.findByIdAndUpdate({id}, data).then(succ => {
            response.status = true;
            response.message = 'Todo updated.';
        }).catch(err => {console.log(err)});
    } catch (error) {console.log("error occured", error);}

    return res.send(response);
});

module.exports = router;