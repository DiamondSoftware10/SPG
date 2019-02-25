import React, { Component } from 'react'

import './Landing.css';

import icon from '../Icons/iconbeta.png';
import planting from '../Icons/planting.svg';
import connection from '../Icons/connection.svg';
import development from '../Icons/development.svg';


export default class Landing extends Component {
    render() {
        return (
            <div id="landing">

                <div class="jumbotron">
                    <div>
                        <img id="logo-land" src={icon} width="30" height="30"></img>
                        <h1 id="SPG" class="display-4">Sprouting Productive Gear</h1>
                    </div>


                    <p class="lead">Impulsa la producción agrícola de Honduras e
                    invierte en un proyecto</p>
                    {/** 
                    <hr class="my-4"></hr>
                    <p>Intermediario entre inversionistas y prestatarios para impulsar la producción agrícola en Honduras, velando por el beneficio de ambas partes.</p>
                    <p class="lead">
                        <a class="btn btn-primary btn-lg" style={{border:"none"}} href="#" role="button">Ver mas</a>
                    </p>
                    */}
                </div>

                <div id="b-block" className="block-full">
                    <div className="block-flex">
                        <div>
                            <h1>Proyectos</h1>
                        </div>
                        <div>
                            <p class="lead">Sprouting Productive Gear es una empresa dedicada al rubro de la agricultura especializándose en el estudio y análisis de suelos, para clasificar propiedades en un área determinada y geocodificar dicha información. </p>
                        </div>
                    </div>
                </div>

                <div className="block-div">
                    <div id="c-block" className="block-half">
                        <h1>Información</h1>
                        <p>La plataforma brindará información relevante sobre
                            los cultivos como los requerimientos edafoclimáticos
                            (clima, terreno), tratamiento de la semilla y la siembra
                            </p>
                    </div>
                    <div id="d-block" className="block-half">
                    </div>
                </div>

                <div id="e-block" className="block-full">
                    <div className="block-flex">
                        <div className="block-segment">
                            <img className="block-icon" src={planting}></img>
                            <h2>Contribuye</h2>
                            <h3>al desarrollo del sector agricola</h3>
                        </div>
                        <div className="block-segment">
                            <img className="block-icon" src={connection}></img>
                            <h2>Conecta</h2>
                            <h3>inversionistas con agricultores</h3>
                        </div>
                        <div className="block-segment">
                            <img className="block-icon" src={development}></img>
                            <h2>Crece</h2>
                            <h3>adquiere capital y ayuda a tu país</h3>
                        </div>
                    </div>
                </div>

                <div id="f-block" className="block-full">
                        <img src={icon} width="30" height="30"></img>
                        <div id="f-brand">SPG</div>
                        
                </div>

            </div>

        )
    }
}
