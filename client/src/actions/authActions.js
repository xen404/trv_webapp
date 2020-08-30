import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

//   ******************
//   ** AUTH ACTIONS **
//   ******************

// CHECK TOKEN AND LOAD USER
export const loadUser = () => async (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });
  
    try {
      const res = await axios.get("/api/auth/user", tokenConfig(getState));
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
  
  
  
  // REGISTER USER
  export const register = ({ name, email, password, role }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    const body = JSON.stringify({ name, email, password, role });
    try {
      const res = await axios.post("/api/new_user", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(
        returnErrors(error.response.data, error.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
  
  // LOGIN USER
  export const login = ({ email, password }) => async (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
  
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch(
        returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
  
  // LOGOUT USER
  export const logout = () => {
    return {
      type: LOGOUT_SUCCESS,
    };
  };
  
  export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;
    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  };
  