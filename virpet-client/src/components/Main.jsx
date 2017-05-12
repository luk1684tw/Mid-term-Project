import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
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
    InputGroup, InputGroupAddon
} from 'reactstrap';
import {connect} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar} from 'states/main-actions.js';
import GoogleLogin from 'react-google-login';
import './Main.css';

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
		const responseGoogle = (response) => {
	  		console.log(response);
		}
        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light toggleable>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='' href="/">Virpet</NavbarBrand>&nbsp;&nbsp;
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/forecast'>提醒條</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div>
                                        <Button color="danger" onClick={this.toggle}>新增提醒</Button>
                                        <Modal isOpen={this.state.modal} toggle={this.toggle} className='' backdrop={false}>
                                            <ModalHeader toggle={this.toggle}>事件</ModalHeader>
                                            <ModalBody>
                                                <InputGroup>
                                                  <InputGroupAddon>名稱</InputGroupAddon>
                                                  <Input placeholder="段考爆炸" />
                                                </InputGroup>
                                                <FormGroup>
                                                  <Label for="exampleDate">開始日期</Label>
                                                  <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                                                </FormGroup>
                                                <FormGroup>
                                                  <Label for="exampleDate">結束日期</Label>
                                                  <Input type="date" name="date" id="exampleDate" placeholder="date placeholder" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="exampleText">描述</Label>
                                                    <Input type="textarea" name="text" id="exampleText" placeholder="明天考試QQ"/>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={this.toggle}>新增</Button>{' '}
                                                <Button color="secondary" onClick={this.toggle}>取消</Button>
                                            </ModalFooter>
                                        </Modal>
                                    </div>&nbsp;&nbsp;
									<div>
										<GoogleLogin
											clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
											buttonText="Login with Google"
											onSuccess={responseGoogle}
											onFailure={responseGoogle}
											className='btn btn-secondary'
											offline={false}
										></GoogleLogin>
									</div>
                                    <div className='search ml-auto'>
                                        <Input className='ml-auto' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} getRef={e => this.searchEl = e}></Input>{this.props.searchText && <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
}
                                    </div>
                                </Collapse>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (<Today/>)}/>
                    <Route exact path="/forecast" render={() => (<Forecast/>)}/>
                    <div className='footer'>
                        DataLab.
                    </div>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default connect(state => ({
    ...state.main,
    searchText: state.searchText
}))(Main);
