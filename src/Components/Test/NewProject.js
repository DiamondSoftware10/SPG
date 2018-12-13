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
        this.state = { INITIAL_STATE, listImgProject: [], URL: "" };
        this.fotoT = React.createRef();
        this.fotoC = React.createRef();
        this.addListImg = this.addListImg.bind(this);
        this.onClick = this.onClick.bind(this);
        this.uploadImageToStorage = this.uploadImageToStorage.bind(this);
        this.handleDeleteImageProject = this.handleDeleteImageProject.bind(this);
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
                    console.log(res);
                    console.log(this.fotoC)
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
    // TODO: Falta validacion donde no se repita una imagen con el mismo nombre 

    async addListImg() {
        console.log(this.fotoT.current.files[0]);
        let listTemp = [];
        await this.state.listImgProject.map(img => listTemp.push(img.name));
        if (!listTemp.includes(this.fotoT.current.files[0].name)) {
            await this.setState(state => {
                if (this.fotoT.current.files[0] != undefined) {
                    const listImgProject = state.listImgProject.concat(this.fotoT.current.files[0]);

                    return {
                        listImgProject,
                    }
                } else {
                    window.alert("No se ha seleccionado ninguna imagen");

                }
            });

        } else {
            window.alert("La imagen ya existe en la coleccion");

        }

        //Resetea el valor del archivo
        document.getElementById("newProject-input9").value = "";
    }

    uploadImageToStorage = () => {
        this.state.listImgProject.forEach(fileImg => {
            let fd = new FormData();
            fd.append('image', fileImg, fileImg.name);
            axios.post('https://us-central1-spg-project-1.cloudfunctions.net/uploadFile', fd)
                .then(res => {
                    console.log(fileImg)
                });
        });

        this.setState(({
            listImgProject: []
        }));
    }

    handleDeleteImageProject = (index, event) => {
        console.log(`Click on list ${index}`)
        event.preventDefault();

        this.setState(state => {
            const listImgProject = this.state.listImgProject;
            listImgProject.splice(index, 1);
            return (
                listImgProject
            )
        })
    }

    //Codigo para subir a la Storage///////////////////
    /**
         *
         * var storage = fire.storage();
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
         * 
         */
    ///////////////////////////////////////////////////////
    async onClick(project) {
        //Validacion para que no quiebre al dar click con todo en blanco y que no haga nada en la base de datos
        //Validar, quiebra
        let nameImgRef = [];
        await this.state.listImgProject.forEach(img => {
            console.log(img.name);
            nameImgRef.push(img.name);
        })
        await createProject(this.state.titulo, 0, 0, 0, nameImgRef, null, null
            , "", "", "", "", "", "", "", "", "");

        await this.uploadImageToStorage();
        window.alert(`Se ha agregegado el proyecto ${this.state.titulo}`);

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
                        <button id="bt-uploadProject" className="w3-button w3-round-xxlarge" onClick={this.addListImg}>Agregar Foto</button>
                    </li>
                </ul>

                <div>
                    {
                        /**Muestra las imagenes que se han agregado en una lista
                        //Permite que se borren por medio del boton
                        */
                    }
                    <ul>

                        {this.state.listImgProject.map((img, index) => <li key={index} >{img.name} <button onClick={(e) => this.handleDeleteImageProject(index, e)}>X</button></li>)}
                    </ul>
                </div>
                <button id="bt-addProject" className="w3-button w3-round-xxlarge" onClick={this.onClick}>Add Project</button>

            </div>

        );
    }
}

export default AddProject;
