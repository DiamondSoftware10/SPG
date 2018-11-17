import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Jumbotron, Grid, Row, Col, Image, Button } from 'react-bootstrap'
import './Home.css'
export default class Home extends Component {
  render() {
    return (
      <Grid>
          <Jumbotron>
              <h2>Home</h2>
              <p>This is a dumb text for the landing page that is being designed</p>
          </Jumbotron>
          <Link to="/about">
            <Button bsStyle="primary"> About</Button>
          </Link>
      </Grid>
    )
  }
}
