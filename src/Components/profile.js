import React, { Component } from "react";
import fire from "../Firebase/Fire";
import { Link } from "react-router-dom";
import * as routes from "../Constants/Routes";
import UserContext from "./UserContext";
import InvestmentItem from "./InvestmentItem";
import { Icon, Calendar, Tabs, Modal, Button, Input } from "antd";

import userP from "../Icons/user.svg";
import settings from "../Icons/settings.svg";
import linec from "../Icons/line-chart.svg";
import planning from "../Icons/planning.svg";
import cart from "../Icons/briefcase.svg";
import close from "../Icons/close.svg";
import notificaciones from "../Icons/alarm.svg";
import news from "../Icons/worldwide.svg";
import email from "../Icons/mail.svg";
import terrenos from "../Icons/magnifier.svg";
import location from "../Icons/placeholder.svg";
import edit from "../Icons/tools.svg";
import "./Profile.css";

const TabPane = Tabs.TabPane;

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      picProfile: "",
      name: "",
      lastName: "",
      email: "",
      region: "",
      phone: "",
      investments: [],

      showModName: "",
      showModLast: "",
      showModEmail: "",
      showModPhone: "",
      showModRegion: ""
    };
    this.getInvestments = this.getInvestments.bind(this);

    this.handleSetName = this.handleSetName.bind(this);
    this.handleSetlastName = this.handleSetlastName.bind(this);
    this.handleSetCorreo = this.handleSetCorreo.bind(this);
    this.handleSetTelefono = this.handleSetTelefono.bind(this);
    this.handleSetRegion = this.handleSetRegion.bind(this);

    this.onPanelChange = this.onPanelChange.bind(this);
  }

  onPanelChange(value, mode) {
    console.log(value, mode);
  }

  componentWillMount() {
    this.getInvestments();
  }

  getInvestments() {
    //var projs = [];
    var projects = [];
    var result;

    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        const database = fire.firestore();
        const collection = database
          .collection("users")
          .doc(user.uid)
          .collection("investments");

        await collection.get().then(snapshot => {
          //Encuentra la carreta del usuario en sesión y la asigna a variable projects

          //if (snapshot.exists) {
          snapshot.forEach(element => {
            projects.push(element.data());
          });

          if (projects.length == 0) {
            result = false;
          }
          //}
          console.log(projects.length);

          /*
                                        projects.forEach(element => {
                                            if (j < i) {
                                                projs.push(element);
                                                console.log(element);
                                            }
                                            j++;
                                        });
                    */
        });
      } else {
      }
      //console.log(this.state.investments);
      console.log(projects.length);
      this.setState({
        investments: projects
      });
    });
  }

  async handleSetName(id, field) {
    let newValue;
    const ref = fire
      .firestore()
      .collection("users")
      .doc(id);

    if (field == "nombre" && this.state.name != "") {
      newValue = this.state.name;
      await ref.update({ nombre: newValue });
    }
  }

  async handleSetlastName(id, field) {
    let newValue;
    const ref = fire
      .firestore()
      .collection("users")
      .doc(id);

    if (field == "apellido" && this.state.lastName != "") {
      newValue = this.state.lastName;
      await ref.update({ apellido: newValue });
    }
  }

  async handleSetCorreo(id, field) {
    let newValue;
    const ref = fire
      .firestore()
      .collection("users")
      .doc(id);

    if (field == "correo" && this.state.email != "") {
      newValue = this.state.email;
      await ref.update({ correo: newValue });
    }
  }

  async handleSetTelefono(id, field) {
    let newValue;
    const ref = fire
      .firestore()
      .collection("users")
      .doc(id);

    if (field == "telefono" && this.state.phone != "") {
      newValue = this.state.phone;
      await ref.update({ telefono: newValue });
    }
  }

  async handleSetRegion(id, field) {
    let newValue;
    const ref = fire
      .firestore()
      .collection("users")
      .doc(id);

    if (field == "region" && this.state.region != "") {
      newValue = this.state.region;
      await ref.update({ region: newValue });
    }
  }

  render() {
    console.log(this.props.name);

    let investitems = this.state.investments.map(doc => {
      return (
        <InvestmentItem
          title={doc.title}
          ubicacion={doc.locate}
          pago={doc.pago}
          id={doc.id}
        />
      );
    });

    return (
      <UserContext.Consumer>
        {context =>
          context.user ? (
            <div id="profile-cont">
              <div className="tab-extra">
                <img
                  id="profile-imagen"
                  src={require("./Archivo.jpg")}
                  alt="Test"
                />
                <div className="flexbox" id="flex-nombre">
                  <div id="profile-name" class="textD1">
                    {context.nombre} {context.apellido}
                  </div>
                </div>
              </div>
              <Tabs defaultActiveKey="1" tabPosition="left" id="profile-tabs">
                <TabPane
                  tab={
                    <span className="tab-icon">
                      <span className="icon">
                        <Icon type="user" />
                      </span>
                      <span className="tab-text">Perfil</span>
                    </span>
                  }
                  key="1"
                >
                  <div className="flexbox" id="profile-flex">
                    <div className="flexbox" id="flex-header">
                      <div className="flexbox" id="name-flex">
                        <div className="textD1" id="name-text">
                          {context.nombre}{" "}
                        </div>
                        <div className="textD1"> {context.apellido}</div>
                      </div>
                      <div className="flexbox" id="flexbox-infoG">
                        <div class="textD1">
                          {" "}
                          <Icon type="mail" size={30} /> {context.correo}
                        </div>
                        <div class="textD1">
                          {" "}
                          <Icon type="environment" size={30} /> {context.region}
                        </div>
                      </div>
                    </div>
                    <div className="flexbox" id="flex-four">
                      <div className="flex-item item-sm">
                        <Link to={routes.CART}>
                          <img src={"https://bit.ly/2SDMguf"} />
                        </Link>

                        <h3>Cartera</h3>
                      </div>

                      <div className="flex-item item-lg">
                        <img src={"https://bit.ly/2tKpV45"} />
                        <Link to={routes.PROYECTOS}>
                          <h3>Notificaciones</h3>
                        </Link>
                      </div>
                      <div className="flex-item item-lg">
                        <img src={"https://bit.ly/2Hb1Dbp"} />
                        <Link to={routes.PROYECTOS}>
                          <h3>Terrenos</h3>
                        </Link>
                      </div>
                      <div className="flex-item item-sm">
                        <img src={"https://bit.ly/2EHbhRs"} />
                        <Link to={routes.LANDING}>
                          <h3>Noticias</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span className="tab-icon">
                      <span className="icon">
                        <Icon type="area-chart" />
                      </span>
                      <span className="tab-text">Inversiones</span>
                    </span>
                  }
                  key="2"
                >
                  <h2>Inversiones</h2>
                  <div id="investment-cards" className="flexbox">
                    {investitems}
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span className="tab-icon">
                      <span className="icon">
                        <Icon type="setting" />
                      </span>
                      <span className="tab-text">Configuración</span>
                    </span>
                  }
                  key="3"
                >
                  <div>
                    <div className="flexbox" id="config-flex">
                      <h2 id="config-title">
                        Configuración general de la cuenta{" "}
                      </h2>

                      <div id="config-item">
                        <div id="config-name">
                          <div className="textD1">Nombre </div>
                          <div id="info-item">{context.nombre}</div>
                        </div>
                        <Button
                          type="primary"
                          shape="circle"
                          icon="edit"
                          onClick={() => this.setState({ showModName: true })}
                        />

                        {/*MODAL*/}
                        <Modal
                          title="Modificar Nombre"
                          visible={this.state.showModName}
                          onOk={() => context.toggleName(this.state.name)}
                          onCancel={() => this.setState({ showModName: false })}
                        >
                          <Input
                            size="large"
                            placeholder={context.nombre}
                            onChange={evt => {
                              this.setState({
                                name: evt.target.value
                              });
                            }}
                          />
                        </Modal>
                        {/*finModal*/}
                      </div>

                      <div id="config-item">
                        <div id="config-name">
                          <div className="textD1">Apellido </div>
                          <div id="info-item">{context.apellido}</div>
                        </div>
                        <Button
                          type="primary"
                          shape="circle"
                          icon="edit"
                          onClick={() => this.setState({ showModLast: true })}
                        />

                        {/*MODAL*/}
                        <Modal
                          title="Modificar Apellido"
                          visible={this.state.showModLast}
                          onOk={() =>
                            context.toggleLastname(this.state.lastName)
                          }
                          onCancel={() => this.setState({ showModLast: false })}
                        >
                          <Input
                            size="large"
                            placeholder={context.apellido}
                            onChange={evt => {
                              this.setState({
                                lastName: evt.target.value
                              });
                            }}
                          />
                        </Modal>
                        {/*finModal*/}
                      </div>

                      <div id="config-item">
                        <div id="config-name">
                          <div className="textD1">Correo </div>
                          <div id="info-item">{context.correo}</div>
                        </div>
                        <Button
                          type="primary"
                          shape="circle"
                          icon="edit"
                          onClick={() => this.setState({ showModEmail: true })}
                        />

                        {/*MODAL*/}
                        <Modal
                          title="Modificar Correo"
                          visible={this.state.showModEmail}
                          onOk={() =>
                            context.toggleEmail(this.state.email)
                          }
                          onCancel={() => this.setState({ showModEmail: false })}
                        >
                          <Input
                            size="large"
                            placeholder={context.correo}
                            onChange={evt => {
                              this.setState({
                                email: evt.target.value
                              });
                            }}
                          />
                        </Modal>
                        {/*finModal*/}
                      </div>

                      <div id="config-item">
                        <div id="config-name">
                          <div className="textD1">Telefono </div>
                          <div id="info-item">{context.telefono}</div>
                        </div>
                        <Button
                          type="primary"
                          shape="circle"
                          icon="edit"
                          onClick={() => this.setState({ showModPhone: true })}
                        />

                        {/*MODAL*/}
                        <Modal
                          title="Modificar Telefono"
                          visible={this.state.showModPhone}
                          onOk={() =>
                            context.togglePhone(this.state.phone)
                          }
                          onCancel={() => this.setState({ showModPhone: false })}
                        >
                          <Input
                            size="large"
                            placeholder={context.telefono}
                            onChange={evt => {
                              this.setState({
                                phone: evt.target.value
                              });
                            }}
                          />
                        </Modal>
                        {/*finModal*/}
                      </div>

                      <div id="config-item">
                        <div id="config-name">
                          <div className="textD1">Region </div>
                          <div id="info-item">{context.region}</div>
                        </div>
                        <Button
                          type="primary"
                          shape="circle"
                          icon="edit"
                          onClick={() => this.setState({ showModRegion: true })}
                        />

                        {/*MODAL*/}
                        <Modal
                          title="Modificar Region"
                          visible={this.state.showModRegion}
                          onOk={() =>
                            context.toggleRegion(this.state.region)
                          }
                          onCancel={() => this.setState({ showModRegion: false })}
                        >
                          <Input
                            size="large"
                            placeholder={context.region}
                            onChange={evt => {
                              this.setState({
                                region: evt.target.value
                              });
                            }}
                          />
                        </Modal>
                        {/*finModal*/}
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span className="tab-icon">
                      <span className="icon">
                        <Icon type="calendar" />
                      </span>
                      <span className="tab-text">Calendario</span>
                    </span>
                  }
                  key="4"
                >
                  <Calendar onPanelChange={this.onPanelChange} />
                </TabPane>
              </Tabs>

              {/*
              <div class="modal" id="ModalNombre" role="dialog">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header" id="modal-head">
                      <h4> Modificar nombre</h4>
                      <button id="close-mod" data-dismiss="modal">
                        <img id="proj-icon" src={close} />
                      </button>
                    </div>

                    <div class="modal-body">
                      <input
                        type="text"
                        name="input"
                        class="form-control"
                        placeholder={context.nombre}
                        required=""
                        onChange={evt => {
                          this.setState({ name: evt.target.value });
                        }}
                      />
                    </div>

                    <div class="modal-footer">
                      <button
                        class="btn btn-primary"
                        data-dismiss="modal"
                        onClick={() => context.toggleName(this.state.name)}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              */}
            </div>
          ) : (
            <p>no hay usuario</p>
          )
        }
      </UserContext.Consumer>
    );
  }
}
export default Profile;
