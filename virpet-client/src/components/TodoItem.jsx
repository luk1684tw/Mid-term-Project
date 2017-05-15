import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';

import {accomplishEvent} from 'states/events-actions.js';

import './TodoItem.css';

class TodoItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        description:PropTypes.string,
        ts: PropTypes.number,
        doneTs: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    }

    render() {
        const {id, title, startDate, endDate, description, ts, doneTs} = this.props;

        return (
            <div className={'todo-item d-flex flex-column ' + (doneTs ? 'done' : 'undone')}  onClick={this.handleCheckboxCheck}>
                <div className='todo d-flex'>
                    {/* <div className='mood'><i className={getMoodIcon(mood)}></i></div> */}
                    <div className='wrap'>
                        <div className='ts'>{'Created: ' + moment(ts * 1000).calendar()}</div>
                        <div className='text'>{title}</div>
                        <div className='text'>{startDate} to {endDate}</div>
                        <div className='text'>{description}</div>
                    </div>
                </div>
                <div className='check d-flex justify-content-end align-items-center'>
                    <div className='done-ts'>{
                        !!doneTs &&
                        <span>{moment(doneTs * 1000).calendar()}</span>
                    }</div>
                    <div className='checkbox' >
                        <i className={'fa ' + (doneTs ? 'fa-check-square' : 'fa-square-o')} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }

    handleCheckboxCheck() {
        console.log('In handleCheckboxCheck', this.props.id);
        if (!this.props.doneTs) {
            this.props.dispatch(accomplishEvent(this.props.id));
        }
    }
}

export default connect()(TodoItem);
