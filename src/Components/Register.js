import React, { Component } from 'react';
import fire from "../Firebase/Fire";

//import "../bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";


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

        };

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickRegistrar = this.clickRegistrar.bind(this);
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.checkInputs = this.checkInputs.bind(this);



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
        fire.auth().createUserWithEmailAndPassword(this.state.correo, this.state.contrasena).then((u) => {
            this.addUser(e);
        }).catch((error) => {
            console.log(error);
        })

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
        //const current = this;
        //e.preventDefault();
        //e.persist();

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
                }/*, () => {
                    this.setState({
                        nombre: "",
                        apellido: "",
                        correo: "",
                        telefono: "",
                        region: "",
                        contrasena: ""
                    });
                }*/);

                /*this.setState({
                    nombre: "",
                    apellido: "",
                    correo: "",
                    telefono: "",
                    region: "",
                    contrasena: ""
                });*/
                //this.signup(e);

            } else {

            }
        });

        /*
                if (!this.state.email.match(/.+@.+/)) {
                    alert('Email no es válido');
                } else {
                    const db = fire.firestore();
        
                    db.settings({
                        timestampsInSnapshots: true
                    });
        
                    const userRef = db.collection("users").add({
                        nombre: this.state.nombre,
                        apellido: this.state.apellido,
                        correo: this.state.correo,
                        telefono: this.state.telefono,
                        region: this.state.region,
                        accType: 1
                    });
        
                    this.signup(e);
        
                    this.setState({
                        nombre: "",
                        apellido: "",
                        correo: "",
                        telefono: "",
                        region: "",
                        contrasena: ""
                    });
                }
        
                */


    }

    checkInputs(email) {
        if (!email.match(/.+@.+/)) {
            alert('Email no es válido');
        } else {
            //this.addUser
        }
    }

    render() {
        return (
            <div className="container">



                <div className="jumbotron vertical-center">

                
                    <div className="container">
                        <div className="button-toolbar col-sm">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#registerModal">
                                Registrarse
                    </button>

                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                                Iniciar Sesión
                            {//login con facebook, google?
                                }
                            </button>
                        </div>
                    </div>
                </div>
                {/*

                <div className="row">



                </div>
*/
                }             


                <div className="modal" id="registerModal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Registrarse</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="form-group col-sm">
                                            <label htmlFor="usr">Nombre:</label>
                                            <input
                                                onChange={this.handleChange('nombre')}
                                                type="text" className="form-control" id="nombre" />
                                        </div>

                                        <div className="form-group col-sm">
                                            <label htmlFor="usr">Apellido:</label>
                                            <input
                                                onChange={this.handleChange('apellido')}
                                                type="text" className="form-control" id="apellido" />
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="usr">Región:</label>
                                        <input
                                            onChange={this.handleChange('region')}
                                            type="text" className="form-control" id="region" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="usr">Telefono:</label>
                                        <input
                                            onChange={this.handleChange('telefono')}
                                            type="text" className="form-control" id="telefono" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="usr">Correo:</label>
                                        <input
                                            onChange={this.handleChange('correo')}
                                            type="email" className="form-control" id="correo" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="pwd">Contraseña:</label>
                                        <input
                                            onChange={this.handleChange('contrasena')}
                                            type="password" className="form-control" id="password" />
                                    </div>

                                </div>


                                <button onClick={this.signup} type="button" className="btn btn-secondary" data-dismiss="modal">
                                    OK
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
                            </div>
                        </div>

                    </div>

                </div>

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
                                        <label htmlFor="usr">Email:</label>
                                        <input
                                            onChange={this.handleChange('correo')}
                                            type="email" className="form-control" id="correoLogin" />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="pwd">Contraseña:</label>
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
            </div>


        );
    }
}

export default Register;
