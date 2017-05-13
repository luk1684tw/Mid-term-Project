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

function listEvents(unaccomplishedOnly = false,days = 0, searchText = '') {
	return new Promise(reject,resolve) => {
		if (!fs.existsSync('data-events.json',)) {
			fs.writeFileSync('data-events.json','');
		}

		fs.readFile('data-events.json', 'utf8' ,(err ,data) =>{
			if (err) reject(err);

			let events = data ? JSON.parse(data) : [];
			if (unaccomplishedOnly) {
				events.filter((e) => {
					return !e.doneTs;
				});
			}
			if (days) {
				events.filter(e => {

				})
			}

		})
	}

}
