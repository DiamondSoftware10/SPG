import React, { Component } from 'react';
import * as routes from '../Constants/Routes';
import './NewProject.css';
import { createProject } from '../Constants/project';
import { numeroVal, cantidadPalabrasVal, nombresVal, rangoCaracteresVal, urlImagenVal, puntoDecimalVal } from '../Constants/validations'
import axios from 'axios';
import firebase from 'firebase';

import close from '../Icons/close.svg';

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
    inversion: '',
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = {
            INITIAL_STATE,
            listImgFamilies: [],
            listImgCrops: [],
            picProject: false,
            previewPic: null,
            inversion: null,
            pic: "",
            boolName: false,
            listNameCrops: []

        };
        //Fotos de los cultivos
        this.fotoC = React.createRef();
        //Foto del proyecto
        this.fotoP = React.createRef();
        this.fotoF = React.createRef();
        this.addImgProject = this.addImgProject.bind(this);
        this.addListImgCrops = this.addListImgCrops.bind(this);
        this.addListImgFamilies = this.addListImgFamilies.bind(this);

        this.handleDeleteImageCrop = this.handleDeleteImageCrop.bind(this);
        this.handleDeleteImageFamily = this.handleDeleteImageFamily.bind(this);
        this.handleDeleteNameCrop = this.handleDeleteNameCrop.bind(this);
        this.uploadImageToStorage = this.uploadImageToStorage.bind(this);

        this.handleSaveProject = this.handleSaveProject.bind(this);

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeInversion = this.handleChangeInversion.bind(this);
        this.handleChangeInfoZona = this.handleChangeInfoZona.bind(this);
        this.handleChangeFamily = this.handleChangeFamily.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeCrops = this.handleChangeCrops.bind(this);
        this.handleKeyEnterAddCrop = this.handleKeyEnterAddCrop.bind(this);

        //        this.fileUploadCultivoHandler = this.fileUploadCultivoHandler.bind(this);
        //        this.fileUploadFamiliaHandler = this.fileUploadCultivoHandler.bind(this);

    }
    async componentWillMount() {
        firebase.storage().ref().child("Campo2.jpg").getDownloadURL().then(url => {
            this.setState({
                pic: url
            })
        }).catch(function (error) {
            // Handle any errors
        });
    }
    /**
    @description Subir imagene del proyecto    
     */
    addImgProject() {
        //Revisa que se haya seleccionado una imagen
        console.log(this.fotoP.current.files);
        if (this.fotoP.current.files[0] != undefined) {
            this.setState({
                picProject: true,
                previewPic: URL.createObjectURL(this.fotoP.current.files[0])
            })
        } else {
            window.alert("No se ha seleccionado ninguna imagen");
            document.getElementById("newProject-input9").value = "";
        }



    }
    /**
     * @description Agrega la imagen al state listImgCrops
     * @author Diego Mendoza
     */
    async addListImgCrops() {
        //Se crea un arreglo temporal para evaluar si la imagen ya esta agregada
        let listTemp = [];
        await this.state.listImgCrops.map(img => listTemp.push(img.name));
        //Si es undefined no deja agregar y tira una alerta
        if (this.fotoC.current.files[0] != undefined) {
            //Verifica si la imagen ya esta en el arreglo listImgCrops
            if (!listTemp.includes(this.fotoC.current.files[0].name)) {
                await this.setState(state => {
                    const listImgCrops = state.listImgCrops.concat(this.fotoC.current.files[0]);
                    return {
                        listImgCrops,
                    }
                });
            } else {
                window.alert("La imagen ya existe en la coleccion");

            }
        } else {
            window.alert("No se ha seleccionado ninguna imagen");

        }

        //Resetea el valor del archivo
        document.getElementById("newProject-input8").value = "";
    }
    /**
     * @description Agrega la imagen al state listImgFamilies
     * @author Diego Mendoza
     */
    async addListImgFamilies() {
        //Se crea un arreglo temporal para evaluar si la imagen ya esta agregada
        let listTemp = [];
        await this.state.listImgFamilies.map(img => listTemp.push(img.name));
        //Si es undefined no deja agregar y tira una alerta
        if (this.fotoF.current.files[0] != undefined) {
            //Verifica si la imagen ya esta en el arreglo listImgFamilies
            if (!listTemp.includes(this.fotoF.current.files[0].name)) {
                await this.setState(state => {
                    const listImgFamilies = state.listImgFamilies.concat(this.fotoF.current.files[0]);
                    return {
                        listImgFamilies,
                    }
                });
            } else {
                window.alert("La imagen ya existe en la coleccion");

            }
        } else {
            window.alert("No se ha seleccionado ninguna imagen");

        }
        //Resetea el valor del archivo
        document.getElementById("newProject-input7").value = "";
    }
    /**
            async componentWillMount(){
            await firebase.storage().ref().child("Campo2.jpg").getDownloadURL().then(url =>{
                this.setState({
                    pic:url
                })
            })
        }
    
     */
    /**
     * @description Sube todas las imagenes al Storage
     * @author Diego Mendoza
     */
    uploadImageToStorage = () => {
        this.state.listImgCrops.forEach(fileImg => {
            firebase.storage().ref().child(fileImg.name).put(fileImg);
        });
        this.state.listImgFamilies.forEach(fileImg => {
            firebase.storage().ref().child(fileImg.name).put(fileImg);
        });
        firebase.storage().ref().child(this.fotoP.current.files[0].name).put(this.fotoP.current.files[0]);


        this.setState(({
            listImgCrops: [],
            listImgFamilies: [],
            previewPic: ""
        }));
        document.getElementById("newProject-input9").value = "";

    }

    /**
    //  @description borra la imagen del array
    // @author Diego Mendoza ,Jahaziel Moreno
    */
    handleDeleteImageCrop = (index, event) => {
        event.preventDefault();

        this.setState(state => {
            const listImgCrops = this.state.listImgCrops;
            listImgCrops.splice(index, 1);
            return (
                listImgCrops
            )
        })
    }
    /**
   //  @description borra la imagen del array
   // @author Diego Mendoza ,Jahaziel Moreno
   */
    handleDeleteImageFamily = (index, event) => {
        event.preventDefault();

        this.setState(state => {
            const listImgFamilies = this.state.listImgFamilies;
            listImgFamilies.splice(index, 1);
            return (
                listImgFamilies
            )
        })
    }
    /**
     * 
     * @param {project} 
     * @description guarda los proyectos en la base de datos  
     */
    async handleSaveProject(project) {
        const {
            titulo,
            descripcion,
            ubicacion,
            familiasB,
            tiposCultivo,
            infoZona,
            inversion,
        } = this.state;

        const {
            history,
        } = this.props;
        let tituloBool = document.getElementById("newProject-input1").value;
        let descripcionBool = document.getElementById("newProject-input2").value;
        let familias = document.getElementById("newProject-input4").value;
        let tiposCultivos = document.getElementById("newProject-input5").value;
        let infoZonas = document.getElementById("newProject-input6").value;
        let inversionInicial = document.getElementById("newProject-input10").value;



        //Validacion para que no quiebre al dar click con todo en blanco y que no haga nada en la base de datos
        //Validar, quiebra
        if ((titulo === undefined || descripcion === undefined || familiasB === undefined || infoZona === undefined || inversion === undefined)) {
            window.alert("Error al ingresar proyecto, llene todos los campos")
        } else if (this.state.listNameCrops.length == 0) {
            window.alert("Agregue algunos cultivos")
        } else if (this.state.listImgFamilies.length == 0) {
            window.alert("Agregue algunas fotos de las familias")
        } else if (this.state.listImgCrops.length == 0) {
            window.alert("Agregue algunas fotos de los cultivos")
        } else if (this.fotoP.current.files[0] == undefined) {
            window.alert("Agregue una foto para el proyecto")
        } else if (nombresVal(tituloBool, 1, 50) == false || cantidadPalabrasVal(descripcionBool, 1, 100) == false
            || ubicacion == false || numeroVal(familias, 1, 7) == false
            || cantidadPalabrasVal(infoZonas, 1, 100) == false || puntoDecimalVal(inversionInicial, 1, 12) == false) {
            window.alert("Error al ingresar proyecto, verifique los datos de entrada")
        } else {
            //Agrega en la base de datos los nombres de las imagenes para cada uno//
            let nameImgRefCrops = [];
            await this.state.listImgCrops.forEach(img => {
                nameImgRefCrops.push(`${img.name}`);
            });
            let nameImgRefFamilies = [];
            await this.state.listImgFamilies.forEach(img => {
                nameImgRefFamilies.push(`${img.name}`);
            });
            /**
         * @param {title,timeProdxDay,raisedMoney,projectFinan,picProject,picFam,picCultures,coordinates,investor,investInitxBlock,infoZone,detailsProdxBlocks,desciption,creationDate,available,cultures}
         */
            let temp = new Date();
            let fecha = temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear();
            createProject(this.state.titulo, 0, 0, 0, this.fotoP.current.files[0].name, nameImgRefFamilies, nameImgRefCrops, new firebase.firestore.GeoPoint(10, 10), "", this.state.inversion, this.state.infoZona, "", this.state.descripcion, fecha, true, this.state.listNameCrops);
            await this.uploadImageToStorage();

            this.setState({
                titulo: '',
                descripcion: '',
                ubicacion: '',
                familiasB: '',
                tiposCultivo: '',
                infoZona: '',
                inversion: '',
            })


            window.alert(`Se ha agregegado el proyecto ${this.state.titulo}`);


        }
        project.preventDefault();




    }
    handleKeyEnterAddCrop = (event, cultivo) => {
        console.log(event.keyCode)
        if (event.keyCode === 13) {
            this.setState({
                listNameCrops: this.state.listNameCrops.concat(cultivo),
                tiposCultivo: ""
            })
        }

    }

    handleChangeTitle = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(nombresVal(this.state.titulo, 0, 50));
        if (nombresVal(this.state.titulo, 0, 50) == false) {
            document.getElementById("newProject-input1").style.borderColor = "red";
        } else if (this.state.titulo === undefined) {
            document.getElementById("newProject-input1").style.borderColor = "white";

        } else {
            document.getElementById("newProject-input1").style.borderColor = "blue";

        }
    };

    handleChangeDescription = descripcion => event => {
        this.setState({ [descripcion]: event.target.value });
        console.log(event.target.value);
        if (cantidadPalabrasVal(this.state.descripcion, 0, 100) == false) {
            document.getElementById("newProject-input2").style.borderColor = "red";
        } else if (this.state.descripcion === undefined) {
            document.getElementById("newProject-input2").style.borderColor = "white";

        } else {
            document.getElementById("newProject-input2").style.borderColor = "blue";

        }
    };

    handleChangeFamily = familiasB => event => {
        this.setState({ [familiasB]: event.target.value });
        console.log(this.state.familiasB);
        if (numeroVal(this.state.familiasB, 1, 7) == false) {
            document.getElementById("newProject-input4").style.borderColor = "red";
        } else if (this.state.familiasB === undefined) {
            document.getElementById("newProject-input4").style.borderColor = "white";

        } else {
            document.getElementById("newProject-input4").style.borderColor = "blue";

        }
    };

    handleChangeCrops = tiposCultivo => event => {
        event.preventDefault();
        this.setState({ [tiposCultivo]: event.target.value });
        console.log(rangoCaracteresVal(this.state.tiposCultivo, 2, 50));
        if (rangoCaracteresVal(this.state.tiposCultivo, 2, 50) == false) {
            document.getElementById("newProject-input5").style.borderColor = "red";
        } else if (this.state.tiposCultivo === undefined) {
            document.getElementById("newProject-input5").style.borderColor = "white";

        } else {
            document.getElementById("newProject-input5").style.borderColor = "blue";

        }
    };
    handleDeleteNameCrop(index, e) {
        e.preventDefault();

        this.setState(state => {
            const listNameCrops = this.state.listNameCrops;
            listNameCrops.splice(index, 1);
            return (
                listNameCrops
            )
        })
    }

    handleChangeInfoZona = infoZona => event => {
        this.setState({ [infoZona]: event.target.value });
        if (cantidadPalabrasVal(this.state.infoZona, 1, 100) == false) {
            document.getElementById("newProject-input6").style.borderColor = "red";
        } else if (this.state.infoZona === undefined) {
            document.getElementById("newProject-input6").style.borderColor = "white";
        } else {
            document.getElementById("newProject-input6").style.borderColor = "blue";
        }
    };

    handleChangeInversion = inversion => event => {
        this.setState({ [inversion]: event.target.value });
        if (puntoDecimalVal(this.state.inversion, 0, 12) == false) {
            document.getElementById("newProject-input10").style.borderColor = "red";
        } else if (this.state.inversion === undefined) {
            document.getElementById("newProject-input10").style.borderColor = "white";

        } else {
            document.getElementById("newProject-input10").style.borderColor = "blue";

        }
    };


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
            fotoP,
            inversion,
        } = this.state;

        return (

            <div id="new-proj-div" onSubmit={this.onSubmit}>

                <div id="new-proj-inputs">
                    <div id="main-title">Agregar Proyecto</div>

                    <ul id="all-inputs">
                        <li id="all-inputs-item">
                            <label>Titulo</label>
                            <br></br>
                            <input id="newProject-input1"
                                value={titulo}
                                onChange={project => this.setState(byPropKey('titulo', project.target.value))}
                                onChange={this.handleChangeTitle('titulo')}
                                // style={{borderColor:nombresVal(this.state.titulo)?"red":"blue"}}
                                type="text"
                            />
                        </li>
                        <li id="all-inputs-item">
                            <label>Descripción</label>
                            <br></br>
                            <textarea id="newProject-input2"
                                rows="3"
                                value={descripcion}
                                onChange={project => this.setState(byPropKey('descripcion', project.target.value))}
                                onChange={this.handleChangeDescription('descripcion')}
                                type="text"
                            />
                        </li>
                        {/*Momento*/}
                        {/*<li id="all-inputs-item">
                        <input id="newProject-input3"
                            value={ubicacion}
                            onChange={project => this.setState(byPropKey('ubicacion', project.target.value))}
                            type="text"
                            placeholder="ubicacion"
                        />
                    </li>
</div>*/}
                        <li id="all-inputs-item">
                            <label>Familias beneficiadas</label>
                            <br></br>
                            <input id="newProject-input4"
                                value={familiasB}
                                onChange={project => this.setState(byPropKey('familiasB', project.target.value))}
                                onChange={this.handleChangeFamily('familiasB')}
                                type="text"
                            />
                        </li>
                        <li id="all-inputs-item">
                            <label>Cultivos</label>
                            <br></br>
                            <p>Haz enter para agregar un elemento</p>
                            <input id="newProject-input5"
                                value={tiposCultivo}
                                onChange={project => this.setState(byPropKey('tiposCultivo', project.target.value))}
                                onChange={this.handleChangeCrops('tiposCultivo')}
                                type="text"
                                onKeyDown={e => this.handleKeyEnterAddCrop(e, e.target.value)}
                            />
                            <div>
                                { /**Muestra las imagenes que se han agregado en una lista
                            //Permite que se borren por medio del boton*/}
                                <ul>
                                    {this.state.listNameCrops.map((name, index) =>
                                        <li id="item" key={index} >{name}
                                            <button id="close-bt"onClick={(e) => this.handleDeleteNameCrop(index, e)}>
                                                <img id="icon-close"src={close} height="10"></img>
                                            </button>
                                        </li>)}
                                </ul>
                            </div>
                        </li>

                        <li id="all-inputs-item">
                        <label>Informacion de zona</label>
                            <br></br>
                            <textarea id="newProject-input6"
                                rows="3"
                                value={infoZona}
                                onChange={project => this.setState(byPropKey('infoZona', project.target.value))}
                                onChange={this.handleChangeInfoZona('infoZona')}
                                type="text"
                            />
                        </li>

                        <li id="all-inputs-item">
                            <label>Foto Familias</label>
                            <br></br>

                            <input id="newProject-input7"
                                value={fotoF}
                                ref={this.fotoF}
                                type="file"
                            />
                            <button id="bt-uploadProject" className="btn btn-secondary" onClick={this.addListImgFamilies}>Agregar foto</button>
                            <div>
                                { /**Muestra las imagenes que se han agregado en una lista
                            //Permite que se borren por medio del boton*/}
                                <ul>
                                    {this.state.listImgFamilies.map((img, index) =>
                                        <li key={index} >{img.name}
                                            <button onClick={(e) => this.handleDeleteImageFamily(index, e)}>X</button>
                                        </li>)}
                                </ul>
                            </div>

                        </li>
                        {/**Subir imagenes relacionadas con los cultivos */}
                        <li id="all-inputs-item">
                        <label>Foto Cultivos</label>
                        <br></br>

                            <input id="newProject-input8"
                                value={fotoC}
                                ref={this.fotoC}
                                type="file"
                            />
                            <button id="bt-uploadProject" className="btn btn-secondary" onClick={this.addListImgCrops}>Agregar foto</button>
                            <div>
                                { /**Muestra las imagenes que se han agregado en una lista
                            //Permite que se borren por medio del boton*/}
                                <ul>
                                    {this.state.listImgCrops.map((img, index) =>
                                        <li key={index} >{img.name}
                                            <button onClick={(e) => this.handleDeleteImageCrop(index, e)}>X</button>
                                        </li>)}
                                </ul>
                            </div>
                        </li>

                        <li id="all-inputs-item">
                            <label>Foto del Proyecto</label>
                            <br></br>

                            <input id="newProject-input9"
                                value={fotoP}
                                ref={this.fotoP}
                                type="file"
                                onChange={this.addImgProject}
                            />
                           

                        </li>
                         <img id="img-pro" src={this.state.previewPic} ></img>

                         
                        {/*Deberia hacerse con un spinner, en $ o LPS*/}
                        <li id="all-inputs-item">
                        <label>Inversion inicial</label>
                        <br></br>

                            <input id="newProject-input10"
                                value={inversion}
                                onChange={project => this.setState(byPropKey('inversion', project.target.value))}
                                onChange={this.handleChangeInversion('inversion')}
                                type="text"
                                placeholder="Inversion inicial"
                            />
                        </li>
                    </ul>
                    <button id="bt-addProject" className="btn btn-primary" onClick={this.handleSaveProject}>Crear Proyecto</button>



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