import React, { Component } from 'react'
import Infocard from '../Components/Infocard'
import HorizontalInfo from '../Components/HorizontalInfo'

export default class Proyectos extends Component {
  render() {
    return (
      <div>
        <h1 id="main-title">Proyectos</h1>
         <Infocard />
         <HorizontalInfo />
      </div>
    )
  }
}
