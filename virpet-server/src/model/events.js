const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');


function accomplishEvent(id) {
	return new Promise((resolve,reject) => {
		// let accomplishTodoPost=null;
		listEvents().then(events => {
			events.map(p => {
				console.log(`P.ID : ${p.id}`);
				if (p.id === id){
					// accomplishTodoPost=p;
					p.doneTs = moment().unix();
				}
				return p;
			})

			fs.writeFile('data-evens.json', JSON.stringify(events), err => {
                if (err) reject(err);

                resolve(events);
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
					return ((e.startDate - moment().unix()) <= days);
				})
			}
			if (searchText) {
				events.filter((e) => {
					return e.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
				})
			}
			resolve(events);

		})
	}

}
