import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducers from './userReducers';
import confirmReducer from './confirmReducer';
 
export default combineReducers({
   news: newsReducer,
   error: errorReducer,
   auth: authReducer,
   users: userReducers,
   confirm: confirmReducer
});

export const customFilter = (item, id) => {
    if (item.id !== id){
        return true;
    } else {
        return false;
    }
}