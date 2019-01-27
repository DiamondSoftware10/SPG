import React, {
    Component
} from 'react';
import fire from "../Firebase/Fire";
import 'firebase/database';

import ReactTable from "react-table";
import "react-table/react-table.css";

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
                accessor: "nombre",
                width: 70,
              },
              {
                Header: "Last Name",
                accessor: "apellido",
                width: 70,
              },
              {
                Header: "Type",
                accessor: "accType",
                width: 70,
              }
        ];
        //this.error = this.error.bind(this);
    }

    componentDidMount() {
        const database = fire.firestore();
       // database.settings({timestampsInSnapshots: true});
        const collection = database.collection('users');

        collection.get().then(snapshot => {
            const data =[];

              snapshot.forEach(doc => {
                var type = 'User';
                if (doc.data().accType == 0 ){
                    type = 'Admin'
                }


              const admin ={
                  id : doc.data().key,
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
    

    return (
        <div>
            <ReactTable data={this.state.data} columns={this.columns} filterable />
        </div>
      );

}
}


export default ManageUsers;
