import { render } from '@testing-library/react';
import React from 'react'

import { SensorEvent, testSensor } from '../lib/Sensor';

import Climate from './Climate';

describe('Climate app', () => 
    it.each([
        ['temperature', /temperature:/i],
        ['humidity', /humidity:/i]
    ])
        ('shows the current %s (example usage of test sensor)', async (id: string, regex: RegExp) => {
            // It's important to use `testSensor` for the tests, instead of the "real"
            // sensor used in the app. There are two reasons for this:
            // 1. Performance: the real sensor emits data after delayed timeouts,
            //    which would slow down our tests.
            // 2. Predictability: the real sensor generates random values, which is
            //    almost impossible to test. We need to control the emitted values.
            const { findByText } = render(<Climate sensor={testSensor} />);

            // No value from the sensor yet, so "-" is shown.
            expect(await findByText(regex)).toHaveTextContent('-');

            // We let the sensor emit a temperature value of 21:
            testSensor.emit(id as SensorEvent, 21);

            // Let's check if that 21 is actually rendered.
            // We need to use `findBy…` and `await` that, because the event loop needs
            // to run first, so that our emitted event from above actually reaches the
            // component.
            expect(await findByText(regex)).toHaveTextContent('21');

            // Same thing again with a different temperature value, so that we can be
            // sure that the shown values are always up to date with the latest emitted
            // value from the sensor.
            testSensor.emit(id as SensorEvent, 22);
            expect(await findByText(regex)).toHaveTextContent('22');
        })
);
