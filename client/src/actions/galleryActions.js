import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { returnConfirm } from "./confirmActions";
import {
    FOLDERS_LOADING,
    GET_FOLDERS_SUCCESS,
    GET_FODLERS_FAIL,
    IMAGES_LOADING,
    GET_IMAGES_SUCCESS,
    GET_IMAGES_FAIL
} from "./types";


// GET ALL Folders from cloudinary
export const getFolders = () => async (dispatch, getState) => {
    try {
      dispatch(setFoldersLoading());
      const res = await axios.get("/api/images/all_folders");
      dispatch({
        type: GET_FOLDERS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_FODLERS_FAIL,
      });
    }
  };

  export const getImages = (album) => async (dispatch) => {
try {
      dispatch(setImagesLoading());
      const res = await axios.get(`/api/images/${album}`);
      dispatch({
        type: GET_IMAGES_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_IMAGES_FAIL,
      });
    }
  };
  
  export const setFoldersLoading = () => {
    return {
      type: FOLDERS_LOADING,
    };
  };

  export const setImagesLoading = () => {
    return {
      type: IMAGES_LOADING,
    };
  };
