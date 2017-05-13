import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';

import {getMoodIcon} from 'utilities/weather.js';
import {createTodo, input, inputDanger, toggleMood, setMoodToggle, selectMood} from 'states/todo-actions.js';

import './PostForm.css';

class TodoForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        inputDanger: PropTypes.bool,
        moodToggle: PropTypes.bool,
        mood: PropTypes.string,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputValue, moodToggle, mood} = this.props;
        const inputDanger = this.props.inputDanger ? 'has-danger' : '';

        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDanger}`}>
                    <div className='mood align-self-start'>
                        <ButtonDropdown type='buttom' isOpen={moodToggle} toggle={this.handleMoodToggle}>
                            <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                                <i className={getMoodIcon(mood)}></i>&nbsp;{
                                    mood === 'na' ? 'Mood' : mood
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clear')}>&nbsp;&nbsp;5 Days</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clouds')}>&nbsp;&nbsp;7 Days</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Drizzle')}>&nbsp;&nbsp;10 Days</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Rain')}>&nbsp;&nbsp;15 Days</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Thunder')}>&nbsp;&nbsp;20 Days</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Snow')}>&nbsp;&nbsp;25 Days</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Windy')}>&nbsp;&nbsp;30 Days</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    <Input className='input' type='textarea' getRef={el => {this.inputEl = el}} value={this.props.inputValue} onChange={this.handleInputChange} placeholder="What's next to do?"></Input>
                    <Button className='btn-post align-self-end' color="info" onClick={this.handlePost}>Add</Button>
                </Alert>
            </div>
        );
    }

    handleDropdownSelect(mood) {
        this.props.dispatch(selectMood(mood));
    }

    handleInputChange(e) {
        const text = e.target.value
        this.props.dispatch(input(text));
        if (text && this.props.inputDanger) {
            this.props.dispatch(inputDanger(false));
        }
    }

    handleMoodToggle(e) {
        this.props.dispatch(toggleMood());
    }

    handlePost() {
        const {mood, inputValue, dispatch} = this.props;
        if (mood === 'na') {
            dispatch(setMoodToggle(true));
            return;
        }
        if (!inputValue) {
            dispatch(inputDanger(true));
            return;
        }

        dispatch(createTodo(mood, inputValue));
        dispatch(input(''));
        dispatch(selectMood('na'));
    }
}

export default connect(state => ({
    ...state.todoForm
}))(TodoForm);
