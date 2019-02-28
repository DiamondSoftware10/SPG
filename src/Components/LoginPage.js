import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from "./Login";

import fire from '../Firebase/Fire';
import icon from '../Icons/iconbeta.png';

import * as routes from '../Constants/Routes';
import { Link, Redirect } from "react-router-dom";




class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.classes = props.classes;

    this.state = {
      user: null,
      renderLanding: null

    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.listenAuth = this.listenAuth.bind(this);
    this.logout = this.logout.bind(this);

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.listenAuth();
  }
  
  listenAuth() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  logout() {
    fire.auth().signOut();
  
  }


  render() {
    if (this.state.user) {
      return <Redirect push to={routes.LANDING} />;
    }
    else {
      return (
        <div id="register-div">
          <div id="jumbo-reg"></div>
          <Login />
        </div>
      )
    }
    
  }
}

export default LoginPage;
