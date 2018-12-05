import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'

import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import fire from "../Firebase/Fire"

//Constantes
const db = fire.firestore();

const projectRef = db.collection('projects');

var proyectos = [];
class Infocard extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.handleProjects = this.handleProjects.bind(this);
        this.state = {
            foto: "",
            cultivos: [],
            invMin: null,
            empleoGen: null,
            nombre: null,
            location: null
        };
    }

    handleProjects() {
        fire.auth().onAuthStateChanged(function (user) {
            if (user) {
                projectRef.get().then((querySnapshot) => {
                    
                    querySnapshot.forEach((doc) => {
                        this.setState(()=>({nombre: doc.data().title}))


                    });
                   // console.log("wtf");
                    //console.log(proyectos.length);
                //console.log("hola");
                //var half = Math.ceil(proyectos.length/2);
                //console.log(half);
                //var data;
                /*for(var i=0; i < half; i++){
                    //data.push(proyectos.get(i));
                    //console.log(proyectos[i].title);
                   /* var type = document.createTextNode("Terreno");
                    var box = document.createElement("div");
                    box.setAttribute("id","box-event");
                    box.id = "box-event";
                    var projT = document.createElement("div");
                    projT.setAttribute("id","proj-type");
                    projT.id = "proj-type";
                    var projN = document.createElement("div");
                    projN.setAttribute("id","proj-name");
                    projN.id = "proj-name";
                    var name = document.createTextNode(proyectos.get(i).title);
                    projN.appendChild(name);
                    var projL = document.createElement("div");
                    projL.setAttribute("id","proj-location");
                    projL.id = "proj-location";
                    var projG = document.createElement("div");
                    projG.setAttribute("id","proj-gen")
                    projG.id = "proj-gen";

                    projT.appendChild(type);
                    box.appendChild(projT);
                    box.appendChild(projN);
                    box.appendChild(projL);
                    box.appendChild(projG);

                    document.getElementById("infocards").appendChild(box);
                }*/
                
                //console.log(data);
                });
            }
        })
        
    }

    componentDidMount() {
        this.handleProjects();
        //console.log("Estp es una mierda: " + proyectos.length);
    }
    render() {
        return (
            <div id="infocards"  >
                <div className="icard-hor zoom" id="main">
                    <div id="bt-event">
                        <img id="img-pro" src="https://bit.ly/2Dpx93w"></img>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Terreno</div>
                        <div id="proj-name"></div>
                        <div id="proj-location">{this.state.location}</div>
                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">{this.state.empleoGen}</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">{this.state.invMin}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Infocard;
