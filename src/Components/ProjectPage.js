import React, { Component } from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import * as routes from "../Constants/Routes";
import MapContainer from "./GoogleMapsContainer";
import fire from "../Firebase/Fire";
import { Progress, Icon, Carousel, Tabs } from "antd";

import LoginRegisterModal from "./LoginRegisterModal";

import loc from "../Icons/placeholder.svg";
import close from "../Icons/close.svg";
import add from "../Icons/add.svg";
import sub from "../Icons/subtract.svg";
import icon from "../Icons/iconbeta.png";

import "./ProjectPage.css";
const TabPane = Tabs.TabPane;

var db = fire.firestore();

const ProjectPage = () => (
  <div className="page-container">
    <ProjectInfo id="uIUyXBNxz8BZ7atc6gh6" />
  </div>
);

export class ProjectInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      foto: "",
      cultivos: [],
      invMin: 0,
      empleoGen: "23",
      title: "Nombre",
      culture: "",
      description: "",
      infoZone: "",
      investor: "",
      projFinan: "",
      raisedMoney: "",
      location: "Ubicacion",
      progress: "",
      empleosGen: "",
      fotosFamilias: [],
      fotosFamiliasUrl: [],

      pago: 0,
      showInvest: false,
      showLoginModal: false,
      showConfirmation: false,
      manzanas: 1,
      current: "general"
    };

    this.handleInvestButton = this.handleInvestButton.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
    this.handleCloseLoginModal = this.handleCloseLoginModal.bind(this);
    this.readDB = this.readDB.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleOpenInvestModal = this.handleOpenInvestModal.bind(this);
    this.handleCloseInvestModal = this.handleCloseInvestModal.bind(this);
    this.handleAddManzana = this.handleAddManzana.bind(this);
    this.handleSubManzana = this.handleSubManzana.bind(this);
    this.handleOpenConfirmation = this.handleOpenConfirmation.bind(this);
    this.handleCloseConfirmation = this.handleCloseConfirmation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    this.readDB();
  }

  handleClick = e => {
    console.log("click ", e);
    this.setState({
      current: e.key
    });
  };

  async readDB() {
    await this.setState({
      id: this.props.id
    });
    console.log("ID " + this.state.id);
    var id = this.state.id;

    var title = "";
    var culture;
    var description;
    var infoZone;
    var investor;
    var projFinan;
    var raisedMoney;
    var invMin;
    var location;
    var empleos;
    var fotosFamilias;

    //Capturar el proyecto correspondiente de la base de datos
    var project = db
      .collection("projects")
      .doc(
        /*MODIFICAR-----------------*/ id /*---------------------MPODIFICAR*/
      );

    await project.get().then(async function(snap) {
      if (snap.exists) {
        title = snap.data().title;
        culture = snap.data().cultures;
        description = snap.data().description;
        infoZone = snap.data().infoZone;
        investor = snap.data().investor;
        projFinan = snap.data().projectFinan;
        raisedMoney = snap.data().raisedMoney;
        invMin = snap.data().investInitxBlock;
        location = snap.data().locate;

        empleos = snap.data().trabajosGen;
        fotosFamilias = snap.data().picFam;

        console.log("FOTOS: " + fotosFamilias);
      } else {
        console.log("No such doc");
      }
    });
    this.setState({
      title: title,
      culture: culture,
      description: description,
      infoZone: infoZone,
      investor: investor,
      projFinan: projFinan,
      raisedMoney: raisedMoney,
      invMin: invMin,
      pago: invMin,
      location: location,
      progress: Math.round((raisedMoney / projFinan) * 100),
      empleosGen: empleos,
      fotosFamilias: fotosFamilias
    });
    console.log(this.state.progress);
    var fotosFamiliasUrl = [];
    console.log("FOTOS STATE: " + this.state.fotosFamilias);

    await this.state.fotosFamilias.map((doc, i) => {
      fire
        .storage()
        .ref()
        .child(doc)
        .getDownloadURL()
        .then(url => {
          fotosFamiliasUrl.push(url);
          this.setState({
            id: this.props.id
          });
          this.setState({
            fotosFamiliasUrl: fotosFamiliasUrl
          });
        });

      console.log("Foto " + i + ": " + doc);
    });
  }

  handleOpenInvestModal() {
    var manzanas = 1;
    var id = this.props.id;
    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        const item = db
          .collection("users")
          .doc(user.uid)
          .collection("cartera")
          .doc(id);
        console.log(user.uid);
        await item.get().then(function(snap) {
          console.log(snap.exists);
          if (snap.exists) {
            manzanas = snap.data().manzanas;
            console.log(manzanas);
            console.log("yes");
          }
        });
      }
      this.setState({
        showInvest: true,
        manzanas: manzanas,
        pago: this.state.invMin * manzanas
      });
    });
  }

  handleCloseInvestModal() {
    this.setState({
      showInvest: false
    });
  }

  handleOpenConfirmation() {
    this.setState({
      showConfirmation: true
    });
  }

  handleCloseConfirmation() {
    this.setState({
      showConfirmation: false
    });
    //this.handleCloseModal();
  }

  handleInvestButton() {
    console.log("entro login modal");
    fire.auth().onAuthStateChanged(user => {
      user ? this.handleOpenInvestModal() : this.handleOpenLoginModal();
    });
  }

  handleOpenLoginModal() {
    this.setState({
      showLoginModal: true
    });
  }

  handleCloseLoginModal() {
    this.setState({
      showLoginModal: false
    });
  }

  handleAddToCart() {
    var id = this.props.id;
    var utc = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    var d = new Date();
    var n = d.toLocaleDateString;
    var man = this.state.manzanas;
    var pag = this.state.pago;

    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        const database = fire.firestore();

        var docData = {
          id: id,
          inversion: 5.99,
          fecha: utc,
          manzanas: man,
          pago: pag
        };
        const collection = database
          .collection("users")
          .doc(user.uid)
          .collection("cartera")
          .doc(id);

        const collProject = database.collection("projects").doc(id);

        collProject.get().then(snapshot => {
          console.log("hey");
          console.log(snapshot.data().title);
          var docFinal = Object.assign(docData, snapshot.data());
          collection.set(docFinal);
        });
      } else {
      }
    });
    this.handleCloseInvestModal();
    this.handleOpenConfirmation();
  }

  handleAddManzana() {
    this.setState({
      manzanas: this.state.manzanas + 1
    });
    console.log(this.state.manzanas);
    var man = this.state.manzanas + 1;

    this.setState({
      pago: man * this.state.invMin
    });
  }

  handleSubManzana() {
    if (this.state.manzanas > 1) {
      this.setState({
        manzanas: this.state.manzanas - 1
      });
      var man = this.state.manzanas - 1;
      this.setState({
        pago: man * this.state.invMin
      });
    }
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

    const fotosFamilias = this.state.fotosFamiliasUrl.map(doc => {
      return <img className="carousel-image" src={doc} />;
    });

    return (
      <div>
        <div>
          <Tabs tabPosition="bottom" size="large">
            <TabPane tab="General" key="1">
              <div id="modal-flex">
                <div id="main-flex">
                  <div id="img-div">
                    <img
                      id="modal-img"
                      onClick={this.handleOpenModal}
                      src={this.props.foto}
                    />
                  </div>
                </div>

                <div id="side-flex">
                  <div id="sidebar">
                    {/*
                                                    <div>
                                                        <h6>Inversionista </h6>
                                                        <h3>{this.state.investor}</h3>
                                                    </div>
                                                */}
                    <div>
                      <div id="terr-head">Terreno</div>
                    </div>
                    <div id="proj-title">
                      <h2>{this.state.title}</h2>
                      <div id="proj-location">
                        <Icon type="environment" />
                        {this.state.location}
                      </div>
                    </div>

                    <div>
                      <h5>Descripción </h5>
                      <p>{this.state.description}</p>
                    </div>
                    <div className="full-width">
                      <h5>Progreso</h5>
                      <div className="center">
                        <Progress
                          className="full-width"
                          width={80}
                          percent={this.state.progress}
                          showInfo={false}
                        />
                      </div>

                      <h4 id="percent-goal">
                        {this.state.progress}% de ${this.state.projFinan}
                      </h4>
                    </div>
                    <div className="info-flex">
                      <div>
                        <h3>${this.state.invMin}</h3>
                        <h6>Inversión minima por manzana</h6>
                      </div>
                      <div>
                        <h3>${this.state.raisedMoney}</h3>
                        <h6>Dinero recaudado</h6>
                      </div>
                      <div>
                        <h3>{this.state.empleosGen}</h3>
                        <h6>Empleos generados</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Fotos" key="2">
            <div id="carousel-div">
              <Carousel>
                {fotosFamilias}
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
              </div>
            </TabPane>
            <TabPane tab="Datos Geograficos" key="3">
              <h5>Información de la Zona </h5>
              <p>{this.state.infoZone}</p>
              <br />

              <h5>Ubicación</h5>
              {/*
            <div style={style} className="card" id="gmap">
              
                      <MapContainer
                        zoom={12}
                        initialCenter={{
                          lat: this.props.center.lat,
                          lng: this.props.center.lng
                        }}
                        center={{
                          lat: this.props.center.lat,
                          lng: this.props.center.lng
                        }}
                      />
                   
            </div>

            <br />
             */}
            </TabPane>
          </Tabs>
          <div className="invest-nav">
            <button
              className="btn btn-primary"
              id="btn-invest"
              onClick={() => this.handleInvestButton()}
            >
              Invertir
            </button>
          </div>
          {/*
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="invest-nav"
          >
            <Menu.Item key="general">
              <div className="invest-nav-item">
                <Icon type="layout" />
                General
              </div>
            </Menu.Item>
            <Menu.Item key="app">
              <div className="invest-nav-item">
                <Icon type="picture" />
                Fotos
              </div>
            </Menu.Item>

            <Menu.Item key="alipay">
              <a
                href="https://ant.design"
                target="_blank"
                rel="noopener noreferrer"
              >
                Datos Geograficos
              </a>
            </Menu.Item>
            <button
              className="btn btn-primary"
              id="btn-invest"
              onClick={() => this.handleInvestButton()}
            >
              Invertir
            </button>
          </Menu>

          
            <button
              className="btn btn-primary"
              id="btn-add-cart"
              onClick={() => this.handleInvestButton()}
            >
              Invertir
            </button>
             */}
        </div>

        <ReactModal
          isOpen={this.state.showInvest}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseInvestModal}
          className="ModalBack animated fadeIn faster"
          overlayClassName="Overlay"
        >
          <div className="Modal invest-modal">
            <button
              className="hollow button"
              id="close-button"
              onClick={this.handleCloseInvestModal}
            >
              <img id="proj-icon" src={close} />
            </button>
            <h3 className="modal-title">Elegir inversión</h3>
            <div id="precart-flex">
              <div className="flexbox">
                <div id="flex-head">Manzanas</div>
                <div className="flexbox" id="number-flex">
                  <div>
                    <img
                      onClick={this.handleSubManzana}
                      id="add-icon"
                      src={sub}
                    />
                  </div>
                  <div className="amount-number">{this.state.manzanas}</div>
                  <div>
                    <img
                      onClick={this.handleAddManzana}
                      id="add-icon"
                      src={add}
                    />
                  </div>
                </div>
              </div>
              <div id="total-flex">
                <div id="total-text">Total</div>
                <div id="total-num">${this.state.pago}</div>
              </div>
              <button
                className="btn btn-primary"
                id="btn-add-cart"
                onClick={() => this.handleAddToCart()}
              >
                Agregar a cartera
              </button>
            </div>
          </div>
        </ReactModal>

        <LoginRegisterModal
          showLoginModal={this.state.showLoginModal}
          handleCloseLoginModal={this.handleCloseLoginModal}
          subtitle="Debes iniciar sesion para invertir en un proyecto"
        />

        <ReactModal
          isOpen={this.state.showConfirmation}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseConfirmation}
          className="ModalBack"
          overlayClassName="Overlay"
        >
          <div className="Modal invest-modal">
            <button
              className="hollow button"
              id="close-button"
              onClick={this.handleCloseConfirmation}
            >
              <img id="proj-icon" src={close} />
            </button>
            <div className="icon-lg">
              <Icon type="check-circle" />
            </div>
            Agregado a cartera exitosamente!
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default ProjectPage;
