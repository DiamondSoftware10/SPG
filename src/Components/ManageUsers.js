import React, {
    Component
} from 'react';
import fire from "../Firebase/Fire";
import 'firebase/database';

import ReactTable from "react-table";
/*
  TO DO: 
      -Tocar el CSS de la pagina
      -Agregar una columna a la tabla, que tenga un botones de eliminar y modificar
*/


class ManageUsers extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        this.controller = new AbortController();
        
        this.state ={
            data : [],
        }

        this.columns = [
            {
                Header: "ID",
                accessor: "id",
                width: 70,
              },
              {
                Header: "First Name",
                accessor: "name",
                width: 70,
              },
              {
                Header: "Last Name",
                accessor: "last",
                width: 70,
              }
        ];
        //this.error = this.error.bind(this);
    }

    componentDidMount() {
        const database = fire.firestore();
       // database.settings({timestampsInSnapshots: true});
        const collection = database.collection('admins');

        collection.get().then(snapshot => {
            const data =[];

              snapshot.forEach(doc => {
              const admin ={
                  id : doc.data().key,
                  name: doc.data().name,
                  last: doc.data().last
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
    

    return (
        <div>
            <ReactTable data={this.state.data} columns={this.columns} filterable />
        </div>
      );

}
}


export default ManageUsers;
