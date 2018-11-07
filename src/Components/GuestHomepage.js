import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';

class GuestHomepage extends Component {


    render() {
        return (
            <div>
                <Link to={routes.USERHOMEPAGE}>
                    <button className="btn btn-dark" id="User">Switch to user</button>
                </Link>
                <Link to={routes.ADMINHOMEPAGE}>
                    <button className="btn btn-dark" id="Admin">Switch to admin</button>
                </Link>

                <div className="container">
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

export default GuestHomepage;
