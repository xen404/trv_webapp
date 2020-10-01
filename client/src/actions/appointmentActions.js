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
} from "./types";


// GET ALL NEWS
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
  
