import React, { Component } from 'react';
import fire from '../Firebase/Fire';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import UserContext from './UserContext';
import userP from '../Icons/user.svg'
import settings from '../Icons/settings.svg'
import linec from '../Icons/line-chart.svg'
import planning from '../Icons/planning.svg'
import cart from '../Icons/briefcase.svg'
import notificaciones from '../Icons/settings.svg'
import news from '../Icons/settings.svg'
import email from '../Icons/mail.svg'
import terrenos from '../Icons/settings.svg'


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

            showGeneral: true,
            showInversiones: false
        }
        this.handleGeneral = this.handleGeneral.bind(this);
        this.handleInversiones = this.handleInversiones.bind(this);
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

    handleGeneral() {
        this.setState({
            showGeneral: true,
            showInversiones: false
        });

    }

    handleInversiones() {
        this.setState({
            showInversiones: true,
            showGeneral: false
        });

    }

    render() {
        console.log(this.props.name)
        return (
            <UserContext.Consumer>
                {context => context.user ?
                    <div>
                        <div className="flexbox" id="navProfile-flex">

                            <div >
                                <img id="profile-imagen" src={require('./Archivo.jpg')} alt="Test" />
                            </div>

                            <div className="flexbox" id="flex-nombre">
                                <div id="profile-name" class="textD1">Vladimir Mamatov</div>
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
                                    <img className="nav-icon" src={settings}></img>  <a class="nav-link" href="#">CONFIGURACION</a>
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
            
                                    <div class="textD1">{context.correo}</div>

                                    <div class="textD1">{context.region}</div>

                                </div>
                                <div className="flexbox" id="flex-four">

                                    <div className="flexbox item-sm" id="notificaciones">
                                        <Link to={routes.CART}>

                                            <img className="nav-icon" src={notificaciones}></img>  <a className="textD2" >NOTIFICACIONES</a>
                                        </Link>

                                    </div>
                                    <div className="flexbox item-lg" id="cartera">
                                        <Link to={routes.CART}>

                                            <img className="nav-icon" src={cart}></img>  <a className="textD2" >CARTERA</a>
                                        </Link>

                                    </div>

                                    <div className="flexbox item-lg" id="terrenos">
                                        <Link to={routes.PROYECTOS}>

                                            <img className="nav-icon" src={terrenos}></img>  <a className="textD2" >TERRENOS</a>
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
                                <div id="main-title" > Inversiones </div>
                                
                                <div className="flexbox" id="invest-flex">
                                    <h4>Nombre proyecto</h4>
                                    <div>(Ubicacion)</div>
                                    <div>(Inversion)</div>
                                    <div>(Fecha)</div>
                                    <div>(Ganancia)</div>
                                </div>
                            </div>

                            : ''}
                    </div> : <p>no hay usuario</p>}

            </UserContext.Consumer>




        )
    }

}
export default Profile;