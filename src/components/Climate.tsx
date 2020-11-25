import React, { useState, useEffect, Component } from 'react'
import { Sensor } from '../lib/Sensor';

interface GaugeProps {
  id: "temperature" | "humidity";
  sensor: Sensor;
}

interface GaugeState {
  value: number | null;
  min: number | null;
  max: number | null;
}

const Gauge = (props: GaugeProps) => {
  const [state, setState] = useState<GaugeState>({ value: null, min: null, max: null });

  useEffect(() => {
    props.sensor.on(props.id, updateValues)

    return () => {
      props.sensor.off(props.id, updateValues);
    }
  }, [props.sensor, props.id]);

  const updateValues = (value: number) => {
    setState(({ min, max }) => {
      return {
        value: value,
        min: min ? Math.min(min, value) : value,
        max: max ? Math.max(max, value) : value
      }
    })
  }

  return <div id={props.id} className='gauge'>
    <div className="gauge__value">
      {props.id}: {state.value ?? '-'}
    </div>
    <div className="gauge__min">
      Min: {state.min ?? '-'}
    </div>
    <div className="gauge__max">
      Max: {state.max ?? '-'}
    </div>
    <button onClick={() => setState({ ...state, min: state.value, max: state.value})}>Reset</button>
  </div>
}

type ClimateProps = { sensor: Sensor };

class Climate extends Component<ClimateProps> {
  render() {
    return (
      <div>
        <Gauge id="temperature" sensor={this.props.sensor} />
        <Gauge id="humidity" sensor={this.props.sensor} />
      </div>
    );
  }
}

export default Climate;