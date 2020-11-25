import React, { Component } from 'react'
import { Sensor } from '../lib/Sensor';
import Gauge from './Gauge';

type ClimateProps = { sensor: Sensor };

class Climate extends Component<ClimateProps> {
  render() {
    return (
      <div className="climate">
        <Gauge id="temperature" unit="°C" sensor={this.props.sensor} />
        <Gauge id="humidity" unit="%" sensor={this.props.sensor} />
      </div>
    );
  }
}

export default Climate;