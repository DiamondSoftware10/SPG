import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import fire from '../Firebase/Fire';
import './Homepages.css';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.props = props;
        
        this.state ={
            email: "empty",
            sent : false ,
            errorMessage: '',
        } 
        this.SendResetEmail.bind(this);
        this.handleChange.bind(this);

    }

    SendResetEmail(){
        console.log('entro');
        fire.auth().sendPasswordResetEmail(this.email).then(function() {
            this.setState({errorMessage: 'Se ha enviado la solicitud a tu correo.'})            
        }).catch(function(error) {
            console.log('no entro');
            this.setState({errorMessage: 'Este correo no es valido.'})
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };
   


    render(){
        console.log('que pedos vo')
        return (
            <div>
                <div>
                    <input type ="text" onChange={this.handleChange(this.email)}/> 
                    <button onclick ={this.SendResetEmail(this.email)}>Enviar correo</button>
                    <text>{this.errorMessage}</text>
                </div>
            </div>
        );
    }
}


export default ResetPassword;
