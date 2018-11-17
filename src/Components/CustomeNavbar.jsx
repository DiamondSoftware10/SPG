import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './CustomNavbar.css'

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
                    <Nav pullRight>
                        <NavItem eventkey={1} componentClass={Link} to="/">
                            Home
                    </NavItem>
                        <NavItem eventkey={2} componentClass={Link} to="/about">
                            About
                    </NavItem>
                        <NavItem eventkey={3} componentClass={Link} to="/proyectos">
                            Proyectos
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
