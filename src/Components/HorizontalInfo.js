import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'
//import * as firebase from 'firebase';

import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import fire from "../Firebase/Fire"

import a from '../Images/1.jpg';
import b from '../Images/2.jpg';
import c from '../Images/3.jpg';
import d from '../Images/4.jpg';
//import fire from "../Firebase/Fire"

var db = fire.firestore();

var proyectos = [];
class Infocard extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.handleInfocard = this.handleInfocard.bind(this);
        this.readDB = this.readDB.bind(this);
        this.state = {
            foto: "",
            cultivos: [],
            invMin: null,
            empleoGen: null,
            nombre: null,
            location: null
        };
    }

    readDB(){
        var parent = document.getElementById("infocards");

        db.collection("projects").get().then(function(snap){
            snap.forEach(element => {
                var icard = document.createElement("div");
                icard.className = "icard-hor zoom";

                var cEvent = document.createElement("bt-event");
                cEvent.id = "bt-event"; 
                cEvent.onclick = () => {this.handleInfocard("TITLE")};

                var more = document.createElement("div");
                more.id = more;

                var imagePro = document.createElement("img");
                imagePro.id = "img-pro";
                imagePro.src = b;

                cEvent.appendChild(more);
                cEvent.appendChild(imagePro);

                icard.appendChild(cEvent);

                var box = document.createElement("div");
                box.id = "box-event";

                var projType = document.createElement("div");
                projType.id = "proj-type";
                
                var projName = document.createElement("div");
                projName.id = "proj-name";
                
                var projLocation = document.createElement("div");
                projLocation.id = "proj-location";
                
                var projGen = document.createElement("div");

                var projIcon1 = document.createElement("img");
                projIcon1.id = "proj-icon";
                projIcon1.src = workers;
                //projIcon1.setAttribute("src", workers);
                
                var projIcon2 = document.createElement("img");
                projIcon2.id = "proj-icon";
                projIcon2.src = hand;
                //projIcon2.setAttribute("src", hand);

                //Agregar los numeros
                projGen.appendChild(projIcon1);
                projGen.appendChild(projIcon2);

                box.appendChild(projType);
                box.appendChild(projName);
                box.appendChild(projLocation);
                box.appendChild(projGen);

                var projFooter = document.createElement("div");
                projFooter.id = "proj-footer";

                var button = document.createElement("button");
                button.id = "proj-cont";

                var image = document.createElement("img");
                //image.setAttribute("src", arrow);
                
                button.appendChild(image);
                projFooter.appendChild(button);

                icard.appendChild(box);
                icard.appendChild(projFooter);
                
                parent.appendChild(icard);


                console.log("leer: " + element.id, " => ", element.data());
            });
        });
    }

    componentDidMount(){
        this.readDB();
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
