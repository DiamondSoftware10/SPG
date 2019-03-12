import React, { Component, Button } from "react";
import { Link } from "react-router-dom";
import * as routes from "../Constants/Routes";
import CartItem from "./CartItem.js";
import UserContext from "./UserContext";
import ReactModal from "react-modal";

import fire from "../Firebase/Fire";
import "./Cart.css";

import hand from "../Icons/hand.svg";
import close from "../Icons/close.svg";

const db = fire.firestore();
const usersRef = db.collection("users");

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investments: [],
      showResult: true,
      center: { lat: 0, lng: 0 },
      suma: 0,
      showConfirmation: false
    };

    this.getInvestments = this.getInvestments.bind(this);
    this.handleDeleteFromCart = this.handleDeleteFromCart.bind(this);
    this.handleUpdateSuma = this.handleUpdateSuma.bind(this);
    this.handleConfirmInvestment = this.handleConfirmInvestment.bind(this);
    this.handleOpenConfirmation = this.handleOpenConfirmation.bind(this);
    this.handleCloseConfirmation = this.handleCloseConfirmation.bind(this);
  }

  getInvestments() {
    //var projs = [];
    var projects = [];
    var sum = 0;
    var result = true;

    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        const database = fire.firestore();
        const collection = database
          .collection("users")
          .doc(user.uid)
          .collection("cartera");

        await collection.get().then(snapshot => {
          //Encuentra la carreta del usuario en sesión y la asigna a variable projects
          var i = 0;

          //if (snapshot.exists) {
          snapshot.forEach(element => {
            console.log(element.data().id);
            sum = sum + parseFloat(element.data().pago, 10);
            console.log(sum);
            projects.push(element.data());
            i++;
            console.log(i);
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
        investments: projects,
        suma: sum,
        showResult: result
      });
    });
  }

  handleConfirmInvestment() {
    fire.auth().onAuthStateChanged(async user => {
      if (user) {
        const database = fire.firestore();
        const investRef = database
          .collection("users")
          .doc(user.uid)
          .collection("investments");
        const cartRef = database
          .collection("users")
          .doc(user.uid)
          .collection("cartera");
        //const projectRef = database.collection('projects');

        this.state.investments.forEach(async element => {
          console.log(element.id);
          investRef.doc(element.id).set(element);
          cartRef
            .doc(element.id)
            .delete()
            .then(function() {
              console.log("Document successfully deleted!");
            })
            .catch(function(error) {
              console.error("Error removing document: ", error);
            });

          const projectRef = database.collection("projects").doc(element.id);

          await projectRef.get().then(snapshot => {
            projectRef
              .update({
                raisedMoney: snapshot.data().raisedMoney + element.pago,
                manzanasRestantes: snapshot.data().manzanasRestantes - element.manzanas
              })
              .then(docRef => {
                console.log("Actualizado datos de financiamiento en " + docRef);
              });
          });
        });
      } else {
      }
      //console.log(this.state.investments);
      this.setState({
        showResult: false,
        investments: []
      });
    });
    this.handleOpenConfirmation();
  }

  handleDeleteFromCart(idProj, index, pago) {
    var result = true;
    fire.auth().onAuthStateChanged(user => {
      db.collection("users")
        .doc(user.uid)
        .collection("cartera")
        .doc(idProj)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        });
    });

    console.log(idProj + " borrado");
    const investments = this.state.investments;
    investments.splice(index, 1);
    console.log(investments.length);

    if (investments.length == 0) {
      result = false;
    }

    console.log(result);
    this.setState({
      suma: this.state.suma - pago,
      showResult: result,
      investments: investments
    });
  }

  handleUpdateSuma(invMin, suma) {
    if (suma) {
      this.setState({
        suma: this.state.suma + parseInt(invMin)
      });
    } else {
      this.setState({
        suma: this.state.suma - parseInt(invMin)
      });
    }
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
  }

  componentDidMount() {
    console.log("cualquier cosa");
    this.getInvestments();
  }

  render() {
    let cart = this.state.investments.map((doc, i) => {
      //console.log("proj " + i);

      return (
        /*
                <div class="flex-container">
                    <div>
                        <img class="item-imagen" src={"https://firebasestorage.googleapis.com/v0/b/spg-project-1.appspot.com/o/Campo4.jpg?alt=media&token=18e2d58f-1834-4dc8-a8f8-3d0c2eb9fec1"} alt="Test" />
                    </div>
                    <div className="flex-text">
                        <div id="cart-name" class="text">{doc.title}</div>
                        <div id="cart-location" class="text">{doc.locate}</div>

                    </div>
                    <div id="cart-inv" class="text">${doc.pago}</div>


                    <div class="Boton">
                        <button id="item-cancelar" onClick={this.handleDeleteFromCart(doc.id)}><img id="proj-icon" src={close}></img></button>
                    </div>

                </div>*/
        <CartItem
          title={doc.title}
          locate={doc.locate}
          pago={doc.pago}
          id={doc.id}
          index={i}
          handleDeleteFromCart={this.handleDeleteFromCart}
          pic={doc.picProject}
          manzanas={doc.manzanas}
          invMin={doc.investInitxBlock}
          handleUpdateSuma={this.handleUpdateSuma}
        />
      );
    });

    return (
      <div className="info-cont">
        <h1 className="main-title">Cartera de Inversión</h1>

        {this.state.showResult ? (
          <div id="card-div" className="container-fluid animated fadeIn">
            <div className="flex-content" id="cart-flex">
              {cart}
              <div class="flex-total">
                <div id="item-totalText" class="text">
                  Total
                </div>
                <div id="item-totalNum" class="text">
                  ${this.state.suma}
                </div>
              </div>
              <button
                id="btn-confirm"
                className="btn btn-primary"
                onClick={this.handleConfirmInvestment}
              >
                Confirmar inversión
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-content">
            <img className="main-icon" src={hand} />
            <h4 className="main-msg">
              Tu cartera de inversión está actualmente vacía
            </h4>
            <Link to={routes.PROYECTOS}>
              <button className="btn btn-primary">Explorar proyectos</button>
            </Link>
          </div>
        )}
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
            <h6>El pago se ha realizado exitosamente</h6>
          </div>
        </ReactModal>
      </div>
    );
  }
}
