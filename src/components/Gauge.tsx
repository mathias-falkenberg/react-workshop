import React, { useState, useEffect } from 'react'
import { Sensor, SensorEvent } from '../lib/Sensor';

interface DisplayProps {
    id: string;
    'data-testid'?: string;
    label: string;
    value: number | null;
    unit: string;
}

const Display = (props: DisplayProps) => (
    <div className={`gauge__${props.id}`} data-testid={props["data-testid"]}>
        {props.label}: {props.value?.toFixed(1) ?? '-'} {props.unit}
    </div>
)

interface GaugeProps {
    id: SensorEvent;
    sensor: Sensor;
    unit: string;
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

    const onResetClick = () => {
        setState(({ value }) => {
            return {
                value: value,
                min: value,
                max: value
            }
        })
    }

    return <div id={props.id} title={props.id} className='gauge'>
        <h2>{props.id}</h2>
        <Display id="value" label={props.id} value={state.value} unit={props.unit} />
        <Display id="min" data-testid={`${props.id}-min`} label="Min" value={state.min} unit={props.unit} />
        <Display id="value" data-testid={`${props.id}-max`} label="Max" value={state.max} unit={props.unit} />
        <button className="gauge__reset button" onClick={onResetClick}>Reset</button>
    </div>
}

export default Gauge;