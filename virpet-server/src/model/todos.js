const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function listTodos(unaccomplishedOnly = false,searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let todos = data ? JSON.parse(data) : [];
			if (unaccomplishedOnly) {
		        todos = todos.filter(t => {
		            return !t.doneTs;
		        });
		    }
		    if (todos.length > 0 && searchText) {
		        todos = todos.filter(t => {
		            return t.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
		        });
		    }
            resolve(todos);
        });
    });
}

function createTodos(mood, text) {
    return new Promise((resolve, reject) => {
		const newTodo = {
	        id: uuid(),
	        mood: mood,
	        text: text,
	        ts: moment().unix(),
	        doneTs: null
	    };

        listTodos().then(todos => {
            todos = [
                newTodo,
                ...todos
            ];
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(newTodo);
            });
        });
    });
}

function accomplishTodo(id) {
	return new Promise((resolve,reject) => {
		// let accomplishTodoPost=null;
		listTodos().then(todos => {
			todos.map(p => {
				console.log(`P.ID : ${p.id}`);
				if (p.id === id){
					// accomplishTodoPost=p;
					p.doneTs = moment().unix();
				}
				return p;
			})

			fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(todos);
            });
		});
	});
}

module.exports = {
    listTodos,
    createTodos,
	accomplishTodo
};
