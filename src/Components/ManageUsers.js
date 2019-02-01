import React, {
    Component
} from 'react';
import fire from "../Firebase/Fire";
import 'firebase/database';

import ReactTable from "react-table";
import "react-table/react-table.css";
//que pedos 

class ManageUsers extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        //this.controller = new AbortController();

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
            {
                Header: "Delete",
                id: 'deleteUserButton',
                accessor: row => (
                    <div>
                        <button onClick={() => this.DeleteUser(this.state.selectedID)}>Eliminar</button>
                    </div>
                ),
                // width: 100,
                filterable: false,
            },
        ];
        //this.error = this.error.bind(this);
    }





    componentDidMount() {
        const database = fire.firestore();
        // database.settings({timestampsInSnapshots: true});
        const collection = database.collection('users');

        collection.get().then(snapshot => {
            const data = [];
            snapshot.docs.forEach(doc => {
                var type = 'User';
                if (doc.data().accType == 0) {
                    type = 'Admin'
                }
                const admin = {
                    id: doc.id,
                    nombre: doc.data().nombre,
                    apellido: doc.data().apellido,
                    accType: type,
                }
                data.push(admin);
            });

            this.setState(prevState => {
                return {
                    data: [...prevState.data, ...data]
                };
            });
        });
    }


    /*async RefreshData() {
         this.setState=({data : []})
         
         
          const db = fire.firestore();
     ///db.settings({ timestampsInSnapshots: true});
         db.collection('users').get().then((snapshot) => {
             const datos =[];
         snapshot.docs.forEach(doc => {
             var type = 'User';
             if (doc.data().accType == 0 ){
                 type = 'Admin'
             }
             const admin ={
                 id : doc.id,
                 nombre: doc.data().nombre,    
                 apellido: doc.data().apellido,
                 accType: type,
             }
             datos.push(admin);
             this.setState({ data : datos }) 
       });
     });
         
    } */




    deleteRow(index) {
        var data = [...this.state.data];
        data.splice(index, 1);
        this.setState({ data });
    }



    DeleteUser() {
        console.log('que pedos')
        console.log(this.state.selected);
        console.log(this.state.selectedID);

        const db = fire.firestore();

        db.collection("users").doc(this.state.selectedID).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });

        this.setState({ data: [] })

        const database = fire.firestore();
        // database.settings({timestampsInSnapshots: true});
        const collection = database.collection('users');


        collection.get().then(snapshot => {
            const data = [];
            snapshot.docs.forEach(doc => {
                var type = 'User';
                if (doc.data().accType == 0) {
                    type = 'Admin'
                }
                const admin = {
                    id: doc.id,
                    nombre: doc.data().nombre,
                    apellido: doc.data().apellido,
                    accType: type,
                }
                data.push(admin);
            });

            this.setState(prevState => {
                return {
                    data: [...prevState.data, ...data]
                };
            });
        });

    }

    render() {
        // this.RefreshData();


        return (

            <div>
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
        );

    }
}


export default ManageUsers;