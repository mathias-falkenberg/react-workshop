import {
  SetTemperatureAction,
  SetHumidityAction,
  ResetTemperatureAction,
  ResetHumidityAction,
  createResetHumidityAction,
  createResetTemperatureAction,
  createSetHumidityAction,
  createSetTemperatureAction,
} from "../actions/actions";
import reducer, { ClimateState } from "./reducers";

const nullGauge = { value: Infinity, min: -Infinity, max: Infinity };

describe("climateReducer", () => {
  it.each([
    [
      {
        temperature: { value: 22, min: 20, max: 24 },
        humidity: nullGauge,
      },
      25,
      {
        temperature: { value: 25, min: 20, max: 25 },
        humidity: nullGauge,
      },
    ],
    [
      {
        temperature: { value: 20, min: 19, max: 21 },
        humidity: nullGauge,
      },
      18,
      {
        temperature: { value: 18, min: 18, max: 21 },
        humidity: nullGauge,
      },
    ],
  ])(
    "updates temperature correctly",
    (
      initialState: ClimateState,
      newValue: number,
      expectedState: ClimateState
    ) => {
      const action: SetTemperatureAction = createSetTemperatureAction(newValue);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    }
  );
  it.each([
    [
      {
        temperature: nullGauge,
        humidity: { value: 50, min: 40, max: 55 },
      },
      60,
      {
        temperature: nullGauge,
        humidity: { value: 60, min: 40, max: 60 },
      },
    ],
    [
      {
        temperature: nullGauge,
        humidity: { value: 67, min: 65, max: 71 },
      },
      64,
      {
        temperature: nullGauge,
        humidity: { value: 64, min: 64, max: 71 },
      },
    ],
  ])(
    "updates humidity correctly",
    (
      initialState: ClimateState,
      newValue: number,
      expectedState: ClimateState
    ) => {
      const action: SetHumidityAction = createSetHumidityAction(newValue);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    }
  );
  it("resets temperature correctly", () => {
    const initialState: ClimateState = {
      temperature: { value: 24, min: 18, max: 27 },
      humidity: nullGauge,
    };
    const action: ResetTemperatureAction = createResetTemperatureAction();

    const newState = reducer(initialState, action);

    const expectedState = {
      temperature: { value: 24, min: 24, max: 24 },
      humidity: nullGauge,
    };

    expect(newState).toEqual(expectedState);
  });
  it("resets humidity correctly", () => {
    const initialState: ClimateState = {
      temperature: nullGauge,
      humidity: { value: 66, min: 56, max: 70 },
    };
    const action: ResetHumidityAction = createResetHumidityAction();

    const newState = reducer(initialState, action);

    const expectedState = {
      temperature: nullGauge,
      humidity: { value: 66, min: 66, max: 66 },
    };

    expect(newState).toEqual(expectedState);
  });
});