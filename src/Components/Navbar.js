import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Navbar.css';
import magnifier from '../Icons/magnifier.svg';
import icon from '../Icons/iconbeta.png';
import cart from '../Icons/cart.svg';
import briefcase from '../Icons/briefcase.svg';
import profile from '../Icons/profile.svg';

import Searchbar from './Searchbar';

const Navbar = ({ authUser, type }) =>
    <div className=" sticky-top ">
        {authUser
            ? <NavAuth authUser={authUser} type={type} />
            : <NavNonAuth />
        }
    </div>


const NavNonAuth = () =>
    <div id="navbar2">
        <nav className="navbar navbar-expand-lg navbar-light blurry">
            <Link to={routes.LANDING}>
                <a className="navbar-brand" >
                    <img src={icon} width="30" height="30"></img>
                    SPG
            </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Searchbar option={"title"} />
                <ul className="navbar-nav mr-auto ">
                    <Link to={routes.LANDING}>
                        <li className="nav-item active">
                            <a className="nav-link" >Inicio <span className="sr-only">(current)</span></a>
                        </li>
                    </Link>
                    <Link to={routes.PROYECTOS}>
                        <li className="nav-item">
                            <a className="nav-link" >Explorar</a>
                        </li>
                    </Link>
                    <li className="nav-item">
                        <a className="nav-link" >Acerca de</a>
                    </li>
                </ul>

                <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                    <li className="nav-item">
                        <Link to={routes.LOGINPAGE}>
                            <button className="nav-link bt" id="login-bt" >LOG IN</button>
                        </Link>

                    </li>
                </ul>
            </div>
        </nav>


    </div>

const NavAdmin = () => (
    <div id="navbar2">
        <nav className="navbar navbar-expand-lg navbar-light ">

            <Link to={routes.LANDING}>
                <a className="navbar-brand" >
                    <img src={icon} width="30" height="30"></img>
                    SPG
            </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Searchbar option={"title"}/>
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item active">
                        <Link to={routes.LANDING}>

                            <a className="nav-link" >Inicio <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROYECTOSADMIN}>
                            <a className="nav-link">Explorar</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" >Acerca de</a>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.MANAGEPROJECTS}>
                            <a className="nav-link">Editar Proyectos</a>
                        </Link>
                    </li>

                </ul>

                <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                    <li className="nav-item">
                        <Link to={routes.CART}>
                            <img id="cart-icon" src={briefcase}></img>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROFILE}>
                            <img id="prof-icon" src={profile}></img>
                        </Link>
                    </li>

                </ul>
            </div>
            <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                <li className="nav-item">
                    <Link to={routes.LOGINPAGE}>
                        <button className="nav-link bt" id="login-bt" >LOG OUT</button>
                    </Link>

                </li>
            </ul>
        </nav>




    </div>
)
const NavUser = () => (
    <div id="navbar2">
        <nav className="navbar navbar-expand-lg navbar-light ">
            <Link to={routes.LANDING}>
                <p className="navbar-brand" >
                    <img src={icon} width="30" height="30"></img>
                    SPG
            </p>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Searchbar option={"title"}/>
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item active">
                        <Link to={routes.LANDING}>

                            <a className="nav-link" >Inicio <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROYECTOS}>
                            <a className="nav-link" >Explorar</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" >Acerca de</a>
                    </li>
                    {/*
                            <li className="nav-item">
                                <a className="nav-link disabled" >Disabled</a>
                            </li>
                            */}
                </ul>

                <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                <li className="nav-item">
                        <Link to={routes.CART}>
                            <img id="cart-icon" src={briefcase}></img>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROFILE}>
                            <img id="prof-icon" src={profile}></img>
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link to={routes.LOGINPAGE}>
                        <button className="nav-link bt" id="login-bt" >LOG OUT</button>
                    </Link>

                </li>

                </ul>
            </div>
            <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
               
            </ul>           
        </nav>




    </div>

)
const NavSuper = () => (
    <div id="navbar2">
        <nav className="navbar navbar-expand-lg navbar-light ">

            <Link to={routes.LANDING}>
                <a className="navbar-brand" >
                    <img src={icon} width="30" height="30"></img>
                    SPG
            </a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <Searchbar />
                <ul className="navbar-nav mr-auto ">
                    <li className="nav-item active">
                        <Link to={routes.LANDING}>

                            <a className="nav-link" >Inicio <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROYECTOSADMIN}>
                            <a className="nav-link">Explorar</a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" >Acerca de</a>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.CREATEUSERADMIN}>
                            <a className="nav-link">Admin</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.MANAGEPROJECTS}>
                            <a className="nav-link">Editar Proyectos</a>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={routes.MANAGEUSERS}>

                            <a className="nav-link" >Editar Admins <span className="sr-only">(current)</span></a>
                        </Link>
                    </li>

                </ul>
                <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                <li className="nav-item">
                        <Link to={routes.CART}>
                            <img id="cart-icon" src={briefcase}></img>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.PROFILE}>
                            <img id="prof-icon" src={profile}></img>
                        </Link>
                    </li>


                </ul>
                
            </div>
            <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
                <li className="nav-item">
                    <Link to={routes.LOGINPAGE}>
                        <button className="nav-link bt" id="login-bt" >LOG OUT</button>
                    </Link>

                </li>
            </ul>
        </nav>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>



    </div>

)
const NavAuth = ({ authUser, type }) => (
    <div>

        {type == 2 ? <NavSuper /> : type == 0 ? <NavAdmin /> : <NavUser/>}

    </div>

)

export default Navbar;
