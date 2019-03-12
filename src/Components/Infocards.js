import React, { Component } from 'react';
import { listProjects, listUsers, queryIdProject } from '../Constants/firebase'
import './Infocard.css'
import './Proyectos.css'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import ReactModal from 'react-modal';
import Formularios from "./Formularios";
import { ProjectInfo } from './ProjectPage';

import { Link } from 'react-router-dom';

import "circular-std";
import workers from '../Icons/workers.svg';
import hand from '../Icons/hand.svg';
import loc from '../Icons/placeholder.svg';
import arrow from '../Icons/arrow.svg';
import close from '../Icons/close.svg'

import fire from "../Firebase/Fire"


var db = fire.firestore();



class Infocard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            foto: "",
            cultivos: [],
            currentLat: 0,
            currentLong: 0,
            showModal: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.changeLocation = this.changeLocation.bind(this);
        this.recenter = this.recenter.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    /*async componentWillMount() {
        await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url => {
            this.setState({
                foto: url
            })
        })
    }*/

    //No captura el ID mandado con props desde proyecto.js
    async componentDidMount() {
        await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url => {
            this.setState({
                id: this.props.id,
                foto: url
            })
        })
        /*console.log("Este es");
        this.setState({
            id: this.props.id,
        })
        console.log(this.props.id);*/
    }


    async componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            await fire.storage().ref().child(this.props.pic).getDownloadURL().then(url => {
                this.setState({
                    id: this.props.id,
                    foto: url
                })
            })
            console.log("updating");
        }
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
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }


    render() {
        return (
            <div >
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="onRequestClose Example"
                    onRequestClose={this.handleCloseModal}
                    className="ModalBack animated fadeIn faster"
                    overlayClassName="Overlay"
                >
                    <div className="Modal">
                        <div id="heading-modal">
                            <button className="hollow button" id="close-button" onClick={this.handleCloseModal}><img id="proj-icon" src={close}></img></button>
                            {<ProjectInfo id={this.props.id} foto={this.state.foto} center = {this.props.center}/>}
                        </div>
                    </div>
                </ReactModal>

                <div id="infocards">
                    <div className="icard-hor animated fadeIn fast">
                        <div id="bt-event">
                            <div id="bt-more"></div>
                            <img id="img-pro" className="animated fadeIn fast" src={this.state.foto}></img>
                        </div>
                        <div id="box-event">
                            <div id="proj-type">Terreno</div>
                            <div id="proj-name">{this.props.title}</div>
                            <div id="proj-location">
                                <img id="proj-icon" src={loc}></img>
                                {this.props.location}
                                {/*<div onClick={() => this.props.changeLocation(this.props.center)} data-toggle="modal" data-target="#mapModal" data-backdrop="false">
                                    {this.props.location}
        </div>*/}
                            </div>

                            <div id="proj-gen">
                                <img id="proj-icon" src={workers}></img>
                                <div id="num">{this.props.jobs} empleos</div>
                                <img id="proj-icon" src={hand}></img>
                                <div id="num">{this.props.money}  </div>
                            </div>
                            <div id="proj-footer">
                                <button id="proj-cont" onClick={this.handleOpenModal} data-toggle="modal" data-target="#formModal" ><img id="proj-cont-icon" src={arrow}></img></button>
                            </div>
                        </div>

                    </div>

                </div >
            </div>
        );
    }
}

export default Infocard;
