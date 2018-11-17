import React, { Component } from 'react';
import {listProjects, listUsers, queryIdProject} from '../Constants/firebase'
import './Infocard.css'

class Infocard extends Component {
    constructor(props) {
        super(props);
        this.render = this.render.bind(this);
        this.handleInfocard = this.handleInfocard.bind(this);

        this.state = {
            foto:"",
            cultivos:[],
            invMin:"",
            empleoGen:""
        };
    }
    
    handleInfocard(title) {
        var project = queryIdProject ("Guanaja");
        console.log("MMM")
        console.log(project.projectFinan);
        console.log(project.locate);

        //const listItems = listUsers().map((user) =>  <li>{user}</li>
        //);
    }
    
    render() {
        return (
            <div>
                <div class="zoom" id="bt-event" onClick={this.handleInfocard("Guanaja")}>
                    {/*<img src="https://bit.ly/2Dpx93w"></img>*/}
                        <div id="box-event"><p id="event-name">Terreno en San Lorenzo</p>
                            <p id="event-location">San Lo</p>
                        </div>
                </div>

            </div>
        );
    }
}

export default Infocard;
