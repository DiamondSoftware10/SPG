import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
//import './Homepages.css';

class AdminHomepage extends Component {


    render() {
        return (
            <div>
                <Link to={routes.USERHOMEPAGE}>
                    <button className="btn btn-dark" id="User">Switch to user</button>
                </Link>
                <Link to={routes.GUESTHOMEPAGE}>
                    <button className="btn btn-dark" id="User">Switch to guest</button>
                </Link>

                <div className="container">
                    <div className="box" id="addTerrain">
                        <h1 className="cardTitle">Agregar terreno</h1>
                        <button className="btn btn-dark" id="porJoder">Botón por joder</button>

                    </div>
                    <div className="box" id="projectInfo">
                        <h1 className="cardTitle">Información sobre proyectos</h1>
                        <button className="btn btn-dark" id="porJoder">Botón por joder</button>

                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHomepage;
