import React, { Component } from 'react';
import * as routes from '../../Constants/Routes';
import './NewProject.css';
import { createProject } from '../../Constants/project';
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../../Constants/validations'
import fire from '../../Firebase/Fire'
import axios from 'axios'
import { storage } from 'firebase';

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
        this.state = { INITIAL_STATE, listImgLand: [], URL: "" };
        this.fotoT = React.createRef();
        this.addListImgLand = this.addListImgLand.bind(this);
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
    //En esta funcion se agregan las fotos del terreno    
    async addListImgLand() {
        //Se crea un arreglo temporal para evaluar si la imagen ya esta agregada
        let listTemp = [];
        await this.state.listImgLand.map(img => listTemp.push(img.name));
        //Si es undefined debe tirar una alerta
        console.log(this.fotoT.current.files    [0])
        if (this.fotoT.current.files[0] != undefined ) {
            if (!listTemp.includes(this.fotoT.current.files[0].name)) {
                await this.setState(state => {
                    const listImgLand = state.listImgLand.concat(this.fotoT.current.files[0]);
                    return {
                        listImgLand,
                    }
                });
            } else {
                window.alert("La imagen ya existe en la coleccion");

            }
        } else {
            window.alert("No se ha seleccionado ninguna imagen");

        }

        //Resetea el valor del archivo
        document.getElementById("newProject-input9").value = "";
    }

    uploadImageToStorage = () => {
        this.state.listImgLand.forEach(fileImg => {
            let fd = new FormData();
            fd.append('image', fileImg, fileImg.name);
            axios.post('https://us-central1-spg-project-1.cloudfunctions.net/uploadFile', fd)
                .then(res => {
                    console.log(fileImg)
                });
        });

        this.setState(({
            listImgLand: []
        }));
    }

    handleDeleteImageProject = (index, event) => {
        console.log(`Click on list ${index}`)
        event.preventDefault();

        this.setState(state => {
            const listImgLand = this.state.listImgLand;
            listImgLand.splice(index, 1);
            return (
                listImgLand
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

        //Agrega en la base de datos los nombres de las imagenes//
        let nameImgRef = [];
        await this.state.listImgLand.forEach(img => {
            console.log(img.name);
            nameImgRef.push(img.name);
        });
        /////////////////////////////////////////////////
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
                        <p>Fotos del terreno</p>
                        <input id="newProject-input9"
                            value={fotoT}
                            ref={this.fotoT}
                            type="file"

                        />
                        <button id="bt-uploadProject" className="w3-button w3-round-xxlarge" onClick={this.addListImgLand}>Agregar Foto</button>
                        <div>
                            { /**Muestra las imagenes que se han agregado en una lista
                            //Permite que se borren por medio del boton*/}
                            <ul>
                                {this.state.listImgLand.map((img, index) =>
                                    <li key={index} >{img.name}
                                        <button onClick={(e) => this.handleDeleteImageProject(index, e)}>X</button>
                                    </li>)}
                            </ul>
                            <img sr={storage.ref("campo")}></img>
                        </div>
                    </li>
                </ul>

                <button id="bt-addProject" className="w3-button w3-round-xxlarge" onClick={this.onClick}>Add Project</button>

            </div>

        );
    }
}

export default AddProject;
