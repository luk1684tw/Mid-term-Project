const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function listEvents(searchText = '', unaccomplishedOnly = false, days = 0) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-events.json')) {
            fs.writeFileSync('data-events.json', '');
        }

        fs.readFile('data-events.json', 'utf8', (err, data) => {
            if (err){
                console.log('readFile failed');
                reject(err);
            }
            let events = data ? JSON.parse(data) : [];

            if (unaccomplishedOnly) {
                events.filter(e => {
                    return !e.doneTs;
                });
            }
            if (days) {
                events.filter(e => {
                    const time = Math.round((moment(e.startDate,'YYYY-MM-DD').unix() - moment().unix())/86400);
                    if (time <= days && time >= 0) {
                        console.log('In assigned range!');
                        return true;
                    }else {
                            console.log('Not in assigned range!');
                            return false;
                    }

                });
            }
            if (searchText) {
                events.filter(e => {
                    return e.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
                });
            }
            resolve(events);
        });
    });
}

function createEvent(title, startDate, endDate, description) {
    return new Promise((resolve, reject) => {
        const newEvent = {
            id: uuid(),
            title: title,
            startDate: startDate,
            endDate: endDate,
            description: description,
			ts: moment().unix(),
            doneTs: null
        };
        console.log('events :',newEvent);
        listEvents().then(events => {
            console.log('in listEvents().then');

            events = [
                ...events,
                newEvent
            ];
            console.log(events);
            fs.writeFile('data-events.json', JSON.stringify(events), err => {
                if (err)
                    reject(err);
                resolve(newEvent);
            });
        }).catch((err) => {
            console.log('in listEvents().catch');
            console.error(err);
        })
    });
}

function accomplishEvent(id) {
    return new Promise((resolve, reject) => {
        // let accomplishTodoPost=null;
        listEvents().then(events => {
            events.map(p => {
                console.log(`P.ID : ${p.id}`);
                if (p.id === id) {
                    // accomplishTodoPost=p;
                    p.doneTs = moment().unix();
                }
                return p;
            })

            fs.writeFile('data-events.json', JSON.stringify(events), err => {
                if (err)
                    reject(err);

                resolve(events);
            });
        });
    });
}
module.exports = {
    listEvents,
    createEvent,
	accomplishEvent
};
