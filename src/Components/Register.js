import React, { Component } from 'react';
import fire from "../Firebase/Fire";
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../Constants/validations'


//import "../bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import './Register.css';
import icon from '../Icons/iconbeta.png';


class Register extends Component {

    constructor(props) {
        super(props);
        this.classes = props.classes;

        this.state = {
            user: null,
            nombre: "",
            apellido: "",
            correo: "",
            telefono: "",
            region: "",
            contrasena: "",
            condicion: null,


        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickRegistrar = this.clickRegistrar.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.SendVerifyEmail = this.SendVerifyEmail.bind(this);

    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };

    clickRegistrar() {
        //agregar nueva persona a la base de datos
        //
        console.log("registrar");
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.correo, this.state.contrasena).then((u) => { }).catch((error) => {
            console.log(error);
        });
    }

    signup(e) {
        e.preventDefault();


        if ((this.state.nombre === undefined || this.state.apellido === undefined || this.state.correo === undefined || this.state.telefono === undefined ||
            this.state.region === undefined || this.state.contrasena === undefined)) {
            window.alert("Error al registrarse, llene todos los campos")
        } else if (nombresVal(this.state.nombre, 1, 50) == false || nombresVal(this.state.apellido, 1, 50) == false
            || numeroVal(this.state.telefono, 1, 7) == false
            || rangoCaracteresVal(this.state.region, 2, 50) == false) {

            window.alert("Error al registrarse, verifique los datos de entrada")

        } else {

            fire.auth().createUserWithEmailAndPassword(this.state.correo, this.state.contrasena).then((u) => {

                this.setState({
                    condicion: true
                });
                this.addUser(e);


            }).catch((error) => {
                window.alert(error);
            })


            window.alert("Se ha registrado con exito");

        }

    }


    addCollection() {
        const db = fire.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        const dbRef = db.collection("data").add({
            nombre: "John Doe"
        })
    }

    addUser = e => {

        fire.auth().onAuthStateChanged(user => {
            if (user) {
                const db = fire.firestore();
                /*
                                db.settings({
                                    timestampsInSnapshots: true
                                });*/

                db.collection("users").doc(user.uid).set({
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    correo: this.state.correo,
                    telefono: this.state.telefono,
                    region: this.state.region,
                    accType: 1
                });

                this.SendVerifyEmail();
            } else {

            }
        });
    }

    checkInputs(email) {
        if (!email.match(/.+@.+/)) {
            alert('Email no es válido');
        } else {
            //this.addUser
        }
    }

    SendVerifyEmail(){
        fire.auth().currentUser.sendEmailVerification().then(function() {
            console.log('se envio correo de verificacion')
           }, function(error) {
            console.log('NO se envio correo de verificacion')

            // An error happened.
           });
    }


    render() {
        return (
            <div id="register-div">
                <div id="jumbo-reg" className="jumbotron">
                    {/*
                    <img id="logo-reg" src={icon} ></img>

                    <h1 id="SPG-reg" class="display-4">Sprouting Productive Gear</h1>

                    <br></br><br></br><br></br>
                */}
                </div>


                <div className="jumbotron vertical-center">
                    <div className="container">

                        <div id="reg-toolbar" className="button-toolbar col-sm">

                            <h2>Inicia Sesión</h2>

                            <form id="login-form">
                                <div class="form-group">
                                    <label htmlFor="usr">Email</label>
                                    <input
                                        onChange={this.handleChange('correo')}
                                        type="email" className="form-control" id="correoLogin" />
                                </div>
                                <div class="form-group">
                                    <label htmlFor="pwd">Contraseña</label>
                                    <input
                                        onChange={this.handleChange('contrasena')}
                                        type="password" className="form-control" id="passwordLogin" />
                                </div>
                                <div>
                                    <button onClick={this.login} type="button" className="btn btn-primary" data-dismiss="modal">
                                        INICIAR
                                </button>
                                    <br></br>
                                </div>
                                ¿No tienes una cuenta? <a id="reg-link" data-backdrop="false" data-toggle="modal" data-target="#registerModal">Registrate</a>
                            </form>
                            {/*
                            <button data-backdrop="false" type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerModal">
                                Registrarse
                            </button>

                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                                Iniciar Sesión
                            {//login con facebook, google?
                                }
                            
                            </button>*/}
                        </div>
                    </div>


                </div>

                <div className="row">



                </div>



                <div className="modal" id="registerModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            {/*
                            <div className="modal-header">
                                <img src={icon} width="40" height="40"></img>
                                <h3 className="modal-title">Registrarse</h3>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        */}
                            <button id="close-modal" type="button" className="close" data-dismiss="modal">&times;</button>
                            <div id="register-content">
                                <div id="register-graphic"></div>
                                <div id="register-body" className="modal-body">

                                    <img src={icon} width="40" height="40"></img>
                                    <h3 className="modal-title">Registrarse</h3>

                                    <div id="register-form" className="container">
                                        {/*<img id="regi-img" src="https://bit.ly/2U38JTw"></img>*/}
                                        {/*<div className="row">*/}
                                        <div className="form-group ">
                                            <label htmlFor="usr">Nombre</label>
                                            <input
                                                onChange={this.handleChange('nombre')}
                                                type="text" className="form-control" id="nombre" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="usr">Apellido</label>
                                            <input
                                                onChange={this.handleChange('apellido')}
                                                type="text" className="form-control" id="apellido" />
                                        </div>

                                        {/*</div>*/}

                                        <div className="form-group">
                                            <label htmlFor="usr">Región</label>
                                            <input
                                                onChange={this.handleChange('region')}
                                                type="text" className="form-control" id="region" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="usr">Telefono</label>
                                            <input
                                                onChange={this.handleChange('telefono')}
                                                type="text" className="form-control" id="telefono" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="usr">Correo</label>
                                            <input
                                                onChange={this.handleChange('correo')}
                                                type="email" className="form-control" id="correo" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="pwd">Contraseña</label>
                                            <input
                                                onChange={this.handleChange('contrasena')}
                                                type="password" className="form-control" id="password" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">Confirmar Contraseña</label>
                                            <input
                                                onChange={this.handleChange('contrasena')}
                                                type="password" className="form-control" id="password" />
                                        </div>

                                    </div>


                                    <button id="bt-reg" data-backdrop="false" type="button" className="btn btn-primary" onClick={this.signup} {...this.state.condicion && { 'data-dismiss': "modal" }}>
                                        Crear Cuenta
                                </button>
                                </div>
                            </div>
                            {/*
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            </div>
                            */}
                        </div>

                    </div>

                </div>

                {/*
                <div className="modal" id="loginModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Log in</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="form-group col-sm">
                                        <label htmlFor="usr">Email</label>
                                        <input
                                            onChange={this.handleChange('correo')}
                                            type="email" className="form-control" id="correoLogin" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="pwd">Contraseña</label>
                                        <input
                                            onChange={this.handleChange('contrasena')}
                                            type="password" className="form-control" id="passwordLogin" />
                                    </div>

                                </div>

                                <button onClick={this.login} type="button" className="btn btn-secondary" data-dismiss="modal">
                                    LOG IN
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>

                    </div>

                </div>
*/}
            </div>


        );
    }
}

export default Register;

