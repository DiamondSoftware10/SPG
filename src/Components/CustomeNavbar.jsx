import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CustomNavbar.css'
import * as routes from '../Constants/Routes';


export default class CustomNavbar extends Component {
    render() {
        return (
                
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="#">Home</Link>
                        </Navbar.Brand>
                     <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventkey={1} componentClass={Link} to="/">
                            <Link to={routes.HOME}>
                                    <p id="User">Home</p>
                            </Link>
                    </NavItem>
                            <NavItem eventkey={2} componentClass={Link} to="/about">
                                <Link to={routes.PROYECTOS}>
                                    <p id="User">Proyectos</p>
                                </Link>
                            </NavItem>
                            <NavItem eventkey={3} componentClass={Link} to="/proyectos">
                            <Link to={routes.ABOUT}>
                                    <p id="User">About</p>
                                </Link>
                    </NavItem>
                            <NavItem eventkey={3} componentClass={Link} to="/inversiones">
                                <p><span class="glyphicon glyphicon-shopping-cart"></span></p>
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            
               
        )
    }
}
