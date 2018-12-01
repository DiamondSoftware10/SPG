import React, { Component } from 'react'
import Infocard from '../Components/Infocard'
import HorizontalInfo from '../Components/HorizontalInfo'

import './Proyectos.css'

export default class Proyectos extends Component {
  render() {
    return (
      <div className="info-cont">
        <h1 id="main-title">Proyectos</h1>
        <div >
          <HorizontalInfo />
          <HorizontalInfo />
          <HorizontalInfo />
        </div>
      </div>
    )
  }
}
