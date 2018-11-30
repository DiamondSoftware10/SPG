import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'

import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import loc from '../Icons/placeholder.svg';
import arrow from '../Icons/arrow.svg';


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
        var project = queryIdProject("Guanaja");
        console.log("MMM")
        console.log(project.projectFinan);
        console.log(project.locate);

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
            </div>
        );
    }
}

export default Infocard;
