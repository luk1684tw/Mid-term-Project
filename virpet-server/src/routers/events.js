const express = require('express');
const bodyParser = require('body-parser');

const eventModel = require('../model/events.js');


const router = express.Router();

router.use(bodyParser.json());

//list
router.get('/events',function(req,res,next) {
	eventModel.listEvents(req.query.searchText,req.query.unaccomplishedOnly,req.query.days).then( events => {
		res.json(events);
	}).catch(next);
});

//create

router.post('/events',function(req,res,next) {
	const {eventTitle,eventStartDate,eventEndDate,eventDescript} = req.body;
	if (!eventTitle || ! eventStartDate || !eventEndDate || !eventDescript) {
		const err = new Error('Date incomplete');
		err.status = 400;
		throw err;
	}

	eventModel.createEvent(eventTitle,eventStartDate,eventEndDate,eventDescript).then(events => {
		res.json(events);
		console.log(events);
	}).catch(next);
});
module.exports = router;
