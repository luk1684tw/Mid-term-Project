const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

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
