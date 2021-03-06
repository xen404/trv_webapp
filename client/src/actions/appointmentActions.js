import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { returnConfirm } from "./confirmActions";
import {
  CARDS_LOADING,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAIL,
  UPDATE_CALENDAR_SUCCESS,
  UPDATE_CALENDAR_FAIL,
} from "./types";

export const getAppointmentCards = () => async (dispatch, getState) => {
  try {
    dispatch(setCardsLoading());
    const res = await axios.get("/api/appointments");
    dispatch({
      type: GET_CARDS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CARDS_FAIL,
    });
  }
};

export const setCardsLoading = () => {
  return {
    type: CARDS_LOADING,
  };
};

export const reserveAppointment = (card) => async (dispatch, getState) => {
  dispatch({ type: CARDS_LOADING });
  try {
    const res = await axios.post(
      "/api/appointments",
      card,
      tokenConfig(getState)
    );

    dispatch(returnConfirm(res.data.successMsg, res.status, "CARD_CREATED"));
    dispatch({
      type: ADD_CARD_SUCCESS,
      payload: res.data,
    });

    dispatch(getAppointmentCards());
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "ADD_CARD_FAIL")
    );
    dispatch({
      type: ADD_CARD_FAIL,
    });
  }
};

export const updateAppointment = (card) => async (dispatch, getState) => {
  dispatch({ type: CARDS_LOADING });
  try {
    const res = await axios.put(
      "/api/appointments",
      card,
      tokenConfig(getState)
    );

    dispatch(returnConfirm(res.data.successMsg, res.status, "CARD_UPDATED"));
    dispatch({
      type: UPDATE_CARD_SUCCESS,
      payload: res.data,
    });

    dispatch(getAppointmentCards());
  } catch (error) {
    dispatch(
      returnErrors(
        error.response.data,
        error.response.status,
        "UPDATE_CARD_FAIL"
      )
    );
    dispatch({
      type: UPDATE_CARD_FAIL,
    });
  }
};

// Update table responsible for rowing days settings
export const updateCalendar = (calendar) => async (dispatch, getState) => {
  dispatch({ type: CARDS_LOADING });
  try {
    const res = await axios.put(
      "/api/rowingdays",
      calendar,
      tokenConfig(getState)
    );

    dispatch(
      returnConfirm(res.data.successMsg, res.status, "CALENDAR_UPDATED")
    );
    dispatch({
      type: UPDATE_CALENDAR_SUCCESS,
      payload: res.data,
    });

    dispatch(getAppointmentCards());
  } catch (error) {
    dispatch(
      returnErrors(
        error.response.data,
        error.response.status,
        "UPDATE_CALENDAR_FAIL"
      )
    );
    dispatch({
      type: UPDATE_CALENDAR_FAIL,
    });
  }
};
