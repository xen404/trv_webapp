import axios from "axios";
import { returnErrors } from "./errorActions";
import { returnConfirm } from "./confirmActions";
import { tokenConfig } from "./authActions";

import {
  GET_ALL_USERS,
  USERS_LOADING,
  REGISTER_NEW_USER_SUCCESS,
  REGISTER_NEW_USER_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from "./types";

//   ******************
//   ** USER ACTIONS **
//   ******************

// GET ALL USERS
export const getAllUsers = () => (dispatch) => {
  dispatch({ type: USERS_LOADING });
  axios
    .get("/api/users")
    .then((res) =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// REGISTER NEW USER
export const registerNewUser = ({ name, email, password, role }) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password, role });
  try {
    const res = await axios.post("/api/new_user_reg", body, config);
    dispatch(returnConfirm(res.data.successMsg, res.status, "USER_CREATED"));
    dispatch({
      type: REGISTER_NEW_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(
        error.response.data,
        error.response.status,
        "REGISTER_NEW_USER_FAIL"
      )
    );
    dispatch({
      type: REGISTER_NEW_USER_FAIL,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(
      `/api/user/delete/${id}`,
      tokenConfig(getState)
    );
    dispatch(returnConfirm(res.data.successMsg, res.status, "USER_DELETED"));
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(
        error.response.data,
        error.response.status,
        "DELETE_USER_FAIL"
      )
    );
    dispatch({
      type: DELETE_USER_FAIL,
    });
  }
};
