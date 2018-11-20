import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';


class Navbar extends Component {
    render() {
        return (
            <div id="navbar2">
                <div id="title">Modos de acceso</div>
                <Link to={routes.USERHOMEPAGE}>
                    <button id="User">Switch to user</button>
                </Link>
                <Link to={routes.ADMINHOMEPAGE}>
                    <button id="Admin">Switch to admin</button>
                </Link>
                <Link to={routes.GUESTHOMEPAGE}>
                    <button id="Admin">Switch to guest</button>
                </Link>
                <Link to ={routes.LOGINPAGE}>
                    <button id = "login"> login/register</button>
                </Link>

                
                <Link to={routes.NEWPROJECT}>
                    <button id="Admin">Add project</button>
                </Link>
                

            </div>
        );
    }
}

export default Navbar;
