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
import close from '../Icons/close.svg'
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

        this.handleSetName = this.handleSetName.bind(this);
        this.handleSetlastName = this.handleSetlastName.bind(this);
        this.handleSetCorreo = this.handleSetCorreo.bind(this);
        this.handleSetTelefono = this.handleSetTelefono.bind(this);
        this.handleSetRegion = this.handleSetRegion.bind(this);

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

    handleGeneral(e) {
        this.setState({ 
            showInversiones: false,
            showGeneral: true,
            showConfiguracion: false
         })
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

    async handleSetName(id, field) {
        let newValue;
        const ref = fire.firestore().collection('users').doc(id);

        if (field == "nombre" && this.state.name != "") {
            newValue = this.state.name;
            await ref.update({ "nombre": newValue });

        }


    }

    async handleSetlastName(id, field) {
        let newValue;
        const ref = fire.firestore().collection('users').doc(id);

        if (field == "apellido" && this.state.lastName != "") {
            newValue = this.state.lastName;
            await ref.update({ "apellido": newValue });

        }


    }

    async handleSetCorreo(id, field) {
        let newValue;
        const ref = fire.firestore().collection('users').doc(id);

        if (field == "correo" && this.state.email != "") {
            newValue = this.state.email;
            await ref.update({ "correo": newValue });

        }

    }

    async handleSetTelefono(id, field) {

        let newValue;
        const ref = fire.firestore().collection('users').doc(id);

        if (field == "telefono" && this.state.phone != "") {
            newValue = this.state.phone;
            await ref.update({ "telefono": newValue });

        }


    }

    async handleSetRegion(id, field) {

        let newValue;
        const ref = fire.firestore().collection('users').doc(id);

        if (field == "region" && this.state.region != "") {
            newValue = this.state.region;
            await ref.update({ "region": newValue });

        }


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

                                    <div className="flexbox item-sm" id="cartera" >
                                        <Link to={routes.CART}>

                                            {/*<img className="nav-icon" id="iconN" src={cart}></img>*/}  <a className="textD2" id="textNav">CARTERA</a>
                                        </Link>

                                    </div>
                                    <div className="flexbox item-lg" id="notificaciones">
                                        <Link to={routes.CART}>

                                            {/*<img className="nav-icon" id="iconN" src={notificaciones}></img>*/}  <a className="textD2" id="textNav">NOTIFICACIONES</a>
                                        </Link>

                                    </div>

                                    <div className="flexbox item-lg" id="terrenos" >
                                        <Link to={routes.PROYECTOS}>

                                            {/*<img className="nav-icon" id="iconN" src={terrenos}></img>*/}  <a className="textD2" id="textNav">TERRENOS</a>
                                        </Link>

                                    </div>

                                    <div className="flexbox item-sm" id="noticias">
                                        <Link to={routes.PROYECTOS}>

                                            {/*<img className="nav-icon" id="iconN" src={news}></img>*/}  <a className="textD2" id="textNav">NOTICIAS</a>
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
                                        <button id="edit-icon" data-target="#ModalNombre" data-toggle="modal"> <img id="e-icon" src={edit}></img></button>

                                        {/*MODAL*/}

                                        <div class="modal" id="ModalNombre" role="dialog">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header" id="modal-head">

                                                        <h4> Modificar nombre</h4>
                                                        <button id="close-mod" data-dismiss="modal"><img id="proj-icon" src={close}></img></button>

                                                    </div>


                                                    <div class="modal-body">
                                                        <input type="text" name="input" class="form-control" placeholder={context.nombre} required=""
                                                            onChange={(evt) => { this.setState({ name: evt.target.value }) }} ></input>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button class="btn btn-primary" data-dismiss="modal" onClick={()=>context.toggleName(this.state.name)} >Guardar</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        {/*finModal*/}


                                    </div>

                                    <div id="config-item">
                                        <div className="textD1">Apellido </div>
                                        <div id="info-item">{context.apellido}</div>

                                        <button id="edit-icon" data-target="#ModalApellido" data-toggle="modal"> <img id="e-icon" src={edit}></img></button>

                                        {/*MODAL*/}

                                        <div class="modal" id="ModalApellido" role="dialog">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header" id="modal-head">
                                                        <h4> Modificar apellido</h4>
                                                        <button id="close-mod" data-dismiss="modal"><img id="proj-icon" src={close}></img></button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <input type="text" name="input" class="form-control" placeholder={context.apellido} required=""
                                                            onChange={(evt) => { this.setState({ lastName: evt.target.value }) }} ></input>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button class="btn btn-primary" data-dismiss="modal" onClick={()=>context.toggleLastname(this.state.lastName)} >Guardar</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        {/*finModal*/}


                                    </div>
                                    <div id="config-item">
                                        <div className="textD1">Correo </div>
                                        <div id="info-item">{context.correo}</div>

                                        <button id="edit-icon" data-target="#ModalCorreo" data-toggle="modal"> <img id="e-icon" src={edit}></img></button>

                                        {/*MODAL*/}

                                        <div class="modal" id="ModalCorreo" role="dialog">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header" id="modal-head">
                                                        <h4> Modificar correo</h4>
                                                        <button id="close-mod" data-dismiss="modal"><img id="proj-icon" src={close}></img></button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <input type="text" name="input" class="form-control" placeholder={context.correo} required=""
                                                            onChange={(evt) => { this.setState({ email: evt.target.value }) }} ></input>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button class="btn btn-primary" data-dismiss="modal" onClick={()=>context.toggleEmail(this.state.email)} >Guardar</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        {/*finModal*/}


                                    </div>
                                    <div id="config-item">
                                        <div className="textD1">Telefono </div>
                                        <div id="info-item">{context.telefono}</div>
                                        <button id="edit-icon" data-target="#ModalTelefono" data-toggle="modal"> <img id="e-icon" src={edit}></img></button>

                                        {/*MODAL*/}

                                        <div class="modal" id="ModalTelefono" role="dialog">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header" id="modal-head">
                                                        <h4> Modificar telefono</h4>
                                                        <button id="close-mod" data-dismiss="modal"><img id="proj-icon" src={close}></img></button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <input type="text" name="input" class="form-control" placeholder={context.telefono} required=""
                                                            onChange={(evt) => { this.setState({ phone: evt.target.value }) }} ></input>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button class="btn btn-primary" data-dismiss="modal" onClick={()=>context.togglePhone(this.state.phone)} >Guardar</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        {/*finModal*/}



                                    </div>
                                    <div id="config-item">

                                        <div className="textD1"> Region </div>
                                        <div id="info-item">{context.region}</div>

                                        <button id="edit-icon" data-target="#ModalRegion" data-toggle="modal"> <img id="e-icon" src={edit}></img></button>

                                        {/*MODAL*/}

                                        <div class="modal" id="ModalRegion" role="dialog">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header" id="modal-head">
                                                        <h4> Modificar region</h4>
                                                        <button id="close-mod" data-dismiss="modal"><img id="proj-icon" src={close}></img></button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <input type="text" name="input" class="form-control" placeholder={context.region} required=""
                                                            onChange={(evt) => { this.setState({ region: evt.target.value }) }} ></input>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button class="btn btn-primary" data-dismiss="modal" onClick={()=>context.toggleRegion(this.state.region)} >Guardar</button>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        {/*finModal*/}


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