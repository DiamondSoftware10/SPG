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
                
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </p>
                </div>
            </div>

        )
    }
}
