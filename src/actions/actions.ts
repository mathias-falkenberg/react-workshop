export const SET_TEMPERATURE = "SET_TEMPERATURE";
export const RESET_TEMPERATURE = "RESET_TEMPERATURE";
export const SET_HUMIDITY = "SET_HUMIDITY";
export const RESET_HUMIDITY = "RESET_HUMIDITY";

export interface SetTemperatureAction {
  type: typeof SET_TEMPERATURE;
  payload: number;
}

export interface ResetTemperatureAction {
  type: typeof RESET_TEMPERATURE;
}

export interface SetHumidityAction {
  type: typeof SET_HUMIDITY;
  payload: number;
}

export interface ResetHumidityAction {
  type: typeof RESET_HUMIDITY;
}

export const createSetTemperatureAction = (payload: number): SetTemperatureAction => {
  return { type: SET_TEMPERATURE, payload };
};

export const createResetTemperatureAction = (): ResetTemperatureAction => {
  return { type: RESET_TEMPERATURE };
};

export const createSetHumidityAction = (payload: number): SetHumidityAction => {
  return { type: SET_HUMIDITY, payload };
};

export const createResetHumidityAction = (): ResetHumidityAction => {
  return { type: RESET_HUMIDITY };
};
