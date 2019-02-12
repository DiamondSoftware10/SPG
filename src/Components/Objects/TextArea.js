import React, { Component } from 'react';
import './Input.css'



export default class TextArea extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div >
                
                    <div class="form-group">
                        <label>{this.props.label}</label>
                        <textarea rows="3" class="form-control" placeholder={this.props.placeholder}></textarea>
                    </div>
            </div>
        );
    }
}


