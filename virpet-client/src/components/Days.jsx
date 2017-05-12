import React from 'react';
import {
	Card, Button, CardImg, CardTitle, CardText, CardGroup,
	 CardSubtitle, CardBlock,Container, Row, Col, Jumbotron
} from 'reactstrap';
export default class Days extends React.Component{
  constructor(props) {
      super(props);
  }
  render(){
    return(
      <Card>
        <CardTitle>1</CardTitle>
        <CardSubtitle>1</CardSubtitle>
          <CardText>
            <i></i>
            <span>1</span>
          </CardText>
      </Card>
    );
  }
}
