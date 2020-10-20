import {
  FOLDERS_LOADING,
  GET_FOLDERS_SUCCESS,
  GET_FODLERS_FAIL,
  IMAGES_LOADING,
  GET_IMAGES_SUCCESS,
  GET_IMAGES_FAIL,
} from "../actions/types";

const initialState = {
  imgUrls: [],
  folders: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FOLDERS_SUCCESS:
      return {
        ...state,
        folders: action.payload,
        loading: false,
      };
    case GET_IMAGES_SUCCESS:
      return {
        ...state,
        imgUrls: action.payload,
        loading: false,
      };
    case FOLDERS_LOADING:
    case IMAGES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FODLERS_FAIL:
    case GET_IMAGES_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
