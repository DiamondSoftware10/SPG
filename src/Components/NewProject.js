import React, { Component } from 'react';
import * as routes from '../Constants/Routes';
import './NewProject.css';
import { createProject } from '../Constants/firebase';

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
    fotoT: '',
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


class NewProject extends Component {

    constructor(props) {
        super(props);
        this.state = { INITIAL_STATE };


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
        } = this.state;

        return (

            <div onSubmit={this.onSubmit}>

                <ul id="all-inputs">
                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={titulo}
                            onChange={project => this.setState(byPropKey('titulo', project.target.value))}
                            type="text"
                            placeholder="titulo"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={descripcion}
                            onChange={project => this.setState(byPropKey('descripcion', project.target.value))}
                            type="text"
                            placeholder="descripcion"
                        />
                    </li>
                    {/*Momento*/}
                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={ubicacion}
                            onChange={project => this.setState(byPropKey('ubicacion', project.target.value))}
                            type="text"
                            placeholder="ubicacion"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={familiasB}
                            onChange={project => this.setState(byPropKey('familiasB', project.target.value))}
                            type="text"
                            placeholder="Numero de familias benficiadas"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={tiposCultivo}
                            onChange={project => this.setState(byPropKey('tiposCultivo', project.target.value))}
                            type="text"
                            placeholder="Tipos de Cultivo, pongalos con , por favor  "
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={infoZona}
                            onChange={project => this.setState(byPropKey('infoZona', project.target.value))}
                            type="text"
                            placeholder="Informacion de zona"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={fotoF}
                            onChange={project => this.setState(byPropKey('fotoF', project.target.value))}
                            type="text"
                            placeholder="Foto de familias beneficiadas"
                        />
                    </li>

                    <li id="all-inputs-item">
                        <input id="newProject-input"
                            value={fotoC}
                            onChange={project => this.setState(byPropKey('fotoC', project.target.value))}
                            type="text"
                            placeholder="Foto de cultivos"
                        />
                    </li>

                </ul>

                <button id="bt-addProject" className="w3-button w3-round-xxlarge" onClick={this.onClick}>Add</button>


            </div>

        );
    }
}

export default AddProject;



