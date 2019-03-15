import React, { Component } from "react";
import fire from "../Firebase/Fire";
import "firebase/database";

import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactModal from "react-modal";
import { FaEdit, FaSave, FaRegFrownOpen, FaRegGrin } from "react-icons/fa";
//import Input from "./Objects/Input";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "40%",
    bottom: "",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 30
  },
  borderRadius: 3
};

ReactModal.setAppElement("#root");

class ManageProjects extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.state = {
      data: [],
      selectedID: "",
      selected: null,
      modalIsOpen: false,
      selectedName: "",
      selectedDescripcion: "",
      selectedRaisedMoney: 0,
      formIsHidden: true,
      //Datos modificados a enviar
      modName: "",
      modDescripcion: "",
      modRaisedMoney: ""
    };

    this.modState = {};

    this.columns = [
      {
        Header: "ID",
        accessor: "id",
        width: 250,
        style: {
          textAlign: "justify"
        }
      },
      {
        Header: "Título",
        accessor: "titulo",
        width: 200,
        style: {
          textAlign: "justify"
        }
      },
      {
        Header: "Dinero recaudado",
        accessor: "dinero",
        width: 200,
        style: {
          textAlign: "justify"
        }
      },
      {
        Header: "Información de zona",
        accessor: "infoZona",
        width: 200,
        style: {
          textAlign: "justify"
        }
      },
      {
        Header: "Estado",
        accessor: "active",
        width: 100,
        style: {
          textAlign: "justify"
        }
      }
    ];

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openForm = this.openForm.bind(this);

    //this.error = this.error.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true, formIsHidden: true });
  }

  openForm() {
    if (this.state.formIsHidden === false) {
      this.setState({ formIsHidden: true });
    } else {
      this.setState({ formIsHidden: false });
    }
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color =   '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    const database = fire.firestore();
    // database.settings({timestampsInSnapshots: true});
    const collection = database.collection("projects");

    collection.get().then(snapshot => {
      const data = [];

      snapshot.forEach(doc => {
        const proyecto = {
          id: doc.id,
          titulo: doc.data().title,
          dinero: doc.data().raisedMoney,
          infoZona: doc.data().infoZone,
          active: doc.data().available ? "activo" : "inactivo",
          descripcion: doc.data().description
        };

        data.push(proyecto);
      });

      this.setState(prevState => {
        return {
          data: [...prevState.data, ...data]
        };
      });
    });
  }

  DeleteUser() {
    if (
      window.confirm("¿ Está seguro de que desea desactivar este proyecto ?")
    ) {
      const db = fire.firestore();
      // database.settings({timestampsInSnapshots: true});
      db.collection("projects")
        .doc(this.state.selectedID)
        .update({ available: false });
      this.setState({ data: [] });

      const database = fire.firestore();
      const collection = database.collection("projects");

      collection.get().then(snapshot => {
        const data = [];

        snapshot.forEach(doc => {
          const proyecto = {
            id: doc.id,
            titulo: doc.data().title,
            dinero: doc.data().raisedMoney,
            infoZona: doc.data().infoZone,
            active: doc.data().available ? "activo" : "inactivo",
            descripcion: doc.data().description + " "
          };

          data.push(proyecto);
        });

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...data]
          };
        });
      });
    }
  }

  UndoDelete() {
    if (
      window.confirm("¿ Está seguro de que quiere reactivar este proyecto ?")
    ) {
      const db = fire.firestore();
      db.collection("projects")
        .doc(this.state.selectedID)
        .update({ available: true });
      this.setState({ data: [] });

      const database = fire.firestore();
      const collection = database.collection("projects");

      collection.get().then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          const proyecto = {
            id: doc.id,
            titulo: doc.data().title,
            dinero: doc.data().raisedMoney,
            infoZona: doc.data().infoZone,
            active: doc.data().available ? "activo" : "inactivo",
            descripcion: doc.data().description + " "
          };

          data.push(proyecto);
        });

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...data]
          };
        });
      });
    }
  }

  ModifyProject() {
    let titulo = this.state.modName;
    let descripcion = this.state.modDescripcion;
    let raisedMoney = this.state.modRaisedMoney;

    if (this.state.modName === "") {
      titulo = this.state.selectedName;
    }

    if (this.state.modDescripcion === "") {
      descripcion = this.state.selectedDescripcion;
    }

    if (this.state.modRaisedMonedy === "" || this.state.modRaisedMoney <= 0) {
      raisedMoney = this.state.selectedRaisedMoney;
    }

    if (
      window.confirm(
        " Se haran cambios a los datos del proyecto, ¿ desea continuar ?"
      )
    ) {
      this.closeModal();
      const db = fire.firestore();
      db.collection("projects")
        .doc(this.state.selectedID)
        .update({
          title: titulo,
          description: descripcion,
          raisedMoney: raisedMoney
        });
      this.setState({
        data: []
      });
      const database = fire.firestore();
      const collection = database.collection("projects");
      collection.get().then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          const proyecto = {
            id: doc.id,
            titulo: doc.data().title,
            dinero: doc.data().raisedMoney,
            infoZona: doc.data().infoZone,
            active: doc.data().available ? "activo" : "inactivo",
            descripcion: doc.data().description + " "
          };

          data.push(proyecto);
        });

        this.setState(prevState => {
          return {
            data: [...prevState.data, ...data]
          };
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div className="mobile-only">
          <img
            className="only-mob-img"
            src="https://image.flaticon.com/icons/svg/1072/1072091.svg"
          />
          <h2 className="only-mob-h1">Entra desde tu navegador para manejar proyectos</h2>
        </div>
        <div
          className="desktop-only"
          id="div-table"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "2em"
          }}
        >
          <ReactTable
            data={this.state.data}
            columns={this.columns}
            filterable
            defaultPageSize={10}
            resizable={false}
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                return {
                  onClick: e => {
                    this.setState({
                      selectedID: rowInfo.original.id,
                      selected: rowInfo.index,
                      selectedDescripcion: this.state.data[rowInfo.index]
                        .descripcion,
                      selectedName: rowInfo.original.titulo,
                      selectedRaisedMoney: rowInfo.original.dinero
                    });
                    this.openModal();
                  },
                  style: {
                    background:
                      rowInfo.index === this.state.selected ? "green" : "white",
                    color:
                      rowInfo.index === this.state.selected ? "white" : "black"
                  }
                };
              } else {
                return {};
              }
            }}
          />

          <ReactModal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <div
              style={{
                justifyContent: "center",
                width: "100%",
                padding: "2em"
              }}
            >
              <h2>{this.state.selectedName} </h2>
              <br />
              <h4>Descripcion</h4>
              <p>{this.state.selectedDescripcion}</p>
              <h4>Dinero Recaudado</h4>
              <p>{this.state.selectedRaisedMoney}</p>
            </div>

            <button
              className="btn-secondary"
              onClick={() => this.DeleteUser(this.state.selectedID)}
            >
              <FaRegFrownOpen /> Desactivar
            </button>
            <button
              className="btn-secondary"
              onClick={() => this.UndoDelete(this.state.selectedID)}
            >
              <FaRegGrin /> Reactivar
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                this.openForm();
              }}
            >
              <FaEdit /> Editar
            </button>

            <div
              style={{
                justifyContent: "center",
                width: "100%",
                padding: "2em"
              }}
              hidden={this.state.formIsHidden}
            >
              <label>
                **En caso de que deje un campo vacio, se tomara el valor
                anterior del dato**
              </label>
              <h4>Nuevo Titulo</h4>
              <input
                id="reset-email"
                type="text"
                className="form-control"
                onChange={evt =>
                  this.setState(byPropKey("modName", evt.target.value))
                }
              />

              <h4>Nueva Descripcion</h4>
              <textarea
                rows="3"
                class="form-control"
                placeholder={"Escriba la nueva descripcion aqui."}
                onChange={evt =>
                  this.setState(byPropKey("modDescripcion", evt.target.value))
                }
              />

              <h4>Nuevo Valor de Dinero Recaudado</h4>
              <input
                type="number"
                //min = "1"
                className="form-control"
                onChange={evt =>
                  this.setState(byPropKey("modRaisedMoney", evt.target.value))
                }
              />
              <br />

              <button
                className="btn-primary"
                onClick={() => this.ModifyProject()}
              >
                <FaSave /> Guardar Cambios
              </button>
            </div>
          </ReactModal>
        </div>
      </div>
    );
  }
}

export default ManageProjects;
