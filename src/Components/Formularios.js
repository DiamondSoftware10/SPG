import React, { Component } from 'react';
import InfoCard from "./Infocards";
import fire from '../Firebase/Fire';
//import Searchbar from './Searchbar';
import magnifier from '../Icons/magnifier2.svg';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import './Search.css'

import * as routes from '../Constants/Routes';

const db = fire.firestore();

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Formularios extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            center: { lat: 0, lng: 0 },
            option: "title",
            foto: "",
            showModal: false,
        }

        this.handleOpenModal = this.handleOpenModal.bind(this);

        this.goToLogin = this.goToLogin.bind(this);
  
    }

    handleOpenModal() {
        this.setState({
            showModal: true,
            //id: this.props.id,
        });
        console.log("Modal");
        
    }

    


    componentWillReceiveProps(nextProps) {
        if (nextProps.id === this.props.id) {
            
        }
    }



    componentDidMount() {

    }

    goToLogin(){

    }




    render() {
        const style = {
            /*width: '50vw',
            height: '75vh',*/
            width: '30vw',
            height: '35vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
          }



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
                            <button className="hollow button" id="close-button" onClick={this.handleCloseModal}><img id="proj-icon" /*src={close}*/></img></button>
                            <div id="modal-detail">
                                <div className="card">
                                    <div className="row">

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

{
    /*
    <div id="proj-location">
                                                    <img id="proj-icon" src={loc}></img>
                                                    <div onClick={() => this.props.changeLocation(this.props.center)} data-toggle="modal" data-target="#mapModal" data-backdrop="false">
                                                        {this.props.location}
                                                    </div>
                                                </div>


    */
}
                                                
                                                <br></br>

                                                <br></br>

                                                <h5>Debe registrarse o iniciar sesión para poder continuar. </h5>
                                                <br></br>

                                                <br></br>

                                            </div>

                                            <div id="side-flex">
                                                <div id="sidebar">

                                        
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactModal>

                
        <div className="modal" id="formModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Ubicación del Proyecto</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">

                <div className="container">

                  <div className="card" style={style}>
                    <div className="form-group col-sm">
                      <label htmlFor="usr">Debe iniciar sesión para poder continuar.</label>
                    </div>
                
                  </div>

                </div>

              </div>
              <div className="modal-footer">
                {/*<button onClick={() => this.recenter} type="button" className="btn btn-secondary">
                                    RECENTER
                                </button>*/}

                <button onClick={this.goToLogin} type="button" className="btn btn-secondary" data-dismiss="modal">
                  OK
                                </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
              </div>
            </div>

          </div>

        </div>

            </div>

        );
    }
}

export default Formularios;
