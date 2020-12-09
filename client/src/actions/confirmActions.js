import { GET_CONFIRM, CLEAR_CONFIRM } from "./types";

export const returnConfirm = (successMsg, status, id = null) => {
  return {
    type: GET_CONFIRM,
    payload: { successMsg, status, id },
  };
};

export const clearConfirm = () => {
  return { type: CLEAR_CONFIRM };
};
