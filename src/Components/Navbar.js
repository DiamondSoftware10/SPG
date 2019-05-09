import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import * as routes from "../Constants/Routes";
import "./Navbar.css";
import magnifier from "../Icons/magnifier.svg";
import icon from "../Icons/iconbeta.png";
import cart from "../Icons/cart.svg";
import briefcase from "../Icons/briefcase.svg";
import profile from "../Icons/profile.svg";
import UserContext from "./UserContext";
import Searchbar from "./Searchbar";
import { doSignOut } from "../Firebase/Fire";
import fire from "../Firebase/Fire";

function logout() {
  fire.auth().signOut();
}

const Navbar = () => (
  <div className=" sticky-top ">
    <UserContext.Consumer>
      {context =>
        context.user ? <NavAuth type={context.type} /> : <NavNonAuth />
      }
    </UserContext.Consumer>
  </div>
);

const NavNonAuth = () => (
  <div id="navbar2">
    <nav className="navbar navbar-expand-lg navbar-light blurry">
      <Link to={routes.LANDING}>
        <span className="navbar-brand">
          <img src={icon} width="30" height="30" />
          SPG
        </span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Searchbar option={"title"} />
        <ul className="navbar-nav mr-auto ">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to={routes.LANDING}>
              <span className="nav-link">Inicio</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROYECTOS}>
              <span className="nav-link">Explorar</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROJECTSMAP}>
              <span className="nav-link">Acerca</span>
            </NavLink>
          </li>
        </ul>

        <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
          <li className="nav-item">
            <Link to={routes.LOGINPAGE}>
              <button className="btn-tertiary">LOG IN</button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

const NavAdmin = () => (
  <div id="navbar2">
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link to={routes.LANDING}>
        <span className="navbar-brand">
          <img src={icon} width="30" height="30" />
          SPG
        </span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Searchbar option={"title"} />
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to={routes.LANDING}>
              <span className="nav-link">Inicio</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROYECTOS}>
              <span className="nav-link">Explorar</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROJECTSMAP}>
              <span className="nav-link">Acerca</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Gestionar
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to={routes.NEWPROJECT}>
                <span className="dropdown-item" href="#">
                  Nuevo Proyecto
                </span>
              </Link>
              <Link to={routes.MANAGEPROJECTS}>
                <span className="dropdown-item" href="#">
                  Editar Proyectos
                </span>
              </Link>
            </div>
          </li>
        </ul>

        <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
          <li className="nav-item">
            <Link to={routes.CART}>
              <img id="nav-icon" src={briefcase} />
            </Link>
          </li>
          <li className="nav-item dropdown ">
            <span
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img id="nav-icon" src={profile} />
            </span>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <UserContext.Consumer>
                {context =>
                  context.user ? (
                    <Link to={routes.PROFILE}>
                      <span className="dropdown-item" href="#">
                        {context.nombre}
                      </span>
                    </Link>
                  ) : (
                    ""
                  )
                }
              </UserContext.Consumer>
              <Link to={routes.MANAGEPROJECTS}>
                <span className="dropdown-item" href="#">
                  Mis Inversiones
                </span>
              </Link>
              <div className="dropdown-divider" />
              <Link to={routes.LANDING} onClick={doSignOut}>
                <span className="dropdown-item">Log out</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
const NavUser = () => (
  <div id="navbar2">
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link to={routes.LANDING}>
        <p className="navbar-brand">
          <img src={icon} width="30" height="30" />
          SPG
        </p>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Searchbar option={"title"} />
        <ul className="navbar-nav mr-auto ">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to={routes.LANDING}>
              <span className="nav-link">Inicio</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROYECTOS}>
              <span className="nav-link">Explorar</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROJECTSMAP}>
              <span className="nav-link">Acerca</span>
            </NavLink>
          </li>

          {/*
                            <li className="nav-item">
                                <span className="nav-link disabled" >Disabled</span>
                            </li>
                            */}
        </ul>
        <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
          <li className="nav-item">
            <Link to={routes.CART}>
              <img id="nav-icon" src={briefcase} />
            </Link>
          </li>
          <li className="nav-item dropdown ">
            <span
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img id="nav-icon" src={profile} />
            </span>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <UserContext.Consumer>
                {context =>
                  context.user ? (
                    <Link to={routes.PROFILE}>
                      <span className="dropdown-item" href="#">
                        {context.nombre}
                      </span>
                    </Link>
                  ) : (
                    ""
                  )
                }
              </UserContext.Consumer>
              <Link to={routes.MANAGEPROJECTS}>
                <span className="dropdown-item" href="#">
                  Mis Inversiones
                </span>
              </Link>
              <div className="dropdown-divider" />
              <Link to={routes.LANDING} onClick={doSignOut}>
                <span className="dropdown-item">Log out</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

const NavSuper = () => (
  <div id="navbar2">
    <nav className="navbar navbar-expand-lg navbar-light ">
      <Link to={routes.LANDING}>
        <span className="navbar-brand">
          <img src={icon} width="30" height="30" />
          SPG
        </span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <Searchbar />
        <ul className="navbar-nav mr-auto ">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to={routes.LANDING}>
              <span className="nav-link">Inicio</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROYECTOS}>
              <span className="nav-link">Explorar</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.PROJECTSMAP}>
              <span className="nav-link">Acerca</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Gestor
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <NavLink activeClassName="active" to={routes.NEWPROJECT}>
                <span className="dropdown-item" href="#">
                  Nuevo Proyecto
                </span>
              </NavLink>
              <Link to={routes.CREATEUSERADMIN}>
                <span className="dropdown-item" href="#">
                  Crear Gestor de Proyectos
                </span>
              </Link>
              <Link to={routes.MANAGEPROJECTS}>
                <span className="dropdown-item" href="#">
                  Editar Proyectos
                </span>
              </Link>
              <Link to={routes.MANAGEUSERS}>
                <span className="dropdown-item" href="#">
                  Editar Gestores
                </span>
              </Link>
            </div>
          </li>
          {/*}
                    <li className="nav-item">
                        <Link to={routes.CREATEUSERADMIN}>
                            <span className="nav-link">Admin</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.MANAGEPROJECTS}>
                            <span className="nav-link">Editar Proyectos</span>
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={routes.MANAGEUSERS}>

                            <span className="nav-link" >Editar Admins <span className="sr-only">(current)</span></span>
                        </Link>
                    </li>
*/}
        </ul>
        <ul className="navbar-nav flex-row justify-content-md-center justify-content-start flex-nowr ">
          <li className="nav-item">
            <Link to={routes.CART}>
              <img id="nav-icon" src={briefcase} />
            </Link>
          </li>
          <li className="nav-item dropdown ">
            <span
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img id="nav-icon" src={profile} />
            </span>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <UserContext.Consumer>
                {context =>
                  context.user ? (
                    <Link to={routes.PROFILE}>
                      <span className="dropdown-item" href="#">
                        {context.nombre}
                      </span>
                    </Link>
                  ) : (
                    ""
                  )
                }
              </UserContext.Consumer>
              <Link to={routes.MANAGEPROJECTS}>
                <span className="dropdown-item" href="#">
                  Mis Inversiones
                </span>
              </Link>
              <div className="dropdown-divider" />
              <Link to={routes.LANDING} onClick={doSignOut}>
                <span className="dropdown-item">Log out</span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
const NavAuth = ({ type }) => (
  <div>{type == 2 ? <NavSuper /> : type == 0 ? <NavAdmin /> : <NavUser />}</div>
);

export default Navbar;
