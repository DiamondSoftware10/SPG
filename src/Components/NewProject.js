import React, { Component } from 'react';
import * as routes from '../Constants/Routes';
import './NewProject.css';
import { createProject } from '../Constants/firebase';
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../Constants/validations'
import { firebase } from 'firebase'
import axios from 'axios'

const AddProject = () =>
    <div id="project">

        <NewProject />
    </div>

const INITIAL_STATE = {
    titulo: '',
    descripcion: '',
    ubicacion: '',
    familiasB: '',
    tiposCultivo: '',
    infoZona: '',
    fotoF: '',
    fotoC: '',
    fotoT: '',
    inversion: '',
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

var temp;
class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };
        this.fotoT = React.createRef();
        this.fotoC = React.createRef();
        this.fileUploadTerrenoHandler = this.fileUploadTerrenoHandler.bind(this);
        //        this.fileUploadCultivoHandler = this.fileUploadCultivoHandler.bind(this);
        //        this.fileUploadFamiliaHandler = this.fileUploadCultivoHandler.bind(this);

    }
    /**
     *    fileUploadCultivoHandler = () => {
            const fd = new FormData();
            console.log(this.fotoC.current.files[0]);
            fd.append('image', this.fotoC.current.files[0], this.fotoC.current.files[0].name);
            axios.post('https://us-central1-spg-project-1.cloudfunctions.net/uploadFile', fd)
                .then(res => {
                    console.log(this.fotoC)
                    console.log(res);
                });
        }
        fileUploadFamiliaHandler = () => {
            const fd = new FormData();
            console.log(this.fotoF.current.files[0]);
            fd.append('image', this.fotoF.current.files[0], this.fotoF.current.files[0].name);
            axios.post('https://us-central1-spg-project-1.cloudfunctions.net/uploadFile', fd)
                .then(res => {
                    console.log(this.fotoF)
                    console.log(res);
                });
        }
     
     * 
     * 
     */
    fileUploadTerrenoHandler = () => {
        const fd = new FormData();
        console.log(this.fotoT.current.files[0]);
        fd.append('image', this.fotoT.current.files[0], this.fotoT.current.files[0].name);
        axios.post('https://us-central1-spg-project-1.cloudfunctions.net/uploadFile', fd)
            .then(res => {
                console.log(this.fotoT)
                console.log(res);
            });
    }

    onClick = (project) => {
        let tituloBool = document.getElementById("newProject-input1").value;
        let descripcionBool = document.getElementById("newProject-input2").value;
        let familias = document.getElementById("newProject-input4").value;
        let tiposCultivos = document.getElementById("newProject-input5").value;
        let infoZonas = document.getElementById("newProject-input6").value;
        let urlFam = document.getElementById("newProject-input7").value;
        let urlCultivos = document.getElementById("newProject-input8").value;
        let urlTerreno = document.getElementById("newProject-input9").value;
        let inversionInicial = document.getElementById("newProject-input10").value;


        console.log("NO esta ubicacion aun");
        urlImagenVal(urlTerreno);
        puntoDecimalVal(inversionInicial, 1, 12);

        const {
            titulo,
            descripcion,
            ubicacion,
            familiasB,
            tiposCultivo,
            infoZona,
            fotoF,
            fotoC,
            fotoT,
            inversion,
        } = this.state;

        const {
            history,
        } = this.props;

        createProject(this.state.titulo, 0, 0, 0, null, null, null,
            this.state.ubicacion, "Calvin", 0, "descripcion", "detalles", this.state.descripcion, "17/11/2018", true, "tomates");
        /* { this.AddBaseD() }*/ /*usar esto para mandar atributos a funcion interna para añadir a BD, si se quiere hacer. */
        document.getElementById("newProject-input").innerHTML = "";
        project.preventDefault();
    }


    render() {

        const {
            titulo,
            descripcion,
            ubicacion,
            familiasB,
            tiposCultivo,
            infoZona,
            fotoF,
            fotoC,
            fotoT,
            inversion,
        } = this.state;

        return (

            <div id="new-proj-div" onSubmit={this.onSubmit}>

                <div id="new-proj-inputs">
                    <div id="main-title">Agregar Proyecto</div>
                    <ul id="all-inputs">
                         {/*<div>Titulo</div>*/}
                        <li id="all-inputs-item">
                        Titulo
                        <br></br>
                            <input id="newProject-input1"
                                value={titulo}
                                onChange={project => this.setState(byPropKey('titulo', project.target.value))}
                                type="text"
                            />
                        </li>

                        <li id="all-inputs-item">
                        Descripción
                        <br></br>
                            <input id="newProject-input2"
                                value={descripcion}
                                onChange={project => this.setState(byPropKey('descripcion', project.target.value))}
                                type="text"
                            />
                        </li>
                        {/*Momento*/}
                        <li id="all-inputs-item">
                        Ubicación
                        <br></br>
                            <input id="newProject-input3"
                                value={ubicacion}
                                onChange={project => this.setState(byPropKey('ubicacion', project.target.value))}
                                type="text"
                            />
                        </li>

                        <li id="all-inputs-item">
                        Numero de familias beneficiadas
                        <br></br>
                            <input id="newProject-input4"
                                value={familiasB}
                                onChange={project => this.setState(byPropKey('familiasB', project.target.value))}
                                type="text"
                            />
                        </li>

                        <li id="all-inputs-item">
                      Cultivos
                      <br></br>
                            <input id="newProject-input5"
                                value={tiposCultivo}
                                onChange={project => this.setState(byPropKey('tiposCultivo', project.target.value))}
                                type="text"
                            />
                        </li>

                        <li id="all-inputs-item">
                        Información de Zona
                      <br></br>
                            <input id="newProject-input6"
                                value={infoZona}
                                onChange={project => this.setState(byPropKey('infoZona', project.target.value))}
                                type="text"
                                placeholder="Informacion de zona"
                            />
                        </li>
                        {/*
                        <li id="all-inputs-item">
                            <p>Foto Familias</p>
                            <input id="newProject-input7"
                                value={fotoF}
                                ref={this.fotoF}
                                type="file"
                            />
                        </li>
                        <button id="bt-uploadProject" className="w3-button w3-round-xxlarge" onClick={this.fileUploadFamiliaHandler}>Upload Foto</button>
                        <li id="all-inputs-item">
                            <p>Foto Cultivo</p>
                            <input id="newProject-input8"
                                value={fotoC}
                                ref={this.fotoC}
                                type="file"
                            />
                            <button id="bt-uploadProject" className="w3-button w3-round-xxlarge" onClick={this.fileUploadCultivoHandler}>Upload Foto</button>
                            </li>
                        */}
                        <li id="all-inputs-item">
                            Foto Terreno
                            <br></br>
                            <input id="newProject-input9"
                                value={fotoT}
                                ref={this.fotoT}
                                type="file"

                            />
                            <button id="bt-uploadProject" className="w3-button w3-round-xxlarge" onClick={this.fileUploadTerrenoHandler}>Upload Foto</button>

                        </li>
                        {/*Deberia hacerse con un spinner, en $ o LPS*/}

                        <li id="all-inputs-item">
                        Inversión inicial
                        <br></br>
                            <input id="newProject-input10"
                                value={inversion}
                                onChange={project => this.setState(byPropKey('inversion', project.target.value))}
                                type="text"
                            />
                        </li>

                    </ul>



                    <button id="bt-addProject" className="w3-button w3-round-xxlarge" onClick={this.onClick}>Add Project</button>
                </div>
                <div id="new-proj-graphic">
                    {/*<div id="graphic"></div>*/}
                    <img id="graphic" src="https://bit.ly/2UsoZO1"></img>
                </div>

            </div>

        );
    }
}

export default AddProject;
