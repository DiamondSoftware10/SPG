import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../Constants/Routes';
import fire from '../Firebase/Fire';
import './Homepages.css';
import './ResetPassword.css';

const byPropKey = (propertyName,value) => () =>({[propertyName]:value,});

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

    async SendResetEmail(){
        console.log('entro');
        await fire.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({errorMessage: 'Se ha enviado la solicitud a tu correo.'})         
            console.log(this.state.errorMessage);   
        }).catch(() => {
            console.log('no entro');
            this.setState({errorMessage: 'Este correo no es valido.'})
            //this.setState(byPropKey('errorMessage','Este correo no es valido.'));
            console.log(this.state.errorMessage)
        });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(event.target.value);
    };
   


    render(){
        return (
            <div>
                <div className= "register-div">
                    <br/>
                    <br/>
                    <br/>
                    <h2 className="modal-title">Recuperacion de Cuenta</h2>
                    <br/>
                    <br/>
                    <text> Ingrese su correo: </text>
                    <br/>
                    <input type ="text" onChange={evt => this.setState(byPropKey('email',evt.target.value))}/>
                    <br/>
                    <br/>
                    <text className="modal-title">{this.state.errorMessage}</text>
                    <br/>
                    <br/>
                    <br/> 
                    <button onClick ={ () => this.SendResetEmail()} className="btn btn-primary">Enviar correo</button>
                    <br/>
                    <br/> 
                    <label>{this.errorMessage}</label>
                </div>
            </div>
        );
    }
}


export default ResetPassword;
