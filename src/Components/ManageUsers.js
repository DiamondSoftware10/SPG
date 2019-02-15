import React, {
    Component
} from 'react';
import fire from "../Firebase/Fire";
import 'firebase/database';
import './Manage.css'
import ReactTable from "react-table";
import "react-table/react-table.css";

class ManageUsers extends Component {
    constructor(props) {
        super(props);

        this.props = props;

        this.state = {
            data: [],
            selectedID: "empty",
            selected: null,
        }

        this.columns = [
            {
                Header: "ID",
                accessor: "id",
                width: 300,
            },
            {
                Header: "Estado de cuenta",
                accessor: "active",
                width: 100,
            },
            {
                Header: "First Name",
                accessor: "nombre",
                width: 100,
            },
            {
                Header: "Last Name",
                accessor: "apellido",
                width: 100,
            },
            {
                Header: "Type",
                accessor: "accType",
                width: 100,
            }
            ,

        ];
    }





    componentDidMount() {
        const database = fire.firestore();
        const collection = database.collection('users');

        collection.get().then(snapshot => {
            const data = [];
            snapshot.docs.forEach(doc => {
                if (doc.data().accType < 2) {
                    var type = 'User';
                    if (doc.data().accType == 0) {
                        type = 'Admin'
                    }
                    const admin = {
                        id: doc.id,
                        nombre: doc.data().nombre,
                        apellido: doc.data().apellido,
                        accType: type,
                        active: doc.data().active ? "activo" : "inactivo"
                    }
                    data.push(admin);
                }

            });

            this.setState(prevState => {
                return {
                    data: [...prevState.data, ...data]
                };
            });
        });
    }

    deleteRow(index) {
        var data = [...this.state.data];
        data.splice(index, 1);
        this.setState({ data });
    }


    UndoDelete() {

        if (window.confirm("¿ Está seguro que desea reactivar el usuario ?")) {
            const db = fire.firestore();
            db.collection("users").doc(this.state.selectedID).update({ active: true });
            this.setState({ data: [] })

            const database = fire.firestore();
            const collection = database.collection('users');
            collection.get().then(snapshot => {
                const data = [];
                snapshot.docs.forEach(doc => {

                    if (doc.data().accType < 2) {
                        var type = 'User';
                        if (doc.data().accType == 0) {
                            type = 'Admin'
                        }
                        const admin = {
                            id: doc.id,
                            nombre: doc.data().nombre,
                            apellido: doc.data().apellido,
                            accType: type,
                            active: doc.data().active ? "activo" : "inactivo"
                        }
                        data.push(admin);
                    }

                });

                this.setState(prevState => {
                    return {
                        data: [...prevState.data, ...data]
                    };
                });
            });
        }
    }
    DeleteUser() {
        if (window.confirm("¿ Está seguro que desea elminar el usuario ?")) {
            const db = fire.firestore();
            db.collection("users").doc(this.state.selectedID).update({ active: false });
            this.setState({ data: [] })

            const database = fire.firestore();
            const collection = database.collection('users');
            collection.get().then(snapshot => {
                const data = [];
                snapshot.docs.forEach(doc => {

                    if (doc.data().accType < 2) {
                        var type = 'User';
                        if (doc.data().accType == 0) {
                            type = 'Admin'
                        }
                        const admin = {
                            id: doc.id,
                            nombre: doc.data().nombre,
                            apellido: doc.data().apellido,
                            accType: type,
                            active: doc.data().active ? "activo" : "inactivo"
                        }
                        data.push(admin);
                    }

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
            <div >
                <button onClick={() => this.DeleteUser(this.state.selectedID)}>Eliminar</button>
                <button onClick={() => this.UndoDelete(this.state.selectedID)}>Reactivar Cuenta</button>
                <div id="div-table">

                    <ReactTable data={this.state.data} columns={this.columns} filterable
                        getTrProps={(state, rowInfo) => {
                            if (rowInfo && rowInfo.row) {
                                return {
                                    onClick: (e) => {
                                        this.setState({
                                            selectedID: rowInfo.original.id,
                                            selected: rowInfo.index
                                        })
                                    },
                                    style: {
                                        background: rowInfo.index === this.state.selected ? 'green' : 'white',
                                        color: rowInfo.index === this.state.selected ? 'white' : 'black'
                                    }
                                }
                            } else {
                                return {}
                            }
                        }
                        }
                    />
                </div>
            </div>
        );

    }
}


export default ManageUsers;