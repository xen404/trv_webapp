import { GET_CONFIRM, CLEAR_CONFIRM } from "../actions/types";

const initialState = {
  successMsg: {},
  status: null,
  id: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONFIRM:
      return {
        successMsg: action.payload.successMsg,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_CONFIRM:
      return {
        successMsg: {},
        status: null,
        id: null,
      };
    default:
      return state;
  }
}
