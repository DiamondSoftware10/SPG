import React, { Component } from 'react';
import * as routes from '../../Constants/Routes';
import './NewProject.css';
import { createProject } from '../../Constants/project';
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../../Constants/validations'
import fire from '../../Firebase/Fire'
import axios from 'axios'

const AddProject = () =>
    <div id="project">
        <div id="main-title">Add Project</div>
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
    inversion: '',

    //Por mientras
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE, saveImageRef: [], URL: "" };
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
    async fileUploadTerrenoHandler() {
        const fd = new FormData();
        console.log(this.state.saveImageRef);
        fd.append('image', this.fotoT.current.files[0], this.fotoT.current.files[0].name);
        await axios.post('https://us-central1-spg-project-1.cloudfunctions.net/uploadFile', fd)
            .then(res => {
                console.log(this.fotoT)
                console.log(res);
            });
        await this.setState(state => {
            const saveImageRef = state.saveImageRef.concat(this.fotoT.current.files[0]);
            return {
                saveImageRef,
            }
        });

        var storage = fire.storage();
        var starsRef = storage.ref().child("Giger2.jpg");
        let getURL;
        await starsRef.getDownloadURL().then(function (url) {
            console.log(url);
            getURL = url;
        })
        await this.setState(state => {
            const URL = getURL;
            return { URL }
        })
        console.log(this.state.URL);
    }

    onClick = (project) => {
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


        //Validacion para que no quiebre al dar click con todo en blanco y que no haga nada en la base de datos
        //Validar, quiebra
        createProject(this.state.titulo, 0, 0, 0, this.state.saveImageRef, null, null
            , "", "", "", "", "", "", "", "", "");

        this.setState({
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

        })
        window.alert(this.state.titulo);
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

            <div onSubmit={this.onSubmit}>

                <ul id="all-inputs">
                    <li id="all-inputs-item">
                        <input id="newProject-input1"
                            value={titulo}
                            onChange={project => this.setState(byPropKey('titulo', project.target.value))}
                            type="text"
                            placeholder="titulo"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <p>Foto Terreno</p>
                        <input id="newProject-input9"
                            value={fotoT}
                            ref={this.fotoT}
                            type="file"

                        />
                        <button id="bt-uploadProject" className="w3-button w3-round-xxlarge" onClick={this.fileUploadTerrenoHandler}>Upload Foto</button>
                    </li>
                </ul>
                <div>
                    <ul>
                        {this.state.saveImageRef.map((img, index) => <li key={index}>{img.name}</li>)}
                    </ul>
                </div>
                <img id="img-pro" src={this.state.URL}></img>
                <button id="bt-addProject" className="w3-button w3-round-xxlarge" onClick={this.onClick}>Add Project</button>

            </div>

        );
    }
}

export default AddProject;
