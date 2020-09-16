import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { returnConfirm } from "./confirmActions";
import {
  GET_NEWS_SUCCESS,
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAIL,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAIL,
  NEWS_LOADING,
  NEWS_LOADED,
  GET_SINGLE_NEWS_SUCCESS,
  GET_SINGLE_NEWS_FAIL,
  GET_NEWS_FAIL
} from "./types";

//   ******************
//   ** NEWS ACTIONS **
//   ******************

// GET ALL NEWS
export const getNews = () => async (dispatch, getState) => {
  try {
    dispatch(setNewsLoading());

    const stateBefore = getState();
    console.log(`-----------STATE BEFORE:`);
    console.log(stateBefore.news);

    const res = await axios.get("/api/news");
    console.log("NEWS ACTION getNews");
    console.log(res);
    console.log(res.data);
    dispatch({
      type: GET_NEWS_SUCCESS,
      payload: res.data,
    });

    const stateAfter = getState();
    console.log(`-----------STATE AFTER:`);
    console.log(stateAfter.news);

  } catch (err) {
    dispatch({
      type: GET_NEWS_FAIL,
    });
  }
};

export const setNewsLoading = () => {
  return {
    type: NEWS_LOADING,
  };
};

export const getSingleNews = (id) => async (dispatch) => {
  dispatch(setNewsLoading());
  try {
    const res = await axios.get(`/api/news/${id}`);
    dispatch({
      type: GET_SINGLE_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: GET_SINGLE_NEWS_FAIL,
    });
  }
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
    const res = await axios.post("/api/addNews", news, tokenConfig(getState));
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
