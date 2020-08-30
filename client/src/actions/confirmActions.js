import axios from "axios";
import {

  GET_CONFIRM,
  CLEAR_CONFIRM,
} from "./types";

//   *********************
//   ** CONFIRM ACTIONS **
//   *********************

// RETURN CONFIRM
export const returnConfirm = (successMsg, status, id = null) => {
    return {
      type: GET_CONFIRM,
      payload: { successMsg, status, id },
    };
  };
  
  // CLEAR CONFIRM
  export const clearConfirm = () => {
    return { type: CLEAR_CONFIRM };
  };
