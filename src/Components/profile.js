import React, { Component } from 'react';
import fire from '../Firebase/Fire'

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



    async componentWillMount() {
        let id;
        await fire.auth().onAuthStateChanged(user => {
            if (user) {
                id = user.uid;
                console.log(id);

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
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                });

            }
        });


    }
    render() {
        console.log(this.props.name)
        return (
            <div id="profile-div">

                <img src={this.state.picProfile}></img>
                <ul>
                    <li>
                        <label>{this.state.name}</label>
                    </li>
                    <li>
                        <label>{this.state.lastName}</label>
                    </li>
                    <li>
                        <label>{this.state.email}</label>
                    </li>
                    <li>
                        <label>{this.state.region}</label>
                    </li>
                    <li>
                        <label>{this.state.phone}</label>
                    </li>
                    <button onClick={this.handleChange}>Matenme</button>
                </ul>
            </div>
        )
    }

}
export default Profile;