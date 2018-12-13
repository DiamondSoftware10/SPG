import React, { Component } from 'react';
import * as routes from '../Constants/Routes';
import './NewProject.css';
import { createProject } from '../Constants/firebase';
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../Constants/validations'
import { firebase } from 'firebase'
import axios from 'axios'

const AddProject = () =>
    <div id="project">
        <div id="main-title">Agregar Proyecto</div>
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

class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE, listImgLand: [] };
        this.fotoT = React.createRef();

        this.addListImgLand = this.addListImgLand.bind(this);
        this.onClick = this.onClick.bind(this);
        this.uploadImageToStorage = this.uploadImageToStorage.bind(this);
        this.handleDeleteImageLand = this.handleDeleteImageLand.bind(this);
        //        this.fileUploadCultivoHandler = this.fileUploadCultivoHandler.bind(this);
        //        this.fileUploadFamiliaHandler = this.fileUploadCultivoHandler.bind(this);

    }
    /**
     * @description Agrega la imagen al state listImgLand
     * @author Diego Mendoza
     */
    async addListImgLand() {
        //Se crea un arreglo temporal para evaluar si la imagen ya esta agregada
        let listTemp = [];
        await this.state.listImgLand.map(img => listTemp.push(img.name));
        //Si es undefined no deja agregar y tira una alerta
        console.log(this.fotoT.current.files[0])
        if (this.fotoT.current.files[0] != undefined) {
            //Verifica si la imagen ya esta en el arreglo listImgLand
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

    /**
     * @description Sube todas las imagenes al Storage
     * @author Diego Mendoza
     */
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

    /**
    //  @description borra la imagen del array
    // @author Diego Mendoza
    */
    handleDeleteImageLand = (index, event) => {
        event.preventDefault();

        this.setState(state => {
            const listImgLand = this.state.listImgLand;
            listImgLand.splice(index, 1);
            return (
                listImgLand
            )
        })
    }

    async onClick(project) {

        let tituloBool = document.getElementById("newProject-input1").value;
        let descripcionBool = document.getElementById("newProject-input2").value;
        let familias = document.getElementById("newProject-input4").value;
        let tiposCultivos = document.getElementById("newProject-input5").value;
        let infoZonas = document.getElementById("newProject-input6").value;
        let urlFam = document.getElementById("newProject-input7").value;
        let urlCultivos = document.getElementById("newProject-input8").value;
        let urlTerreno = document.getElementById("newProject-input9").value;
        let inversionInicial = document.getElementById("newProject-input10").value;


        //console.log("NO esta ubicacion aun");
        //urlImagenVal(urlTerreno);
        //puntoDecimalVal(inversionInicial, 1, 12);

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
        if ((titulo === undefined || descripcion === undefined || ubicacion === undefined || familiasB === undefined ||
            tiposCultivo === undefined || infoZona === undefined || fotoC === undefined || fotoF === undefined
            || fotoT === undefined || inversion === undefined)) {
            window.alert("Error al ingresar proyecto, llene todos los campos")
        } else if (nombresVal(tituloBool, 1, 50) == false || cantidadPalabrasVal(descripcionBool, 1, 100) == false
            || ubicacion == false || numeroVal(familias, 1, 7) == false || rangoCaracteresVal(tiposCultivos, 2, 50) == false
            || cantidadPalabrasVal(infoZonas, 1, 100) == false || urlImagenVal(urlCultivos) == false || urlImagenVal(urlFam) == false
            || urlImagenVal(fotoT) == false || puntoDecimalVal(inversionInicial, 1, 12) == false) {
            window.alert("Error al ingresar proyecto, verifique los datos de entrada")

        } else {
            //Agrega en la base de datos los nombres de las imagenes//
            let nameImgRef = [];
            await this.state.listImgLand.forEach(img => {
                console.log(img.name);
                nameImgRef.push(img.name);
            });
            /////////////////////////////////////////////////

            createProject(this.state.titulo, 0, 0, 0, nameImgRef, null, null,
                this.state.ubicacion, "Calvin", 0, "descripcion", "detalles", this.state.descripcion, "17/11/2018", true, this.state.tiposCultivo);
            await this.uploadImageToStorage();

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
        }

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
                        <input id="newProject-input2"
                            value={descripcion}
                            onChange={project => this.setState(byPropKey('descripcion', project.target.value))}
                            type="text"
                            placeholder="descripcion"
                        />
                    </li>
                    {/*Momento*/}
                    <li id="all-inputs-item">
                        <input id="newProject-input3"
                            value={ubicacion}
                            onChange={project => this.setState(byPropKey('ubicacion', project.target.value))}
                            type="text"
                            placeholder="ubicacion"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input4"
                            value={familiasB}
                            onChange={project => this.setState(byPropKey('familiasB', project.target.value))}
                            type="text"
                            placeholder="Numero de familias benficiadas"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input5"
                            value={tiposCultivo}
                            onChange={project => this.setState(byPropKey('tiposCultivo', project.target.value))}
                            type="text"
                            placeholder="Tipos de Cultivo, pongalos con , por favor  "
                        />
                    </li>

                    <li id="all-inputs-item">
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
                                        <button onClick={(e) => this.handleDeleteImageLand(index, e)}>X</button>
                                    </li>)}
                            </ul>
                        </div>
                    </li>
                    {/*Deberia hacerse con un spinner, en $ o LPS*/}
                    <li id="all-inputs-item">
                        <input id="newProject-input10"
                            value={inversion}
                            onChange={project => this.setState(byPropKey('inversion', project.target.value))}
                            type="text"
                            placeholder="Inversion inicial"
                        />
                    </li>


                </ul>

                <button id="bt-addProject" className="w3-button w3-round-xxlarge" onClick={this.onClick}>Add Project</button>


            </div>

        );
    }
}

export default AddProject;
