import React from 'react';
import {
	Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBlock,Container, Row, Col, Jumbotron
}  from 'reactstrap';

import PropTypes from 'prop-types';

export default class Days extends React.Component{
    constructor(props) {
    	super(props);
	}
	render(){
		const date = (new Date().getDay() + this.props.order)%7;
		const weekday = (date === 0)? 'Sun' : (date === 1) ? 'Mon' : (date === 2) ? 'Tue'
			: (date === 3) ? 'Wen' : (date === 4) ? 'Thu' : (date === 5) ? 'Fri' : 'Sat'
	    return(
	      	<Card>
	        	<CardTitle>{weekday}</CardTitle>
	        	<CardSubtitle>1</CardSubtitle>
	          	<CardText>
	            	<i></i>
	            	<span>1</span>
	          	</CardText>
	      	</Card>

	    );
	}
}
