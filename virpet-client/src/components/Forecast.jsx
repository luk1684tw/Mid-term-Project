import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Label, Input} from 'reactstrap';

import _ from "lodash";

import {
    Card,
    Button,
    CardImg,
    CardTitle,
    CardText,
    CardGroup,
    CardSubtitle,
    CardBlock,
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import TodoForm from 'components/TodoForm.jsx';
import TodoList from 'components/TodoList.jsx';
import {listEvents, toggleAndList} from 'states/events-actions.js';
import Days from 'components/Days.jsx'
import './Forecast.css';

class Forecast extends React.Component {
    static propTypes = {
        list: PropTypes.array,
				startEventLoading: PropTypes.bool,
        events: PropTypes.array,
        searchText: PropTypes.string,
        showDays: PropTypes.number,
        unaccomplishedOnly: PropTypes.bool,
				dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.toggleUnaccomplishedOnly = this.toggleUnaccomplishedOnly.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(listEvents(this.props.searchText, false, this.props.showDays));
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listEvents(this.props.searchText, false, this.props.showDays));
        }
    }

    render() {
        const {
            list,
            startEventLoading,
            events,
						unaccomplishedOnly
        } = this.props;
        const tomorrow = list[0];
        const rests = list.slice(1);

        document.body.className = `weather-bg`;
        document.querySelector('.weather-bg').style.backgroundImage = `url("images/corgi.jpg")  `;
				console.log('EVENTS in forecast',events);
        return (
            <div className='forecast'>
                <container className='display-5'>
                    <div className="cards">
                        <Row>
                            <Col>
                                <Days order={0}/>
                            </Col>
                            <Col>
                                <Days order={1}/>
                            </Col>
                            <Col className="responsive">
                                <Days order={2}/>
                            </Col>
                            <Col className="responsive">
                                <Days order={3}/>
                            </Col>

                            <Col className="responsive">
                                <Days order={4}/>
                            </Col>
                            <Col className="responsive">
                                <Days order={5}/>
                            </Col>
                            <Col className="responsive">
                                <Days order={6}/>
                            </Col>
                        </Row>
                    </div>
                </container>
                <div className='todos'>
                    <div className='label d-flex justify-content-between align-items-end'>
                        <h4>
                            <i className='fa fa-tags' aria-hidden="true"></i>&nbsp;&nbsp;Todos</h4>
                        <div><Input type="checkbox" checked={this.props.unaccomplishedOnly} onClick={this.toggleUnaccomplishedOnly}/>&nbsp;<Label className='accomplished-only' onClick={this.toggleUnaccomplishedOnly}>Unaccomplished</Label>
                        </div>
                    </div>
                    <TodoForm/>
                    <TodoList events={events}/>{startEventLoading && <Alert color='warning' className='loading'>Loading...</Alert>
}
                </div>
            </div>
        );
    }

    toggleUnaccomplishedOnly() {
        this.props.dispatch(toggleAndList());
    }
}

export default connect(state => ({
    ...state.forecast,
    ...state.events,
    ...state.todoForm,
    unit: state.unit,
    searchText: state.searchText
}))(Forecast);
