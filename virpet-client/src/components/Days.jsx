import React from 'react';
import {
	Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBlock,Container, Row, Col, Jumbotron
}  from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {listEvents} from 'states/events-actions.js';


class Days extends React.Component{
	static propTypes = {
		order : PropTypes.number,
		events : PropTypes.array,
		dispatch : PropTypes.func
	}
    constructor(props) {
    	super(props);
	}
	render(){
		// console.log('event :',this.props.events[this.props.order]);
		const date = (new Date().getDay() + this.props.order)%7;
		const weekday = (date === 0)? 'Sun' : (date === 1) ? 'Mon' : (date === 2) ? 'Tue'
			: (date === 3) ? 'Wen' : (date === 4) ? 'Thu' : (date === 5) ? 'Fri' : 'Sat'
	    return(
	      	<Card>
	        	<CardTitle>{weekday}</CardTitle>
	        	<CardSubtitle>{this.props.events}</CardSubtitle>
	          	<CardText>
	            	<span>{this.props.events.endDate}</span>
	          	</CardText>
	      	</Card>
	    );
	}
	componentWillMount(){
		this.props.dispatch(listEvents('',false,this.props.order));
		// console.log('events received in Days',this.props.events);
	}

};

export default connect(state => ({
	...state.events
}))(Days);
