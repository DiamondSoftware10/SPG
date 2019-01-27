import React, {
    Component
} from 'react';
import fire from "../Firebase/Fire";
import 'firebase/database';

import ReactTable from "react-table";
import "react-table/react-table.css";

class ManageProjects extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.controller = new AbortController();
        
        this.state ={
            data : [],
            selectedID: '',
            selected : null,
        }

        this.columns = [
            {
                Header: "ID",
                accessor: "id",
                width: 200,
              },
              {
                Header: "Título",
                accessor: "titulo",
                width: 200,
              },
              {
                Header: "Dinero recaudado",
                accessor: "dinero",
                width: 200,
              },
              {
                Header: "Información de zona",
                accessor: "infoZona",
                width: 200,
              }
            ,
              {
                Header: "Delete",
                id: 'deleteUserButton',
                Cell: () => (
                <div>
                    <button onClick={this.DeleteUser("poof")}>
                        Eliminar
                    </button>
                </div>
                ),
                width: 200,
                filterable: false,
              },
        ];
        //this.error = this.error.bind(this);
    }

    componentDidMount() {
        const database = fire.firestore();
       // database.settings({timestampsInSnapshots: true});
        const collection = database.collection('projects');

        collection.get().then(snapshot => {
            const data =[];

              snapshot.forEach(doc => {
                


              const proyecto ={
                  id : doc.id,
                  titulo: doc.data().title,
                  dinero: doc.data().raisedMoney,
                  infoZona: doc.data().infoZone

              }
              data.push(proyecto);
            });

            this.setState(prevState => {
                return {
                    data: [...prevState.data, ...data]
                };
            });
        
        });
    }
    
    DeleteUser(id) {
        const db = fire.firestore();
        db.collection("users").doc(id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }



    render() {
    

    return (
        <div>
                <ReactTable data={this.state.data} columns={this.columns} filterable 
                    getTrProps={(state, rowInfo) => {
                        if (rowInfo && rowInfo.row) {
                          return {
                            onClick: (e) => {
                              this.setState({
                                selected: rowInfo.index
                              })
                            },
                            style: {
                              background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
                              color: rowInfo.index === this.state.selected ? 'white' : 'black'
                            }
                          }
                        }else{
                          return {}
                        }
                      } 
                    }
                />
         </div>
      );

    }
}


export default ManageProjects;
