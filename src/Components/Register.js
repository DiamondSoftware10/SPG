import React, { Component } from 'react';
import fire from "../Firebase/Fire";
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../Constants/validations'
import Login from './Login';

//import "../bootstrap.min.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import * as routes from '../Constants/Routes';

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
            showAlert: false,
            showRegisterAlert: false

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
        
        fire.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.correo, this.state.contrasena).then((u) => { 
            
            fire.auth().onAuthStateChanged(user =>{
                if(user){
                    let usersRef = fire.firestore().collection("users").doc(user.uid);
                    usersRef.get().then(snapshot =>{
                        if(snapshot.data().active == false){
                            fire.auth().signOut();
                            window.alert("Su cuenta ha sido deshabilitada!");
                        }else{
                            this.props.history.push(routes.LANDING);
                        }
                    })
                }
            })
        }).catch((error) => {
            console.log(error);
            this.setState({
                showAlert: true
            })
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
                this.setState({
                    showRegisterAlert: true
                })
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
                    accType: 1,
                    active: true
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

    SendVerifyEmail() {
        fire.auth().currentUser.sendEmailVerification().then(function () {
            console.log('se envio correo de verificacion')
        }, function (error) {
            console.log('NO se envio correo de verificacion')

            // An error happened.
        });
    }


    render() {
        return (
            <div id="register-div">
                <div id="jumbo-reg">
                    {/*
                    <img id="logo-reg" src={icon} ></img>

                    <h1 id="SPG-reg" class="display-4">Sprouting Productive Gear</h1>

                    <br></br><br></br><br></br>
                */}
                </div>

                <Login />
            </div>


        );
    }
}

export default Register;

