import {
  CARDS_LOADING,
  GET_CARDS_SUCCESS,
  GET_CARDS_FAIL,
  ADD_CARD_SUCCESS,
  ADD_CARD_FAIL,
  UPDATE_CARD_SUCCESS,
  UPDATE_CARD_FAIL,
} from "../actions/types";

const initialState = {
  cards: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload,
        loading: false,
      };

    case ADD_CARD_SUCCESS:
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        cards: [...state.cards],
      };

    case CARDS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_CARDS_FAIL:
    case ADD_CARD_FAIL:
    case UPDATE_CARD_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
