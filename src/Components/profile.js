import React, { Component } from 'react';
import fire from '../Firebase/Fire';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import UserContext from './UserContext';
import InvestmentItem from './InvestmentItem';

import userP from '../Icons/user.svg'
import settings from '../Icons/settings.svg'
import linec from '../Icons/line-chart.svg'
import planning from '../Icons/planning.svg'
import cart from '../Icons/briefcase.svg'
import notificaciones from '../Icons/alarm.svg'
import news from '../Icons/worldwide.svg'
import email from '../Icons/mail.svg'
import terrenos from '../Icons/magnifier.svg'
import location from '../Icons/placeholder.svg'
import edit from '../Icons/tools.svg'
import './Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picProfile: "",
            name: "",
            lastName: "",
            email: "",
            region: "",
            phone: "",
            investments: [],

            showGeneral: true,
            showInversiones: false,
            showConfiguracion: false
        }
        this.handleGeneral = this.handleGeneral.bind(this);
        this.handleInversiones = this.handleInversiones.bind(this);
        this.handleConfiguracion = this.handleConfiguracion.bind(this);
        this.getInvestments = this.getInvestments.bind(this);
        this.handleSetModal = this.handleSetModal.bind(this);
    }


    componentWillMount() {
        /* let id;
         let usersRef = fire.firestore().collection("users").doc(this.props.uid);
                 console.log(usersRef)
                 let user;
                 usersRef.get().then(function (doc) {
                     if (doc.exists) {
                         console.log("Document data:", doc.data());
                         user = doc.data();
 
                         this.setState(
                             {
                                 //picProfile:user.picProfile,
                                 name: user.nombre,
                                 lastName: user.apellido,
                                 email: user.correo,
                                 region: user.region,
                                 phone: user.telefono
                             }
                         }).catch(function (error) {
                             console.log("Error getting document:", error);
                         });
         
                     }
                 });
         */

    }

    getInvestments() {
        //var projs = [];
        var projects = [];
        var result;

        fire.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const database = fire.firestore();
                const collection = database.collection('users').doc(user.uid).collection('investments');

                await collection.get().then(snapshot => {
                    //Encuentra la carreta del usuario en sesión y la asigna a variable projects

                    //if (snapshot.exists) {
                    snapshot.forEach(element => {
                        projects.push(element.data());
                    });

                    if (projects.length == 0) {
                        result = false;
                    }
                    //}
                    console.log(projects.length)

                    /*
                                        projects.forEach(element => {
                                            if (j < i) {
                                                projs.push(element);
                                                console.log(element);
                                            }
                                            j++;
                                        });
                    */
                });

            } else {
            }
            //console.log(this.state.investments);
            console.log(projects.length)
            this.setState({
                investments: projects,
            });
        });

    }

    handleGeneral() {
        this.setState({
            showGeneral: true,
            showInversiones: false,
            showConfiguracion: false
        });

    }

    handleInversiones() {
        this.getInvestments();
        this.setState({
            showInversiones: true,
            showGeneral: false,
            showConfiguracion: false
        });

    }

    handleConfiguracion() {
        this.setState({
            showConfiguracion: true,
            showGeneral: false,
            showInversiones: false
        });

    }

    handleSetModal(){

        



    }


    render() {
        console.log(this.props.name)

        let investitems = this.state.investments.map((doc) => {
            return (
                <InvestmentItem
                    title={doc.title}
                    ubicacion={doc.locate}
                    pago={doc.pago}
                    id={doc.id}

                />
            )
        });
        return (
            <UserContext.Consumer>
                {context => context.user ?
                    <div>
                        <div className="flexbox" id="navProfile-flex">

                            <div >
                                <img id="profile-imagen" src={require('./Archivo.jpg')} alt="Test" />
                            </div>

                            <div className="flexbox" id="flex-nombre">
                                <div id="profile-name" class="textD1">{context.nombre} {context.apellido}</div>
                            </div>

                            <ul class="nav flex-column" id="profile-nav">
                                <li class="nav-item flexbox" >
                                    <img className="nav-icon" src={userP}></img>
                                    <a class="nav-link" href="#" onClick={this.handleGeneral}> PERFIL</a>
                                </li>
                                <li class="nav-item flexbox">
                                    <img className="nav-icon" src={linec}></img> <a class="nav-link" href="#" onClick={this.handleInversiones}>INVERSIONES</a>
                                </li>
                                <li class="nav-item flexbox">
                                    <img className="nav-icon" src={settings}></img>  <a class="nav-link" href="#" onClick={this.handleConfiguracion}>CONFIGURACION</a>
                                </li>
                                <li class="nav-item flexbox">
                                    <img className="nav-icon" src={planning}></img> <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">CALENDARIO</a>
                                </li>
                            </ul>


                            <div className="flexbox" id="flex-verified">
                                <img id="profile-done" src={require('../Icons/verified.png')} />
                                <div id="profile-verified" class="textD1" >Perfil Verificado</div>
                            </div>
                        </div>

                        {this.state.showGeneral ?

                            <div className="flexbox" id="profile-flex">

                                <div className="flexbox" id="name-flex">
                                    <div className="textD1" id="name-text" >{context.nombre}</div>
                                    <div className="textD1">{context.apellido}</div>

                                </div>

                                <div className="flexbox" id="flexbox-infoG" >

                                    <div class="textD1"> <img className="nav-icon" src={email}></img> {context.correo}</div>

                                    <div class="textD1"><img className="nav-icon" src={location}></img> {context.region}</div>

                                </div>
                                <div className="flexbox" id="flex-four">

                                    <div className="flexbox item-sm" id="cartera">
                                        <Link to={routes.CART}>

                                            <img className="nav-icon" src={cart}></img>  <a className="textD2" >CARTERA</a>
                                        </Link>

                                    </div>
                                    <div className="flexbox item-lg" id="notificaciones">
                                        <Link to={routes.CART}>

                                            <img className="nav-icon" src={notificaciones}></img>  <a className="textD2" id="textNoti">NOTIFICACIONES</a>
                                        </Link>

                                    </div>

                                    <div className="flexbox item-lg" id="terrenos">
                                        <Link to={routes.PROYECTOS}>

                                            <img className="nav-icon" src={terrenos}></img>  <a className="textD2" id="textTerre">TERRENOS</a>
                                        </Link>

                                    </div>

                                    <div className="flexbox item-sm" id="noticias">
                                        <Link to={routes.PROYECTOS}>

                                            <img className="nav-icon" src={news}></img>  <a className="textD2" >NOTICIAS</a>
                                        </Link>

                                    </div>

                                </div>




                            </div>


                            : ''}

                        {this.state.showInversiones ?


                            <div id="invest-div" >

                                <div className="flexbox" id="invest-flex">
                                    <div>Nombre proyecto</div>
                                    <div>Ubicacion</div>
                                    <div>Inversion</div>
                                    <div>Fecha</div>
                                    <div>Ganancia</div>
                                </div>

                                {investitems}


                            </div>

                            : ''}

                        {this.state.showConfiguracion ?

                            <div>


                                <div className="flexbox" id="config-flex">

                                    <h2 id="config-title">Configuración general de la cuenta </h2>

                                    <div id="config-item">
                                        <div className="textD1">Nombre </div>
                                        <div id="info-item">{context.nombre}</div>
                                        <button id="edit-icon" onClick={this.handleSetModal}> <img id="e-icon" src={edit}></img> </button>
                                    </div>

                                    <div id="config-item">
                                        <div className="textD1">Apellido </div>
                                        <div id="info-item">{context.apellido}</div>
                                        <button id="edit-icon"> <img id="e-icon" src={edit}></img> </button>

                                    </div>
                                    <div id="config-item">
                                        <div className="textD1">Correo </div>
                                        <div id="info-item">{context.correo}</div>
                                        <button id="edit-icon"> <img id="e-icon" src={edit}></img> </button>

                                    </div>
                                    <div id="config-item">
                                        <div className="textD1">Telefono </div>
                                        <div id="info-item">{context.telefono}</div>
                                        <button id="edit-icon"> <img id="e-icon" src={edit}></img> </button>

                                    </div>
                                    <div id="config-item">

                                        <div className="textD1"> Region </div>
                                        <div id="info-item">{context.region}</div>
                                        <button id="edit-icon"> <img id="e-icon" src={edit}></img> </button>

                                    </div>

                                </div>

                            </div>

                            : ''}

                    </div> : <p>no hay usuario</p>}

            </UserContext.Consumer>




        )
    }

}
export default Profile;