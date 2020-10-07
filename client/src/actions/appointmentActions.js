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
    UPDATE_CARD_FAIL
} from "./types";


// GET ALL CARDS
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

  // UPLOAD CARD
export const reserveAppointment = (card) => async (dispatch, getState) => {
    dispatch({ type: CARDS_LOADING });
    console.log(card);
    try {
      const res = await axios.post("/api/appointments", card);

        console.log("HEY THIS IS TEST REQ")
        console.log(res.data);

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
  
  // UPDATE CARD
  export const updateAppointment = (card) => async (dispatch, getState) => {
    dispatch({ type: CARDS_LOADING });
    console.log(card);
    try {
      const res = await axios.put("/api/appointments", card);

        console.log("HEY THIS IS TEST REQ")
        console.log(res.data);

      dispatch(returnConfirm(res.data.successMsg, res.status, "CARD_UPDATED"));
      dispatch({
        type: UPDATE_CARD_SUCCESS,
        payload: res.data,
      });
      
     dispatch(getAppointmentCards());
    } catch (error) {
      dispatch(
        returnErrors(error.response.data, error.response.status, "UPDATE_CARD_FAIL")
      );
      dispatch({
        type: UPDATE_CARD_FAIL,
      });
    }
  };
  