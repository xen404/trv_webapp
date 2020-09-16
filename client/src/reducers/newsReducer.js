import { customFilter } from "./index";
import {
  GET_NEWS_SUCCESS,
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAIL,
  NEWS_LOADING,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAIL,
  NEWS_LOADED,
  GET_SINGLE_NEWS_SUCCESS,
  GET_SINGLE_NEWS_FAIL,
  GET_NEWS_FAIL,
} from "../actions/types";

const initialState = {
  news: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEWS_SUCCESS:
    case GET_SINGLE_NEWS_SUCCESS:
      console.log("REDUCER");
      console.log(action.payload);
      return {
        ...state,
        news: action.payload,
        loading: false,
      };
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: state.news.filter((news) =>
          customFilter(news, action.payload.newsId)
        ),
      };
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        news: [action.payload.news, ...state.news],
      };

    case NEWS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case NEWS_LOADED:
      return {
        ...state,
        loading: false,
      };
    case GET_NEWS_FAIL:
    case DELETE_NEWS_FAIL:
    case ADD_NEWS_FAIL:
    case GET_SINGLE_NEWS_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
