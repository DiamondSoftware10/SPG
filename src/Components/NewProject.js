import React, { Component } from "react";
import "./NewProject.css";
import { createProject } from "../Constants/project";
import fire from "../Firebase/Fire";

import {
  numeroVal,
  cantidadPalabrasVal,
  nombresVal,
  rangoCaracteresVal,
  urlImagenVal,
  puntoDecimalVal
} from "../Constants/validations";
import firebase from "firebase";
import MapContainer from "./GoogleMapsContainer";
import close from "../Icons/close.svg";
import defaultProjectPic from "../Images/nature.svg";
import { Carousel } from "react-responsive-carousel";
import "./Carousel.css";
import ItemHeading from "./Objects/ItemHeading";
import Input from "./Objects/Input";
import TextArea from "./Objects/TextArea";
import ComboBox from "./Objects/ComboBox";
import InputNumber from "./Objects/InputNumber";

const AddProject = () => (
  <div id="project">
    <NewProject />
  </div>
);

var arregloCultivos = [
  "Café",
  "Banano",
  "Plátano",
  "Piña",
  "Melón",
  "Ciruela",
  "Mora",
  "Aguacate",
  "Maracuyá",
  "Mango",
  "Cacao",
  "Marañon",
  "Coco",
  "Fresa",
  "Camote",
  "Ayote",
  "Berenjena",
  "Licha​",
  "Cítricos",
  "Naranja",
  "Toronja",
  "Limón",
  "limón",
  "Hortalizas",
  "Tomates",
  "Cebolla",
  "Pataste",
  "Espinaca",
  "Brócoli",
  "Lechuga",
  "Repollo",
  "Zanahoria",
  "Sandía",
  "Chile",
  "Patatas",
  "Pepino",
  "Acelga",
  "Yuca",
  "Remolacha",
  "Frijol",
  "Ejote",
  "Cacahuates",
  "Hierbas aromáticas",
  "Cilantro",
  "Albahaca",
  "Perejil",
  "Ajo",
  "Apio",
  "Jengibre",
  "Gramíneas",
  "Maíz",
  "Elote",
  "Caña de azúcar"
];

const INITIAL_STATE = {
  titulo: "",
  descripcion: "",
  ubicacion: "",
  familiasB: "",
  tiposCultivo: "",
  infoZona: "",
  inversion: ""
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
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
      listNameCrops: [],
      center: { lat: 14.0839053, lng: -87.2750132 },
      latitud: 0,
      longitud: 0,
      ubicacion: "",
      manzanasTotales: 0,
      inversionMinima: 0,
      inversionInicial: 0,
      trabajos: 0
    };
    /* CJ Changes */

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

    this.uploadImageToStorage = this.uploadImageToStorage.bind(this);

    this.handleSaveProject = this.handleSaveProject.bind(this);
    this.changeLocationFromChild = this.changeLocationFromChild.bind(this);
    this.getLocation = this.getLocation.bind(this);

    //        this.fileUploadCultivoHandler = this.fileUploadCultivoHandler.bind(this);
    //        this.fileUploadFamiliaHandler = this.fileUploadCultivoHandler.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.addListCrops = this.addListCrops.bind(this);
    this.deleteListCrops = this.deleteListCrops.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getInformation = this.getInformation.bind(this);
    this.getmanzanasTotales = this.getmanzanasTotales.bind(this);
    this.getInversion = this.getInversion.bind(this);

    this.getFamilyB = this.getFamilyB.bind(this);
    this.gettrabajos = this.gettrabajos.bind(this);
    this.getUbicación = this.getUbicación.bind(this);
  }
  //Nuevos metodos para recuperar los valores de los inputs
  getUbicación(value) {
    this.setState({
      ubicacion: value
    });
  }
  getTitle(value) {
    this.setState({
      titulo: value
    });
  }
  addListCrops(value) {
    this.setState({
      listNameCrops: this.state.listNameCrops.concat(value)
    });
  }

  deleteListCrops(index) {
    this.setState(() => {
      const listNameCrops = this.state.listNameCrops;
      listNameCrops.splice(index, 1);
      return listNameCrops;
    });
  }
  getDescription(value) {
    this.setState({
      descripcion: value
    });
  }
  getInformation(value) {
    this.setState({
      infoZona: value
    });
  }
  getmanzanasTotales(value) {
    this.setState({
      manzanasTotales: value,
      inversionMinima: this.state.inversionInicial * value
    });
  }

  gettrabajos(value) {
    this.setState({
      trabajos: value
    });
  }
  getFamilyB(value) {
    this.setState({
      familiasB: value
    });
  }
  getInversion(value) {
    this.setState({
      inversionInicial: value,
      inversionMinima: this.state.manzanasTotales * value
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
      });
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
          const listImgCrops = state.listImgCrops.concat(
            this.fotoC.current.files[0]
          );
          return {
            listImgCrops
          };
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
          const listImgFamilies = state.listImgFamilies.concat(
            this.fotoF.current.files[0]
          );
          return {
            listImgFamilies
          };
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

  uploadImageToStorage = () => {
    this.state.listImgCrops.forEach(fileImg => {
      firebase
        .storage()
        .ref()
        .child(fileImg.name)
        .put(fileImg);
    });
    this.state.listImgFamilies.forEach(fileImg => {
      firebase
        .storage()
        .ref()
        .child(fileImg.name)
        .put(fileImg);
    });
    firebase
      .storage()
      .ref()
      .child(this.fotoP.current.files[0].name)
      .put(this.fotoP.current.files[0]);

    this.setState({
      listImgCrops: [],
      listImgFamilies: [],
      previewPic: ""
    });
    document.getElementById("newProject-input9").value = "";
  };

  /**
    //  @description borra la imagen del array
    // @author Diego Mendoza ,Jahaziel Moreno
    */
  handleDeleteImageCrop = (index, event) => {
    event.preventDefault();

    this.setState(state => {
      const listImgCrops = this.state.listImgCrops;
      listImgCrops.splice(index, 1);
      return listImgCrops;
    });
  };
  /**
   //  @description borra la imagen del array
   // @author Diego Mendoza ,Jahaziel Moreno
   */
  handleDeleteImageFamily = (index, event) => {
    event.preventDefault();

    this.setState(state => {
      const listImgFamilies = this.state.listImgFamilies;
      listImgFamilies.splice(index, 1);
      return listImgFamilies;
    });
  };
  /**
   *
   * @param {project}
   * @description guarda los proyectos en la base de datos
   */
  async handleSaveProject(project) {
    const db = fire.firestore();
    const projectRef = db.collection("projects");
    project.preventDefault();
    if (
      this.state.titulo !== "" &&
      this.state.titulo !== undefined &&
      this.fotoP.current.files[0].name !== undefined &&
      this.fotoP.current.files[0].name !== "" &&
      this.state.inversionInicial !== "" &&
      this.state.inversionInicial !== undefined &&
      this.state.infoZona !== "" &&
      this.state.infoZona !== undefined &&
      this.state.descripcion !== "" &&
      this.state.descripcion !== undefined &&
      this.state.listNameCrops.length !== 0 &&
      this.state.ubicacion !== "" &&
      this.state.ubicacion !== undefined &&
      this.state.manzanasTotales !== "" &&
      this.state.manzanasTotales !== undefined &&
      this.state.trabajos !== "" &&
      this.state.trabajos !== undefined &&
      this.state.listImgCrops.length !== 0 &&
      this.state.listImgFamilies.length !== 0
    ) {
      //Agrega en la base de datos los nombres de las imagenes para cada uno//
      let nameImgRefCrops = [];
      await this.state.listImgCrops.forEach(img => {
        nameImgRefCrops.push(`${img.name}`);
      });
      let nameImgRefFamilies = [];
      await this.state.listImgFamilies.forEach(img => {
        nameImgRefFamilies.push(`${img.name}`);
      });

      let temp = new Date();
      let fecha =
        temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear();
      let ref = projectRef.doc();
      ref
        .set({
          id: ref.id,
          title: this.state.titulo,
          timeProdxDay: 0,
          raisedMoney: 0,
          projectFinan: 0,
          picProject: this.fotoP.current.files[0].name,
          picFam: nameImgRefFamilies,
          picCultures: nameImgRefCrops,
          coordinates: new firebase.firestore.GeoPoint(
            parseFloat(this.state.center.lat, 10),
            parseFloat(this.state.center.lng, 10)
          ),
          investor: "",
          investInitxBlock: this.state.inversionInicial,
          infoZone: this.state.infoZona,
          detailsProdxBlocks: "",
          description: this.state.descripcion,
          creationDate: fecha,
          available: true,
          cultures: this.state.listNameCrops,
          locate: this.state.ubicacion,
          manzanasTotales: this.state.manzanasTotales,
          manzanasRestantes: this.state.manzanasTotales,
          trabajosGen: this.state.trabajos
        })
        .then(
          this.setState({
            titulo: "",
            descripcion: "",
            ubicacion: "",
            familiasB: "",
            tiposCultivo: "",
            infoZona: "",
            inversion: "",
            listNameCrops: [],
            inversionInicial: "",
            manzanasTotales: "",
            trabajos: ""
            // center: { lat: 0, lng: 0 }
          })
        );
      await this.uploadImageToStorage();

      window.alert(`Se ha agregegado el proyecto ${this.state.titulo}`);
    } else {
      window.alert(`Todos los campos deben estar llenados correctamente`);
    }
  }

  changeLocationFromChild(latitude, longitude) {
    console.log("child center :" + latitude + ", " + longitude);
    this.setState({
      center: { lat: latitude, lng: longitude }
    });
  }

  getLocation() {
    this.setState({
      center: { lat: this.state.latitud, lng: this.state.longitud }
    });
  }

  render() {
    const style = {
      /*width: '50vw',
            height: '75vh',*/
      width: "45vw",
      height: "40vh",
      marginLeft: "0",
      marginRight: "0"
    };

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
      inversion
    } = this.state;

    return (
      <div>
        <div className="graphic-lg" />
        <h1 className="main-title">Nuevo Proyecto</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="flex-content" id="add-flex">
            <ItemHeading
              number="1"
              title="Datos Generales"
              subtitle="Informacion basica del proyecto"
            />

            <div className="flexbox" id="input-flex">
              <Input
                label="Titulo"
                type="text"
                getValue={this.getTitle}
                alert="El titulo debe empezar con una letra mayuscula"
                regex="^[A-Z][a-zA-ZñÑíÍáÁéÉóÓúÚ\s]"
                placeholder="e.g. Terreno San Lorenzo"
              />
              <TextArea
                label="Descripción del proyecto"
                placeholder="Breve descripcion del proyecto"
                getValue={this.getDescription}
              />
            </div>
            <ItemHeading
              number="2"
              title="Información del Terreno"
              subtitle="Datos edofaclimaticos y de cultivos del terreno"
            />
            <div className="flexbox" id="input-flex">
              <ComboBox
                label="Cultivos"
                add={this.addListCrops}
                delete={this.deleteListCrops}
                array={arregloCultivos}
              />
              <TextArea
                label="Informacion de la zona"
                placeholder="¿Qué tal es esta zona para la agricultura?"
                getValue={this.getInformation}
              />
              <InputNumber
                label="Número de manzanas"
                placeholder=""
                getValue={this.getmanzanasTotales}
              />
            </div>
            <ItemHeading
              number="3"
              title="Financiamiento"
              subtitle="Información monetaria del proyecto"
            />
            <div className="flexbox" id="input-flex">
              <InputNumber
                label="Inversion por manzana"
                placeholder=""
                getValue={this.getInversion}
              />
              <div class="form-group">
                <label>Inversión minima</label>
                <h3>{`${this.state.inversionInicial} X ${
                  this.state.manzanasTotales
                }\n=$${this.state.manzanasTotales *
                  this.state.inversionInicial}`}</h3>
              </div>
            </div>
            <ItemHeading
              number="4"
              title="Impacto social"
              subtitle="¿Como el proyecto impacta en la comunidad?"
            />
            {/** Numero de familias beneficiadas*/}
            <div className="flexbox" id="input-flex">
              <InputNumber
                label="Familias Beneficiadas"
                placeholder=""
                getValue={this.getFamilyB}
              />
              <InputNumber
                label="Trabajos generados"
                placeholder=""
                getValue={this.gettrabajos}
              />
            </div>
            {/** Trabajo generado*/}
            <ItemHeading number="5" title="Fotos" subtitle="" />
            <li id="all-inputs-item">
              <label>Foto del proyecto</label>
              <br />
              <input
                id="newProject-input9"
                value={fotoP}
                ref={this.fotoP}
                type="file"
                onChange={this.addImgProject}
              />
              {this.state.previewPic ? (
                <img id="img-pro" src={this.state.previewPic} />
              ) : (
                <img id="img-pro" src={defaultProjectPic} />
              )}
            </li>
            <li id="all-inputs-item">
              <label>Foto de familias</label>
              <br />

              <input
                id="newProject-input7"
                value={fotoF}
                ref={this.fotoF}
                type="file"
              />
              <button
                id="bt-uploadProject"
                className="btn btn-secondary"
                onClick={this.addListImgFamilies}
              >
                Agregar foto
              </button>
              <div>
                {/**Muestra las imagenes que se han agregado en una lista
                            //Permite que se borren por medio del boton*/}
                {/*<ul>
                                    {this.state.listImgFamilies.map((img, index) =>
                                        <li key={index} >{img.name}
                                            <button onClick={(e) => this.handleDeleteImageFamily(index, e)}>X</button>
                                        </li>)}
                                </ul>*/}
                <div maxWidth="10em" maxheight="10em">
                  <Carousel
                    showThumbs={false}
                    statusFormatter={(current, total) =>
                      `${current} de ${total}`
                    }
                    infiniteLoop={true}
                  >
                    {this.state.listImgFamilies.map((img, index) => (
                      <div>
                        <button
                          id="delete-icon"
                          onClick={e => this.handleDeleteImageFamily(index, e)}
                        >
                          X
                        </button>
                        <img src={URL.createObjectURL(img)} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </li>
            {/**Subir imagenes relacionadas con los cultivos */}
            <li id="all-inputs-item">
              <label>Foto de cultivos</label>
              <br />
              <input
                id="newProject-input8"
                value={fotoC}
                ref={this.fotoC}
                type="file"
              />
              <button
                id="bt-uploadProject"
                className="btn btn-secondary"
                onClick={this.addListImgCrops}
              >
                Agregar foto
              </button>
              <div>
                {/**Muestra las imagenes que se han agregado en una lista
                            //Permite que se borren por medio del boton*/}
                {/*<ul>
                                    {this.state.listImgCrops.map((img, index) =>
                                        <li key={index} >{img.name}
                                            <button onClick={(e) => this.handleDeleteImageCrop(index, e)}>X</button>
                                        </li>)}
                                </ul>*/}
                <Carousel
                  showThumbs={false}
                  statusFormatter={(current, total) => `${current} de ${total}`}
                  infiniteLoop={true}
                >
                  {this.state.listImgCrops.map((img, index) => (
                    <div>
                      <button
                        id="delete-icon"
                        onClick={e => this.handleDeleteImageCrop(index, e)}
                      >
                        X
                      </button>
                      <img
                        src={URL.createObjectURL(img)}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </li>

            <ItemHeading number="6" title="Ubicación" subtitle="" />
            <Input
              label="Dirección exacta"
              type="text"
              getValue={this.getUbicación}
              alert="Cualquier valor"
              regex="[.]*"
              placeholder="e.g Salida al norte de San Pedro Sula"
            />
            <div id="add-map-div" className="container">
              <div className="card" style={style}>
                {/*<label>Coordenadas Geográficas</label> */}

                <MapContainer
                  type="newproject"
                  changeLocationFromChild={this.changeLocationFromChild}
                  initialCenter={{
                    lat: this.state.center.lat,
                    lng: this.state.lng
                  }}
                  center={this.state.center}
                />
              </div>
            </div>
            <button
              id="bt-addProject"
              className="btn btn-primary"
              onClick={this.handleSaveProject}
            >
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProject;
