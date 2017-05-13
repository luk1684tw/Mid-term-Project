import React from 'react';
import PropTypes from 'prop-types';
import {
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import {connect} from 'react-redux';
import {eventTitle, eventDanger, eventDescript, eventGetStartDate, eventGetEndDate} from 'states/main-actions.js';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import './Main.css';
class SingleEvent extends React.Component{
    static propTypes = {
      eventTitleValue: PropTypes.string,
      eventStartDate: PropTypes.string,
      eventEndDate: PropTypes.string,
      eventDescriptValue: PropTypes.string,
      eventDanger: PropTypes.bool,
      store: PropTypes.object,
      dispatch: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.eventTitleEl = null;
        this.eventStartDateEl = null;
        this.eventEndDateEl = null;
        this.eventDescriptEl = null;
        this.handleEventTitleChange = this.handleEventTitleChange.bind(this);
        this.handleEventDescriptChange = this.handleEventDescriptChange.bind(this);
        this.handleEventStartDateChange = this.handleEventStartDateChange.bind(this);
        this.handleEventEndDateChange = this.handleEventEndDateChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    render(){
      return(
        <div>
            <Button color="danger" onClick={this.toggle}>新增提醒</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className='' backdrop={false}>
                <ModalHeader toggle={this.toggle}>事件</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <InputGroupAddon>名稱</InputGroupAddon>
                        <Input placeholder="段考爆炸" getRef={el => this.eventTitleEl = el} value={this.props.eventTitleValue} onChange={this.handleEventTitleChange}/>
                    </InputGroup>
                    <FormGroup>
                        <Label for="exampleDate">開始日期</Label>
                        <Input placeholder="date placeholder" type="date" name="date" id="exampleDate" getRef={el => this.eventStartDateEl = el} value={this.props.eventStartDate} onChange={this.handleEventStartDateChange}/>
                        {/* <DatePicker selected={this.props.eventStartDate} onChange={this.handleEventStartDateChange}placeholderText="請點選輸入日期"/> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleDate">結束日期</Label>
                        <Input type="date" name="date" id="exampleDate" getRef={el => this.eventEndDateEl = el} value={this.props.eventEndDate} onChange={this.handleEventEndDateChange}/>
                        {/* <DatePicker selected={this.props.eventEndDate} onChange={this.handleEventEndDateChange}placeholderText="請點選輸入日期"/> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">描述</Label>
                        <Input type="textarea" name="text" id="exampleText" getRef={el => this.eventDescriptEl = el} value={this.props.eventDescriptValue} onChange={this.handleEventDescriptChange} placeholder="明天考試QQ"/>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>新增</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>取消</Button>
                </ModalFooter>
            </Modal>
        </div>
      );
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleEventTitleChange(e) {
        const text = e.target.value;
        console.log('e.target.value = ' + e.target.value);
        this.props.dispatch(eventTitle(text));
        if (text && this.props.eventDanger) {
            this.props.dispatch(eventDanger(false));
        }
    }
    handleEventDescriptChange(e) {
        const text = e.target.value;
        console.log('e.target.value = '+e.target.value);
        this.props.dispatch(eventDescript(text));
        if (text && this.props.eventDanger) {
            this.props.dispatch(eventDanger(false));
        }
    }
    handleEventStartDateChange(e){
        const date = e.target.value;
        console.log('Start Date: '+date);
        this.props.dispatch(eventGetStartDate(date));
        if(date && this.props.eventDanger){
             this.props.dispatch(eventDanger(false));
        }
    }

    handleEventEndDateChange(e){
        const date = e.target.value;
        console.log('End Date: '+date);
        this.props.dispatch(eventGetEndDate(date));
        if(date && this.props.eventDanger){
             this.props.dispatch(eventDanger(false));
        }
    }
}
export default connect(state => ({
    ...state.events,
}))(SingleEvent);
