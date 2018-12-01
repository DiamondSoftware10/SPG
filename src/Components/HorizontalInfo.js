import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'

import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import loc from '../Icons/placeholder.svg';
import arrow from '../Icons/arrow.svg';

import a from '../Images/1.jpg';
import b from '../Images/2.jpg';
import c from '../Images/3.jpg';
import d from '../Images/4.jpg';


class Infocard extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.handleInfocard = this.handleInfocard.bind(this);

        this.state = {
            foto: "",
            cultivos: [],
            invMin: "$20",
            empleoGen: "23",
            nombre: "Terreno San Lorenzo",
            location: "San Lorenzo"
        };
    }

    handleInfocard(title) {

        /*
        var project = queryIdProject("Guanaja");
        console.log("MMM")
        console.log(project.projectFinan);
        console.log(project.locate);
*/
        //const listItems = listUsers().map((user) =>  <li>{user}</li>
        //);
    }

    render() {
        return (
            <div id="infocards">
                <div className="icard-hor ">
                    <div id="bt-event" onClick={this.handleInfocard("Guanaja")}>
                        <div id="bt-more"></div>

                        <img id="img-pro" src="https://bit.ly/2Dpx93w"></img>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Terreno</div>
                        <div id="proj-name">{this.state.nombre}</div>
                        <div id="proj-location">
                            <img id="proj-icon" src={loc}></img>
                            <div>{this.state.location}</div>
                        </div>
                        {/*
                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">{this.state.empleoGen}</div>

                             
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">{this.state.invMin}</div>
                        </div>
                        */}

                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">{this.state.empleoGen} empleos</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">{this.state.invMin}  </div>
                        </div>
                        <div id="proj-footer">

                            <button id="proj-cont"><img src={arrow}></img></button>
                        </div>

                    </div>
                </div>
                <div className="icard-hor zoom">
                    <div id="bt-event" onClick={this.handleInfocard("Guanaja")}>
                        <div id="bt-more"></div>

                        <img id="img-pro" src={b}></img>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Terreno</div>
                        <div id="proj-name"> Terreno Comayagua</div>
                        <div id="proj-location">Comayagua</div>
                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">40</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">505</div>
                        </div>
                        <div id="proj-footer">
                            <button id="proj-cont"><img src={arrow}></img></button>
                        </div>

                    </div>

                </div>
                <div className="icard-hor zoom">
                    <div id="bt-event" onClick={this.handleInfocard("Guanaja")}>
                        <div id="bt-more"></div>

                        <img id="img-pro" src={c}></img>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Cultivo</div>
                        <div id="proj-name">Cultivo Sandías</div>
                        <div id="proj-location">Valle de Jamastrán</div>
                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">100</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">700</div>
                        </div>
                        <div id="proj-footer">
                            <button id="proj-cont"><img src={arrow}></img></button>
                        </div>
                    </div>

                </div>
                <div className="icard-hor zoom">
                    <div id="bt-event" onClick={this.handleInfocard("Guanaja")}>
                        <img id="img-pro" src={d}></img>
                        <div id="bt-more"></div>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Cultivo</div>
                        <div id="proj-name">Cultivo de Cacao</div>
                        <div id="proj-location">La Ceiba</div>
                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">300</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">800</div>
                        </div>
                        <div id="proj-footer">
                            <button id="proj-cont"><img src={arrow}></img></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Infocard;
