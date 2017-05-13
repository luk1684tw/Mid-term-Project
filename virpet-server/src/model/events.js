const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

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
