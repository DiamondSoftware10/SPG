import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import ReactModal from 'react-modal';


import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import loc from '../Icons/placeholder.svg';
import arrow from '../Icons/arrow.svg';

import fire from "../Firebase/Fire"

import a from '../Images/1.jpg';
import b from '../Images/2.jpg';
import c from '../Images/3.jpg';
import d from '../Images/4.jpg';

import MapContainer from "./GoogleMapsContainer";

var db = fire.firestore();



class Infocard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            foto: "",
            cultivos: [],
            invMin: "$20",
            empleoGen: "23",
            nombre: "Terreno San Lorenzo",
            location: "San Lorenzo",
            currentLat: 0,
            currentLong: 0,
            showModal: false,
            title: "",
            culture: "",
            description: "",
            infoZone: "",
            investor: "",
            projFinan: "",
            raisedMoney: "",
        };

        this.handleInfocard = this.handleInfocard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.recenter = this.recenter.bind(this);
        this.handleInfocard = this.handleInfocard.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.readDB = this.readDB.bind(this);
    }

    //No captura el ID mandado con props desde proyecto.js
    componentDidMount() {
        console.log("Este es");
        this.setState({
            id: this.props.id,
        })
        console.log(this.props.id);
    }

    handleInfocard(title) {
        console.log("handle card");

        /*
        var project = queryIdProject("Guanaja");
        console.log("MMM")
        console.log(project.projectFinan);
        console.log(project.locate);
*/
        //const listItems = listUsers().map((user) =>  <li>{user}</li>
        //);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };

    changeLocation(lat, long) {
        console.log("lat: " + lat + ", long: " + long)
        this.setState({
            currentLat: lat,
            currentLong: long
        })

    }

    recenter() {
        this.setState({
            currentLat: this.props.lat,
            currentLong: this.props.long
        })
    }


    handleOpenModal() {
        this.setState({
            showModal: true,
            id: this.props.id,
        });
        console.log("Modal");
        console.log(this.props.id);
        this.readDB();
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    async readDB() {
        
        await this.setState({
            id: this.props.id,
        })
        console.log("ID " + this.state.id);
        var id = this.state.id;

        var title = "";
        var culture;
        var description;
        var infoZone;
        var investor;
        var projFinan;
        var raisedMoney;

        //Capturar el proyecto correspondiente de la base de datos
        var project = db.collection("projects").doc(/*MODIFICAR-----------------*/id/*---------------------MPODIFICAR*/);

        await project.get().then(function (snap) {
            if (snap.exists) {
                title = snap.data().title;
                culture = snap.data().cultures; 
                description = snap.data().description; 
                infoZone = snap.data().infoZone; 
                investor = snap.data().investor; 
                projFinan = snap.data().projectFinan; 
                raisedMoney = snap.data().raisedMoney; 
                console.log("Doc exists");
                console.log("Title " + title);
            } else {
                console.log("No such doc")
            }

        });


        this.setState({
            title: title,
            culture: culture,
            description: description,
            infoZone: infoZone, 
            investor: investor, 
            projFinan: projFinan, 
            raisedMoney: raisedMoney,
        });


    }

    render() {

        return (
            <div id="infocards">
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <div id="heading-modal">
                        <button className="hollow button" id="close-button" onClick={this.handleCloseModal}><span uk-icon="close"></span>Close</button>
                        <div id="modal-detail">
                            <h1>{this.state.title}</h1>
                            <h2>Cultivos: {this.state.culture}</h2>
                            <br></br>
                            <h2>Descripción: </h2>
                            <p>{this.state.description}</p>
                            <br></br>
                            <h2>Información de zona:</h2>
                            <p>{this.state.infoZone}</p>
                            <br></br>
                            <h2>Inversionista: </h2>
                            <h3>{this.state.investor}</h3>
                            <br></br>
                            <h2>Financiamiento del proyecto</h2>
                            <h3>{this.state.projFinan}</h3>
                            <br></br>
                            <h2>Dinero recaudado</h2>
                            <h3>{this.state.raisedMoney}</h3>

                        </div>

                    </div>
                </ReactModal>
                <div className="icard-hor ">
                    <div id="bt-event" onClick={() => this.handleInfocard("Guanaja")}>
                        <div id="bt-more"></div>

                        <img id="img-pro" onClick={this.handleOpenModal} src="https://bit.ly/2Dpx93w"></img>
                    </div>
                    <div id="box-event">
                        <div id="proj-type">Terreno</div>
                        <div id="proj-name">{this.props.title}</div>
                        <div id="proj-location">
                            <img id="proj-icon" src={loc}></img>
                            <div onClick={() => this.props.changeLocation(this.props.center)} data-toggle="modal" data-target="#mapModal" data-backdrop="false">
                                {this.props.location}
                            </div>
                        </div>

                        <div id="proj-gen">
                            <img id="proj-icon" src={workers}></img>
                            <div id="num">{this.props.jobs} empleos</div>
                            <img id="proj-icon" src={hand}></img>
                            <div id="num">{this.props.money}  </div>
                        </div>
                        <div id="proj-footer">

                            <button id="proj-cont"><img src={arrow}></img></button>
                        </div>

                    </div>
                </div>
            </div >
        );
    }
}

export default Infocard;
