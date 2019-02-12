import React, { Component } from 'react';
import './Input.css'



export default class Input extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div >
                
                    <div class="form-group">
                        <label>{this.props.label}</label>
                        <input type={this.props.tipo} class="form-control" placeholder={this.props.placeholder} />
                    </div>
            </div>
        );
    }
}


