import {
  GET_ALL_USERS,
  USERS_LOADING,
  REGISTER_NEW_USER_SUCCESS,
  REGISTER_NEW_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
} from "../actions/types";

const initialState = {
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USERS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };

    case REGISTER_NEW_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload.user, ...state.users],
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
      };
    case REGISTER_NEW_USER_FAIL:
    case DELETE_USER_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
