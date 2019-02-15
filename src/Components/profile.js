import React, { Component } from 'react';
import fire from '../Firebase/Fire'
import UserContext from './UserContext';
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
                    <div id="profile-name" class="textD1">{context.nombre}</div>
                    <div id="profile-surname" class="textD1">{context.apellido}</div>
                </div>

                <ul class="nav flex-column" id="profile-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={this.handleGeneral}>Perfil</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={this.handleInversiones}>Mis Inversiones</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Configuracion</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Calendario</a>
                    </li>
                </ul>


                <div className="flex-done" >
                    <img id="profile-done" src={require('../Icons/verified.png')} />
                    <div id="profile-verified" class="textD1" >Perfil Verificado</div>
                </div>
            </div>



            {this.state.showGeneral ?

                <div className="flexbox" id="profile-flex">

                    <div className="flexbox" id="flexbox-name">
                        <div id="item-textName" class="textD2">Nombre</div>
                        <div id="profile-name2" class="textD1">Vladimir</div>
                    </div>

                    <div className="flexbox" id="flexbox-surname" >

                        <div id="profile-textSurname" class="textD2">Apellido</div>
                        <div id="profile-surname2" class="textD1">Mamatov</div>

                    </div>

                    <div className="flexbox" id="flexbox-region">

                        <div id="item-textRegion" class="textD2">Region</div>
                        <div id="profile-region2" class="textD1">Rusia</div>

                    </div>

                    <div className="flexbox" id="flexbox-numero">

                        <div id="item-textTel" class="textD2">Telefono</div>
                        <div id="profile-numero2" class="textD1">99122316</div>

                    </div>

                    <div className="flexbox" id="flexbox-correo" >

                        <div id="item-textEmail" class="textD2">Correo</div>
                        <div id="profile-correo2" class="textD1">vladimirMama@tov.com</div>

                    </div>


                </div>



                : ''}

            {this.state.showInversiones ?

                <div id="invest-div">
                    <h2 className="textD" id="main-title">Mis inversiones</h2>
                    <div className="flexbox" id="invest-flex">
                        <h4>Nombre proyecto</h4>
                        <div>(Ubicacion)</div>
                        <div>Shit</div>
                        <div>(Ubicacion)</div>
                        <div>Shit</div>
                    </div>
                    <div className="flexbox" id="invest-flex">
                        <h4>Nombre proyecto</h4>
                        <div>(Ubicacion)</div>
                        <div>Shit</div>
                        <div>(Ubicacion)</div>
                        <div>Shit</div>
                    </div>
                </div>


                : ''}
        </div> : <p>no hay usuario</p>}
            
            </UserContext.Consumer>

           


        )
    }

}
export default Profile;