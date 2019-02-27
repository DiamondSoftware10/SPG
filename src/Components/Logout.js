import React, { Component } from 'react';
import LoginPage from './LoginPage';
import fire from '../Firebase/Fire';
import {Redirect } from "react-router-dom";

import * as routes from '../Constants/Routes';

export default class Logout extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        fire.auth().signOut();
       window.location.reload();
    }
    render(){
        return <Redirect push to={routes.LOGINPAGE} />
    }
}