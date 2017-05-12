import React from 'react';
import {
	Card, Button, CardImg, CardTitle, CardText, CardGroup,
	 CardSubtitle, CardBlock,Container, Row, Col, Jumbotron
} from 'reactstrap';


export default class Card1 extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
      return (
        <Card>
          <CardTitle>1</CardTitle>
          <CardSubtitle></CardSubtitle>
            <CardText>
              <i></i>
              <span></span>
            </CardText>
        </Card>
      );
    }
}
