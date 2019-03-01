import React, { Component } from 'react';
import fire2 from "../Firebase/Fire2";
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../Constants/validations'

import './NewProject.css';
//import "../bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

//import './Register.css';
import icon from '../Icons/iconbeta.png';

class CreateAdmin extends Component {

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
            contrasena2: "",
            condicion: null,


        };


        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.checkInputs = this.checkInputs.bind(this);



    }



    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };


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

            fire2.auth().createUserWithEmailAndPassword(this.state.correo, this.state.contrasena).then((u) => {


                this.addUser(e);


            }).catch((error) => {
                window.alert(error);
            })


            window.alert("Se ha registrado con exito");

        }

    }


    

    addUser = e => {

        fire2.auth().onAuthStateChanged(user => {
            if (user) {
                const db = fire2.firestore();


                db.collection("users").doc(user.uid).set({
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    correo: this.state.correo,
                    telefono: this.state.telefono,
                    region: this.state.region,
                    active: true,
                    accType: 0
                });


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

    render() {
        return (
            <div>
                <div className="graphic-lg" id="create-admin-graphic"></div>
                <h1 className="main-title">Crear Administrador</h1>

                <div id="superuser-div">
                    <form id="superuser-form" >
                        <div className="form-group" id="input-list-item">
                            <label>Primer Nombre</label>
                            <input
                                onChange={this.handleChange('nombre')}
                                type="text" className="form-control" id="nombre"
                                placeholder="Primer Nombre"
                            />
                        </div>
                        <div className="form-group" id="input-list-item">
                            <label>Apellido</label>
                            <input
                                onChange={this.handleChange('apellido')}
                                type="text" className="form-control" id="apellido"
                                placeholder="Apellido"
                            />
                        </div>
                        <div className="form-group" id="input-list-item">
                            <label>Región</label>
                            <input
                                onChange={this.handleChange('region')}
                                type="text" className="form-control" id="region"
                                placeholder="Región"
                            />
                        </div>
                        <div className="form-group" id="input-list-item">
                            <label>Telefono</label>
                            <input
                                onChange={this.handleChange('telefono')}
                                type="text" className="form-control" id="telefono"
                                placeholder="Teléfono"
                            />
                        </div>
                        <div className="form-group" id="input-list-item">
                            <label>Email Address</label>
                            <input
                                onChange={this.handleChange('correo')}
                                type="email" className="form-control" id="correo"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="form-group" id="input-list-item">
                            <label>Contraseña</label>
                            <input
                                onChange={this.handleChange('contrasena')}
                                type="password" className="form-control" id="password"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className="form-group" id="input-list-item">
                            <label>Confirmar Contraseña</label>
                            <input
                                onChange={this.handleChange('contrasena2')}
                                type="password" className="form-control" id="password2"
                                placeholder="Confirmar Contraseña"
                            />
                        </div>
                        <div>
                            
                        </div>
                    </form>

                    
                </div>
                <button data-backdrop="false" type="button" className="btn btn-primary" onClick={this.signup} {...this.state.condicion && { 'data-dismiss': "modal" }}>
                                Crear Cuenta
                 </button>
            </div>

        );
    }
}

export default CreateAdmin;

