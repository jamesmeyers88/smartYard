import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LandingPageNav from './LandingPageNav';
import { Card, Paper } from '@material-ui/core';
import '../../styles/LandingPage.css'

class LandingPage extends Component {

  render() {
    return (
      <div>
        <LandingPageNav />
        <center>
          <Card className="card">
            <div className="container">
              <p className="item info cell">Keep track of the moisture needs of your houseplants and track your watering events.</p>
              <hr/>
              <div className="item plantSensor image-cropper"><img  src="images/plantAndSensor.JPG" alt="house plant with sensor"/></div>
              <div className="item sensor image-cropper"><img  src="images/sensor.jpg" alt="sensor"/></div>
              <div className="item particle image-cropper"><img  src="images/particleAndAll.jpg" alt="particle photon from sparkfun"/></div>
              <p className="item info2 cell">This will help you to conserve water and keep your plants alive!</p>
            </div>
          </Card>
        </center>
      </div>
    );
  }
}

export default connect()(LandingPage);