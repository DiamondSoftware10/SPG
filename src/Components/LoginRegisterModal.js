import React, { Component } from 'react';
import ReactModal from 'react-modal';
import * as routes from '../Constants/Routes';
import { Link } from 'react-router-dom';


import './LoginRegisterModal.css';

import Login from './Login';

import icon from '../Icons/iconbeta.png';
import close from '../Icons/close.svg';


export default class LoginRegisterModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoginModal: false,
            showLoginForm: false
        }

        this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
        this.handleOpenLoginForm = this.handleOpenLoginForm.bind(this);
    }

    handleCloseLoginModal() {
        this.setState({
            showLoginModal: false,
        })
        this.props.handleCloseLoginModal();
    }

    handleOpenLoginForm() {
        this.setState({
            showLoginForm: true
        })
    }

    static getDerivedStateFromProps(props, state) {
        // Any time the current user changes,
        // Reset any parts of state that are tied to that user.
        // In this simple example, that's just the email.
        if (props.showLoginModal !== state.showLoginModal) {
            return {
                showLoginModal: props.showLoginModal
            };
        }
        return null;
    }

    // ...

    render() {
        return (
            <ReactModal
                isOpen={this.state.showLoginModal}
                contentLabel="onRequestClose Example"
                onRequestClose={this.handleCloseLoginModal}
                className="ModalBack animated fadeIn faster"
                overlayClassName="Overlay"
            >
                <div className="Modal" id="invest-login-modal">
                    <button className="hollow button" id="close-button" onClick={this.handleCloseLoginModal}><img id="proj-icon" src={close}></img></button>
                    <img id="spg-logo" src={icon} width="40" height="40"></img>
                    <h3 className="navbar-brand">SPG</h3>
                    <h4>{this.props.subtitle}</h4>

                    {this.state.showLoginForm ? <Login handleCloseLoginModal={this.handleCloseLoginModal}/> :
                        <div className="flexbox" id="invest-login-flex">

                                <button className="btn btn-sec" onClick={this.handleOpenLoginForm}>Inicia Sesion</button>

                            <div>
                                <button className="btn btn-primary" onClick={this.handleCloseLoginModal}>Cancelar</button>
                            </div>



                        </div>
                    }





                </div>
            </ReactModal>
        )
    }
}