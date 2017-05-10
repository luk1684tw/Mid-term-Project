const express = require('express');
const bodyParser = require('body-parser');

const todoModel = require('../model/todos.js');
const voteModel = require('../model/votes.js');

const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/todos', function(req, res, next) {
    todoModel.listTodos(req.query.accomplishTodo, req.query.searchText).then(todos => {
        res.json(todos);
    }).catch(next);
});

// Create
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.createTodos(mood, text).then(todo => {
        res.json(todo);
    }).catch(next);
});

// accomplishTodo
router.post('/todos/:id', function(req, res, next) {
    const {id} = req.params;
    if (!id) {
        const err = new Error('Post ID and mood are required');
        err.status = 400;
        throw err;
    }
    todoModel.accomplishTodo(id).then(post => {
		console.log('enter todoModel');
        res.json(post);
    }).catch(next);
});

module.exports = router;
