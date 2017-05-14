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
	
})
