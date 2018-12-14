import React, { Component } from 'react'
import Infocard from '../Components/Infocard'
import HorizontalInfo from '../Components/HorizontalInfo'

import './Landing.css';

import icon from '../Icons/iconbeta.png';


export default class Landing extends Component {
    render() {
        return (
            <div id="landing">
                
                <div class="jumbotron">
                    <img id="logo-land" src={icon} width="30" height="30"></img>
                    <h1 id="SPG" class="display-4">Sprouting Productive Gear</h1>
                    <p class="lead">Sprouting Productive Gear es una empresa dedicada al rubro de la agricultura especializándose en el estudio y análisis de suelos, para clasificar propiedades en un área determinada y geocodificar dicha información. </p>
                    <hr class="my-4"></hr>
                
                    <p>Intermediario entre inversionistas y prestatarios para impulsar la producción agrícola en Honduras, velando por el beneficio de ambas partes.</p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" style={{border:"none"}} href="#" role="button">Ver mas</a>
                    </p>
                </div>
            </div>

        )
    }
}
