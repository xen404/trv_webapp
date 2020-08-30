import { customFilter } from "./index";
import {
  GET_NEWS,
  DELETE_NEWS,
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAIL,
  NEWS_LOADING,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAIL,
  NEWS_LOADED,
} from "../actions/types";

const initialState = {
  news: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NEWS:
      return {
        ...state,
        news: action.payload,
        loading: false,
      };
    case DELETE_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.filter((news) =>
          customFilter(news, action.payload.newsId)
        ),
      };
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        news: [action.payload, ...state.news],
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
    case DELETE_NEWS_FAIL:
    case ADD_NEWS_FAIL:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
