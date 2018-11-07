import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import './Homepages.css';

class UserHomepage extends Component {
    render() {
        return (
            <div>
                <Link to={routes.ADMINHOMEPAGE}>
                    <button className="btn btn-dark" id="User">Switch to admin</button>
                </Link>
                <Link to={routes.GUESTHOMEPAGE}>
                    <button className="btn btn-dark" id="User">Switch to guest</button>
                </Link>

                <div className="container">
                    <div className="box" id="projectStatus">
                        <h1 className="cardTitle">Estado de mis proyectos</h1>
                        <button className="btn btn-dark" id="porJoder">Botón por joder</button>

                    </div>
                    <div className="box" id="seatchProject">
                        <h1 className="cardTitle">Buscar más proyectos</h1>
                        <button className="btn btn-dark" id="porJoder">Botón por joder</button>
                    </div>
                    <div className="box" id="profile">
                        <h1 className="cardTitle">Perfil</h1>
                        <button className="btn btn-dark" id="porJoder">Botón por joder</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHomepage;
