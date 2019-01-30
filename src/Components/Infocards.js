import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'
import './Proyectos.css'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import ReactModal from 'react-modal';

import "circular-std";
import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import loc from '../Icons/placeholder.svg';
import arrow from '../Icons/arrow.svg';
import close from '../Icons/close.svg'
import add from '../Icons/add.svg';
import sub from '../Icons/subtract.svg';

import fire from "../Firebase/Fire"
import * as firebase from 'firebase';


import a from '../Images/1.jpg';
import b from '../Images/2.jpg';
import c from '../Images/3.jpg';
import d from '../Images/4.jpg';

import MapContainer from "./GoogleMapsContainer";
import { timingSafeEqual } from 'crypto';

var db = fire.firestore();



class Infocard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            foto: "",
            cultivos: [],
            invMin: 123.5,
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

            pago: 123.5,
            showInvest: false,
            manzanas: 1
        };

        this.handleInfocard = this.handleInfocard.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.recenter = this.recenter.bind(this);
        this.handleInfocard = this.handleInfocard.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.readDB = this.readDB.bind(this);


        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleOpenInvestModal = this.handleOpenInvestModal.bind(this);
        this.handleCloseInvestModal = this.handleCloseInvestModal.bind(this);
        this.handleAddManzana = this.handleAddManzana.bind(this);
        this.handleSubManzana = this.handleSubManzana.bind(this);
    }
    async componentWillMount() {
        await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url => {
            this.setState({
                foto: url
            })
        })
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

    handleOpenInvestModal() {
        this.setState({
            showInvest: true
        })
    }

    handleCloseInvestModal() {
        this.setState({
            showInvest: false
        })
    }

    handleAddToCart() {

        var id = this.props.id;
        var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
        var d = new Date();
        var n = d.toLocaleDateString;
        var man = this.state.manzanas;

        fire.auth().onAuthStateChanged(function (user) {

            if (user) {
                const database = fire.firestore();

                var docData = {
                    id: id,
                    inversion: 5.99,
                    fecha: utc,
                    manzanas: man
                };
                const collection = database.collection('users').doc(user.uid).collection('cartera').doc(id);

                const collProject = database.collection('projects').doc(id);

                collProject.get().then(snapshot => {
                    console.log("hey");
                    console.log(snapshot.data().title)
                    var docFinal = Object.assign(docData, snapshot.data());
                    collection.set(docFinal);
                })

            } else {
            }
        });
    }

    handleAddManzana() {
        this.setState({
            manzanas: this.state.manzanas + 1
        })
        console.log(this.state.manzanas);
        var man = this.state.manzanas;
        this.setState({
            pago: man * this.state.invMin
        })
    }

    handleSubManzana() {
        if (this.state.manzanas > 1) {
            this.setState({
                manzanas: this.state.manzanas - 1
            })
        }
        var man = this.state.manzanas;
        this.setState({
            pago: man * this.state.invMin
        })
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
        const style = {
            /*width: '50vw',
            height: '75vh',*/
            width: '45vw',
            height: '40vh',
            'marginLeft': '0',
            'marginRight': '0',

        }

        return (
            <div >
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="ModalBack"
                    overlayClassName="Overlay"
                >
                    <div className="Modal">
                        <div id="heading-modal">
                            <button className="hollow button" id="close-button" onClick={this.handleCloseModal}><img id="proj-icon" src={close}></img></button>
                            <div id="modal-detail">
                                <div className="card">
                                    <div className="row">
                                        {/*
                                    <div className="col-md-6">
                                        <div className="card-block">
                                            <h1>{this.state.title}</h1>
                                            <h2>Cultivos: {this.state.culture}</h2>
                                            <br></br>
                                            <h2>Descripción: </h2>
                                            <p>{this.state.description}</p>
                                            <br></br>
                                            <h2>Información de zona:</h2>
                                            <p>{this.state.infoZone}</p>
                                            <br></br>
                                            <h2>Inversionista </h2>
                                            <h3>{this.state.investor}</h3>
                                            <br></br>
                                            <h2>Financiamiento del proyecto</h2>
                                            <h3>{this.state.projFinan}</h3>
                                            <br></br>
                                            <h2>Dinero recaudado</h2>
                                            <h3>{this.state.raisedMoney}</h3>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <MapContainer style={style} center={{
                                            lat: this.props.center.lat,
                                            lng: this.props.center.lng
                                        }} />

                                    </div>
                                    */}

                                        <div id="modal-flex">

                                            <div id="main-flex">
                                                <div id="img-div">
                                                    <img id="modal-img" onClick={this.handleOpenModal} src={this.state.foto}></img>
                                                </div>
                                                <div>
                                                    <div id="terr-head">Terreno</div>
                                                </div>
                                                <div id="proj-title">
                                                    <h1>{this.state.title}</h1>
                                                </div>
                                                <br></br>

                                                <div id="proj-location">
                                                    <img id="proj-icon" src={loc}></img>
                                                    <div onClick={() => this.props.changeLocation(this.props.center)} data-toggle="modal" data-target="#mapModal" data-backdrop="false">
                                                        {this.props.location}
                                                    </div>
                                                </div>
                                                <br></br>

                                                <br></br>

                                                <h5>Descripción </h5>
                                                <p>{this.state.description}</p>
                                                <br></br>

                                                <h5>Información de la Zona </h5>
                                                <p>{this.state.infoZone}</p>
                                                <br></br>

                                                <h5>Ubicación</h5>
                                                <div style={style} className="card" id="modal-map">
                                                    <MapContainer center={{
                                                        lat: this.props.center.lat,
                                                        lng: this.props.center.lng
                                                    }} />
                                                </div>
                                                <br></br>

                                            </div>

                                            <div id="side-flex">
                                                <div id="sidebar">
                                                    <div>
                                                        <h6>Inversionista </h6>
                                                        <h3>{this.state.investor}</h3>
                                                    </div>
                                                    <div>

                                                        <h6>Financiamiento del proyecto</h6>
                                                        <h3>${this.state.projFinan}</h3>
                                                    </div>
                                                    <div>
                                                        <h6>Dinero recaudado</h6>
                                                        <h3>${this.state.raisedMoney}</h3>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-primary" id="btn-add-cart" onClick={() => this.handleOpenInvestModal()}>Invertir</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactModal>

                <ReactModal
                    isOpen={this.state.showInvest}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="ModalBack"
                    overlayClassName="Overlay"
                >
                    <div className="Modal invest-modal">
                        <button className="hollow button" id="close-button" onClick={this.handleCloseInvestModal}><img id="proj-icon" src={close}></img></button>



                        <div id="precart-flex">
                            
                            <div id="number-flex">
                            <div>Cantidad de manzanas</div>
                                <div><img onClick={this.handleSubManzana} id="add-icon" src={sub}></img></div>
                                <div id="man-num">{this.state.manzanas}</div>
                                <div><img onClick={this.handleAddManzana} id="add-icon" src={add}></img></div>
                            </div>
                            <div id="total-flex">
                            <div>Total:</div>
                                <div id="total-num">${this.state.pago}</div>
                            </div>
                            <button className="btn btn-primary" id="btn-add-cart" onClick={() => this.handleAddToCart()}>Agregar a cartera</button>

                        </div>
                    </div>







                </ReactModal>
                <div id="infocards">
                    <div className="icard-hor">
                        <div id="bt-event" onClick={() => this.handleInfocard("Guanaja")}>
                            <div id="bt-more"></div>

                            <img id="img-pro" onClick={this.handleOpenModal} src={this.state.foto}></img>
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
            </div>
        );
    }
}

export default Infocard;
