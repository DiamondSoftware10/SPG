import React, { Component } from 'react';
import fire from '../Firebase/Fire';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Navbar.css';
import magnifier from '../Icons/magnifier.svg';

class Searchbar extends Component {
    constructor(props) {
        super(props);


    }



    render() {

        return (
            <form className="form-inline my-2 my-lg-0 input-search">
                <input id="main-search" className="form-control mr-sm-2" type="search" placeholder="Busqueda" aria-label="Busqueda" />
                <Link to={routes.PROYECTOS}>
                    <img id="main-search-icon" src={magnifier}></img>
                </Link>
                <button id="btn-search" className="btn btn-outline-success my-2 my-sm-0" type="submit">Búsqueda</button>
            </form>
        )
    }

}
export default Searchbar;