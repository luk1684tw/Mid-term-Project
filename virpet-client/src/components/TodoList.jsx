import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import TodoItem from 'components/TodoItem.jsx';
import './TodoList.css';

class TodoList extends React.Component {
    static propTypes = {
        events: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {events} = this.props;
        console.log('EVENTS in todolist',events);
        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>All events are accomplished.<br />Anything else?</div>
            </ListGroupItem>
        );
        if (events.length) {
            children = events.map(t => (
                <ListGroupItem key={t.id} action={!t.doneTs}>
                    <TodoItem {...t} />
                </ListGroupItem>
            ));
        }

        return (
            <div className='todo-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}

export default connect()(TodoList);
