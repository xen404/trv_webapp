import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import userReducers from './userReducers';
import confirmReducer from './confirmReducer';
import appointmentReducers from './appointmentReducers';
 
export default combineReducers({
   news: newsReducer,
   error: errorReducer,
   auth: authReducer,
   users: userReducers,
   confirm: confirmReducer,
   appointments: appointmentReducers
});

export const customFilter = (item, id) => {
    if (item.id !== id){
        return true;
    } else {
        return false;
    }
}