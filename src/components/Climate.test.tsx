import React from 'react'
import { render, findByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SensorEvent, testSensor } from '../lib/Sensor';

import Climate from './Climate';

describe('Climate app', () => {
    it.each([
        ['temperature', /temperature:/i],
        ['humidity', /humidity:/i]
    ])
        ('shows the current %s', async (id: string, regex: RegExp) => {
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

    it.each([
        ['temperature', 'temperature-max'],
        ['humidity', 'humidity-max']
    ])
        ('displays max %s', async (id: string, testId: string) => {
            const { findByTestId } = render(<Climate sensor={testSensor} />);

            // Initially shows no value.
            expect(await findByTestId(testId)).toHaveTextContent('-');

            // The first value is our new max.
            testSensor.emit(id as SensorEvent, 42);
            expect(await findByTestId(testId)).toHaveTextContent('42');

            // Second value is smaller. The max value stays the same.
            testSensor.emit(id as SensorEvent, 41);
            expect(await findByTestId(testId)).toHaveTextContent('42');

            // Third value is a new max.
            testSensor.emit(id as SensorEvent, 43);
            expect(await findByTestId(testId)).toHaveTextContent('43');
        })

    it.each([
        ['temperature', 'temperature-min'],
        ['humidity', 'humidity-min']
    ])
        ('displays min %s', async (id: string, testId: string) => {
            const { findByTestId } = render(<Climate sensor={testSensor} />);

            // Initially shows no value.
            expect(await findByTestId(testId)).toHaveTextContent('-');

            // The first value is our new min.
            testSensor.emit(id as SensorEvent, 42);
            expect(await findByTestId(testId)).toHaveTextContent('42');

            // Second value is bigger. The min value stays the same.
            testSensor.emit(id as SensorEvent, 43);
            expect(await findByTestId(testId)).toHaveTextContent('42');

            // Third value is a new min.
            testSensor.emit(id as SensorEvent, 41);
            expect(await findByTestId(testId)).toHaveTextContent('41');
        })

    it.each([
        ['temperature'],
        ['humidity']
    ])
        ('resets min and max when pressing reset %s button.', async (id: string) => {
            const { findByTestId, findByTitle } = render(<Climate sensor={testSensor} />);

            testSensor.emit(id as SensorEvent, 21);
            testSensor.emit(id as SensorEvent, 23);
            testSensor.emit(id as SensorEvent, 22);
            expect(await findByTestId(`${id}-max`)).toHaveTextContent('23');
            expect(await findByTestId(`${id}-min`)).toHaveTextContent('21');

            const titleGauge = await findByTitle(id);

            const button = await findByRole(titleGauge, 'button', { name: /reset/i });
            userEvent.click(button);

            expect(await findByTestId(`${id}-max`)).toHaveTextContent('22');
            expect(await findByTestId(`${id}-min`)).toHaveTextContent('22');

            testSensor.emit(id as SensorEvent, 23);
            testSensor.emit(id as SensorEvent, 21);
            expect(await findByTestId(`${id}-max`)).toHaveTextContent('23');
            expect(await findByTestId(`${id}-min`)).toHaveTextContent('21');
        })
});
