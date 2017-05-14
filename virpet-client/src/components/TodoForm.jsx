import React from 'react';
import PropTypes from 'prop-types';
import {
    Input,
    Button,
    Form,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import {toggleForm, toggleTemp, listEvents, selectShowDays} from 'states/events-actions.js';
import './PostForm.css';

class TodoForm extends React.Component {
    static propTypes = {
        formToggle: PropTypes.bool,
        tempToggle: PropTypes.bool,
        showDays: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleFormToggle = this.handleFormToggle.bind(this);
        this.handleTempToggle = this.handleTempToggle.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleEvents = this.handleEvents.bind(this);
    }

    render() {
        const {formToggle, tempToggle, showDays}=this.props;
        return (
            <div className='post-form'>
              {formToggle?
                      <ButtonDropdown type='buttom' isOpen={tempToggle} toggle={this.handleTempToggle}>
                          <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                              {/*<i className={getMoodIcon(mood)}></i>&nbsp;
                                   mood === 'na' ? 'Mood' : mood
                              */}
                              {this.props.showDays} Days
                          </DropdownToggle>
                          <DropdownMenu>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(5)}>&nbsp;&nbsp;5 Days</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(7)}>&nbsp;&nbsp;7 Days</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(10)}>&nbsp;&nbsp;10 Days</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(15)}>&nbsp;&nbsp;15 Days</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(20)}>&nbsp;&nbsp;20 Days</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(25)}>&nbsp;&nbsp;25 Days</DropdownItem>
                              <DropdownItem type='button' onClick={() => this.handleDropdownSelect(30)}>&nbsp;&nbsp;30 Days</DropdownItem>
                          </DropdownMenu>
                      </ButtonDropdown>
              :
              <Button className='btn-form' outline color="secondary" onClick={this.handleFormToggle}><i className='fa fa-map-marker' aria-hidden="true"></i>&nbsp;&nbsp;選取範圍</Button>
            }
            </div>
        );
    }

    handleDropdownSelect(showDays) {
        console.log(showDays);
        this.props.dispatch(selectShowDays(showDays));
    }

    handleFormToggle() {
        this.props.dispatch(toggleForm());
    }

    handleTempToggle() {
        this.props.dispatch(toggleTemp());
    }

    handleEvents() {
        const {showDays, dispatch} = this.props;
        console.log('handleEvents :' + showDays);
    }
}

export default connect(state => ({
    ...state.eventsForm
}))(TodoForm);
