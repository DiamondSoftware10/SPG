import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

class Navbar extends Component {
    render() {
        return (
            <div>
                <Link to={routes.USERHOMEPAGE}>
                    <button id="User">Switch to user</button>
                </Link>
                <Link to={routes.ADMINHOMEPAGE}>
                    <button id="Admin">Switch to admin</button>
                </Link>
                <Link to={routes.GUESTHOMEPAGE}>
                    <button id="Admin">Switch to guest</button>
                </Link>
            </div>
        );
    }
}

export default Navbar;
