import React, { Component } from "react";
import "./NewProject.css";
import { createProject } from "../Constants/project";
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
      numeroManzanas: 0,
      inversionMinima: 0,
      inversionInicial: 0,
      jobs:0
    };
    /* CJ Changes */
    this.handleSubmit = this.handleSubmit.bind(this);

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
    this.changeLocationFromChild = this.changeLocationFromChild.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.handleChangeUbicacion = this.handleChangeUbicacion.bind(this);

    //        this.fileUploadCultivoHandler = this.fileUploadCultivoHandler.bind(this);
    //        this.fileUploadFamiliaHandler = this.fileUploadCultivoHandler.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.addListCrops = this.addListCrops.bind(this);
    this.deleteListCrops = this.deleteListCrops.bind(this);
    this.getDescription = this.getDescription.bind(this);
    this.getInformation = this.getInformation.bind(this);
    this.getNumeroManzanas = this.getNumeroManzanas.bind(this);
    this.getInversion = this.getInversion.bind(this);
    
    this.getFamilyB = this.getFamilyB.bind(this);
    this.getJobs = this.getJobs.bind(this);
  }
  //Nuevos metodos para recuperar los valores de los inputs
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
  getNumeroManzanas(value) {
    this.setState({
      numeroManzanas: value,
      inversionMinima: this.state.inversionInicial * value
    });
  }

  getJobs(value) {
    this.setState({
      jobs: value
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
      inversionMinima: this.state.numeroManzanas * value
    });
  }
  handleSubmit(e) {
    console.log(e.target.input.value);
  }

  async componentWillMount() {
    firebase
      .storage()
      .ref()
      .child("Campo2.jpg")
      .getDownloadURL()
      .then(url => {
        this.setState({
          pic: url
        });
      })
      .catch(function(error) {
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
    const {
      titulo,
      descripcion,
      ubicacion,
      familiasB,
      tiposCultivo,
      infoZona,
      inversion
    } = this.state;

    const { history } = this.props;
    let tituloBool = document.getElementById("newProject-input1").value;
    let descripcionBool = document.getElementById("newProject-input2").value;
    let familias = document.getElementById("newProject-input4").value;
    let tiposCultivos = document.getElementById("newProject-input5").value;
    let infoZonas = document.getElementById("newProject-input6").value;
    let inversionInicial = document.getElementById("newProject-input10").value;

    //Validacion para que no quiebre al dar click con todo en blanco y que no haga nada en la base de datos
    //Validar, quiebra
    if (
      titulo === undefined ||
      descripcion === undefined ||
      familiasB === undefined ||
      infoZona === undefined ||
      inversion === undefined
    ) {
      window.alert("Error al ingresar proyecto, llene todos los campos");
    } else if (this.state.listNameCrops.length == 0) {
      window.alert("Agregue algunos cultivos");
    } else if (this.state.listImgFamilies.length == 0) {
      window.alert("Agregue algunas fotos de las familias");
    } else if (this.state.listImgCrops.length == 0) {
      window.alert("Agregue algunas fotos de los cultivos");
    } else if (this.fotoP.current.files[0] == undefined) {
      window.alert("Agregue una foto para el proyecto");
    } else if (
      nombresVal(tituloBool, 1, 50) == false ||
      cantidadPalabrasVal(descripcionBool, 1, 100) == false ||
      ubicacion == false ||
      numeroVal(familias, 1, 7) == false ||
      cantidadPalabrasVal(infoZonas, 1, 100) == false ||
      puntoDecimalVal(inversionInicial, 1, 12) == false
    ) {
      window.alert(
        "Error al ingresar proyecto, verifique los datos de entrada"
      );
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
       * @param {title,timeProdxDay,raisedMoney,projectFinan,picProject,picFam,picCultures,coordinates,investor,investInitxBlock,infoZone,detailsProdxBlocks,desciption,creationDate,available,cultures, locate}
       */
      let temp = new Date();
      let fecha =
        temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear();
      createProject(
        this.state.titulo,
        0,
        0,
        0,
        this.fotoP.current.files[0].name,
        nameImgRefFamilies,
        nameImgRefCrops,
        new firebase.firestore.GeoPoint(
          parseFloat(this.state.center.lat, 10),
          parseFloat(this.state.center.lng, 10)
        ),
        "",
        this.state.inversion,
        this.state.infoZona,
        "",
        this.state.descripcion,
        fecha,
        true,
        this.state.listNameCrops,
        this.state.ubicacion
      ).then(
        this.setState({
          titulo: "",
          descripcion: "",
          ubicacion: "",
          familiasB: "",
          tiposCultivo: "",
          infoZona: "",
          inversion: "",
          listNameCrops: []
          // center: { lat: 0, lng: 0 }
        })
      );
      await this.uploadImageToStorage();

      window.alert(`Se ha agregegado el proyecto ${this.state.titulo}`);
    }
    project.preventDefault();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(event.target.value);
  };

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

  handleKeyEnterAddCrop = (event, cultivo) => {
    console.log(event.keyCode);

    if (event.keyCode === 13) {
      this.setState({
        listNameCrops: this.state.listNameCrops.concat(cultivo),
        tiposCultivo: ""
      });
    }
  };

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
    if (cantidadPalabrasVal(this.state.descripcion, 0, 100) == false) {
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
      return listNameCrops;
    });
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

  handleChangeUbicacion = ubicacion => event => {
    this.setState({ [ubicacion]: event.target.value });
    console.log(this.state.ubicacion);
    if (numeroVal(this.state.ubicacion, 1, 7) == false) {
      document.getElementById("newProject-input7").style.borderColor = "red";
    } else if (this.state.ubicacion === undefined) {
      document.getElementById("newProject-input7").style.borderColor = "white";
    } else {
      document.getElementById("newProject-input7").style.borderColor = "blue";
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
        <h1>Nuevo Proyecto</h1>
        {/**Tipos de entrada*/}
        {/**Text*/}
        {/**TextArea*/}
        {/**Number*/}
        {/**ListaTexto*/}
        {/**Lista foto*/}
        {/**ComboBox*/}
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
              {/**Cultivos cambiar*/}
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
                getValue={this.getNumeroManzanas}
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
                <label>Inversion minima</label>
                <h3>{`${this.state.inversionInicial} X ${
                  this.state.numeroManzanas
                }\n=$${this.state.numeroManzanas *
                  this.state.inversionInicial}`}</h3>
              </div>
            </div>
            <ItemHeading number="4" title="Impacto social" subtitle="¿Como el proyecto impacta en la comunidad?" />
            {/** Numero de familias beneficiadas*/}
            <InputNumber
              label="Familias Beneficiadas"
              placeholder=""
              getValue={this.getFamilyB}
            />
            <InputNumber
              label="Trabajos generados"
              placeholder=""
              getValue={this.getJobs}
            />
            {/** Trabajo generado*/}
            <ItemHeading number="5" title="Fotos" subtitle="" />
            {/** Lista de fotos proyectos*/}
            {/** Lista de fotos de familias*/}
            {/** Lista de fotos de proyectos*/}

            <ItemHeading number="6" title="Ubicación" subtitle="" />
          </div>
        </form>

        <div id="new-proj-inputs">
          <ul className="flexbox" id="all-inputs">
            <li id="all-inputs-item">
              <label>Titulo</label>
              <br />
              <input
                id="newProject-input1"
                value={titulo}
                onChange={project =>
                  this.setState(byPropKey("titulo", project.target.value))
                }
                onChange={this.handleChangeTitle("titulo")}
                // style={{borderColor:nombresVal(this.state.titulo)?"red":"blue"}}
                type="text"
              />
            </li>
            <li id="all-inputs-item">
              <label>Descripción</label>
              <br />
              <textarea
                id="newProject-input2"
                rows="3"
                value={descripcion}
                onChange={project =>
                  this.setState(byPropKey("descripcion", project.target.value))
                }
                onChange={this.handleChangeDescription("descripcion")}
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
              <label>Numero de familas beneficiadas</label>
              <br />
              <input
                id="newProject-input4"
                value={familiasB}
                onChange={project =>
                  this.setState(byPropKey("familiasB", project.target.value))
                }
                onChange={this.handleChangeFamily("familiasB")}
                type="number"
                min="0"
              />
            </li>
            <li id="all-inputs-item">
              <label>Cultivos</label>
              <br />
              <input
                id="newProject-input5"
                value={tiposCultivo}
                onChange={project =>
                  this.setState(byPropKey("tiposCultivo", project.target.value))
                }
                onChange={this.handleChangeCrops("tiposCultivo")}
                type="text"
                placeholder="Presione Enter para agregar una etiqueta"
                onKeyDown={e => this.handleKeyEnterAddCrop(e, e.target.value)}
              />
              <div>
                <ul>
                  {this.state.listNameCrops.map((name, index) => (
                    <li id="item" key={index}>
                      {name}
                      <button
                        id="close-bt"
                        onClick={e => this.handleDeleteNameCrop(index, e)}
                      >
                        <img id="close-icon" src={close} height="10" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li id="all-inputs-item">
              <label>Informacion de la zona</label>
              <br />
              <textarea
                id="newProject-input6"
                rows="3"
                value={infoZona}
                onChange={project =>
                  this.setState(byPropKey("infoZona", project.target.value))
                }
                onChange={this.handleChangeInfoZona("infoZona")}
                type="text"
              />
            </li>
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
                <Carousel
                  showThumbs={false}
                  statusFormatter={(current, total) => `${current} de ${total}`}
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
            {/*Deberia hacerse con un spinner, en $ o LPS*/}
            <li id="all-inputs-item">
              <label>Inversion inicial</label>
              <br />
              <label>$</label>
              <input
                id="newProject-input10"
                value={inversion}
                onChange={project =>
                  this.setState(byPropKey("inversion", project.target.value))
                }
                onChange={this.handleChangeInversion("inversion")}
                type="number"
                min="5"
                step="5"
                placeholder="Inversion inicial"
              />
            </li>

            <li id="all-inputs-item">
              <label>Ubicación</label>
              <br />
              <input
                id="newProject-input7"
                value={ubicacion}
                onChange={project =>
                  this.setState(byPropKey("ubicacion", project.target.value))
                }
                onChange={this.handleChangeUbicacion("ubicacion")}
                type="text"
              />
            </li>

            <li>
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

                {/*
    <div className="form-group col-sm">
                                    <label htmlFor="usr">Latitud:</label>
                                    <input
                                        onChange={this.handleChange('latitud')}
                                        type="text" className="form-control" id="lugar" />
                                </div>
                                <div className="form-group col-sm">
                                    <label htmlFor="usr">Longitud:</label>
                                    <input
                                        onChange={this.handleChange('longitud')}
                                        type="text" className="form-control" id="direccion" />
                                </div>
     
                                <div>
                                                                    <button className="btn btn-secondary" onClick={this.getLocation}> Guardar ubicación</button>
                                
                                                                </div>
                                
                                    */}
              </div>
            </li>
          </ul>
          <br />
          <button
            id="bt-addProject"
            className="btn btn-primary"
            onClick={this.handleSaveProject}
          >
            Crear Proyecto
          </button>
        </div>
        {/*
                <div id="new-proj-graphic">
                    <img id="graphic" src="https://bit.ly/2UsoZO1"></img>
                </div>
                
    */}
      </div>
    );
  }
}

export default AddProject;
