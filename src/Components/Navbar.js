import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Navbar.css';



import magnifier from '../Icons/magnifier.svg';
import icon from '../Icons/iconbeta.png';
import cart from '../Icons/cart.svg';

const Navbar = ({ authUser }) =>
    <div>
        {authUser
            ? <NavAuth authUser={authUser} />
            : <NavNonAuth />
        }
    </div>


const NavNonAuth = () =>
    <div id="navbar2">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light ">
            <a className="navbar-brand" href="#">
                <img src={icon} width="30" height="30"></img>
                SPG
                    </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0 input-search">
                    <input id="main-search" className="form-control mr-sm-2" type="search" placeholder="Busqueda" aria-label="Busqueda" />
                    <img id="main-search-icon" src={magnifier}></img>

                    <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit">Búsqueda</button>
                </form>
                <ul className="navbar-nav mr-auto ">
                    <Link to={routes.LANDING}>
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></a>
                        </li>
                    </Link>
                    <Link to={routes.PROYECTOS}>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Explorar</a>
                        </li>
                    </Link>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Acerca de</a>
                    </li>
                    {/*
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                            */}
                </ul>

                <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                    <li className="nav-item">
                        <Link to={routes.LOGINPAGE}>
                            <button className="nav-link bt" id="login-bt" href="#">LOG IN</button>
                        </Link>

                    </li>
                </ul>
            </div>
        </nav>
        {/*
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



        <Link to={routes.NEWPROJECT}>
            <button id="Admin">Add project</button>
        </Link>
*/}

    </div>


const NavAuth = ({ authUser }) => (
    <div id="navbar2">
        <nav className="navbar sticky-top navbar-expand-lg navbar-light ">
            <a className="navbar-brand" href="#">
                <img src={icon} width="30" height="30"></img>
                SPG
                    </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="form-inline my-2 my-lg-0 input-search">
                    <input id="main-search" className="form-control mr-sm-2" type="search" placeholder="Busqueda" aria-label="Busqueda" />
                    <Link to={routes.PROYECTOS}>
                    <img id="main-search-icon" src={magnifier}></img>
                    </Link>
                    <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit">Búsqueda</button>
                </form>
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item active">
                    <Link to={routes.LANDING}>

                        <a className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROYECTOS}>
                            <a className="nav-link" href="#">Explorar</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" href="#">Acerca de</a>
                    </li>
                    {/*
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                            */}
                </ul>

                <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                    <li className="nav-item">
                        <img id="cart-icon" src={cart}></img>
                    </li>
                    <li className="nav-item">
                        <a class="nav-link dropdown-toggle" href="#" id="nav-profile" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
            </div>
            <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                    <li className="nav-item">
                        <Link to={routes.LOGINPAGE}>
                            <button className="nav-link bt" id="login-bt" href="#">LOG OUT</button>
                        </Link>

                    </li>
                </ul>
        </nav>
        

        {/*
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
        <Link to={routes.LOGINPAGE}>
            <button id="login"> login/register</button>
        </Link>

        <Link to={routes.NEWPROJECT}>
            <button id="Admin">Add project</button>
        </Link>
        */}

    </div>

)

export default Navbar;
