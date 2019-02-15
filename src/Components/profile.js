import React, { Component } from 'react';
import fire from '../Firebase/Fire'
import UserContext from './UserContext';
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picProfile: "",
            name: "",
            lastName: "",
            email: "",
            region: "",
            phone: ""
        }
    }



   componentWillMount() {
       /* let id;
        let usersRef = fire.firestore().collection("users").doc(this.props.uid);
                console.log(usersRef)
                let user;
                usersRef.get().then(function (doc) {
                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        user = doc.data();

                        this.setState(
                            {
                                //picProfile:user.picProfile,
                                name: user.nombre,
                                lastName: user.apellido,
                                email: user.correo,
                                region: user.region,
                                phone: user.telefono
                            }

                        )
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                    }
                })
*/

    }
    render() {
        console.log(this.props.name)
        return (
            <UserContext.Consumer>
                {context => context.user ? 
            <div id="profile-div">
               
                    
               <img src={this.state.picProfile}></img>
               <ul>
                   <li>
                       <label>{context.nombre}</label>
                   </li>
                   <li>
                       <label>{context.apellido}</label>
                   </li>
                   <li>
                       <label>{context.correo}</label>
                   </li>
                   <li>
                       <label>{context.region}</label>
                   </li>
                   <li>
                       <label>{context.telefono}</label>
                   </li>
                   <button onClick={this.handleChange}>Matenme</button>
               </ul>
               
           </div> : <p>no hay usuario</p>}
            
            </UserContext.Consumer>
        )
    }

}
export default Profile;