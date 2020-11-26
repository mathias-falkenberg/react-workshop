import {
  ResetHumidityAction,
  ResetTemperatureAction,
  RESET_HUMIDITY,
  RESET_TEMPERATURE,
  SetHumidityAction,
  SetTemperatureAction,
  SET_HUMIDITY,
  SET_TEMPERATURE,
} from "../actions/actions";

export interface ClimateState {
  temperature: { value: number; min: number; max: number };
  humidity: { value: number; min: number; max: number };
}

type Action =
  | SetTemperatureAction
  | ResetTemperatureAction
  | SetHumidityAction
  | ResetHumidityAction;

const reducer = (state: ClimateState, action: Action) => {
  switch (action.type) {
    case SET_TEMPERATURE: {
      return {
        ...state,
        temperature: {
          value: action.payload,
          min: Math.min(state.temperature.min, action.payload),
          max: Math.max(state.temperature.max, action.payload),
        },
      };
    }
    case RESET_TEMPERATURE: {
      return {
        ...state,
        temperature: {
          ...state.temperature,
          min: state.temperature.value,
          max: state.temperature.value,
        },
      };
    }
    case SET_HUMIDITY: {
      return {
        ...state,
        humidity: {
          value: action.payload,
          min: Math.min(state.humidity.min, action.payload),
          max: Math.max(state.humidity.max, action.payload),
        },
      };
    }
    case RESET_HUMIDITY: {
      return {
        ...state,
        humidity: {
          ...state.humidity,
          min: state.humidity.value,
          max: state.humidity.value,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;