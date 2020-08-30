import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { returnConfirm } from "./confirmActions";
import {
  GET_NEWS,
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAIL,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAIL,
  NEWS_LOADING,
  NEWS_LOADED
} from "./types";

//   ******************
//   ** NEWS ACTIONS **
//   ******************

// GET ALL NEWS
export const getNews = () => (dispatch) => {
  dispatch(setNewsLoading());
  axios
    .get("/api/news")
    .then((res) =>
      dispatch({
        type: GET_NEWS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setNewsLoading = () => {
  return {
    type: NEWS_LOADING,
  };
};

// DELETE NEWS
export const deleteNews = (id) => async (dispatch, getState) => {
  dispatch({ type: NEWS_LOADING });
  try {
    const res = await axios.delete(
      `/api/news/delete/${id}`,
      tokenConfig(getState)
    );
    dispatch(returnConfirm(res.data.successMsg, res.status, "NEWS_DELETED"));
    dispatch({
      type: DELETE_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(
        error.response.data,
        error.response.status,
        "DELETE_NEWS_FAIL"
      )
    );
    dispatch({
      type: DELETE_NEWS_FAIL,
    });
  }
};

// UPLOAD NEWS
export const addNews = (news) => async (dispatch, getState) => {
    dispatch({ type: NEWS_LOADING });
  try {
    const res = await axios.post(
      "/api/image_upload",
      news,
      tokenConfig(getState)
    );
    console.log(res);
    dispatch({ type: NEWS_LOADED });
    dispatch(returnConfirm(res.data.successMsg, res.status, "NEWS_CREATED"));
    dispatch({
      type: ADD_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "ADD_NEWS_FAIL")
    );
    dispatch({
      type: ADD_NEWS_FAIL,
    });
  }
};
