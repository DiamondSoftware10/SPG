import React, { Component } from 'react';
import './ItemHeading.css'



export default class ItemHeading extends Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div >
                <div className="flexbox flex-add-element">
                    <div className="flexbox element-heading">
                        <div className="number-circle">
                            <div id="number">{this.props.number}</div>
                        </div>
                        <h2 id="form-heading">{this.props.title}</h2>
                    </div>
                    <h5 id="form-subhead">{this.props.subtitle}</h5>

                </div>
            </div>
        );
    }
}


