import { combineReducers } from "redux";
import loginReducer from './login/login.reducer'
import logoutReducer from './logout/logout.reducer'
import mainReducer from './main/main.reducer'
export default combineReducers({
    loginReducer,
    logoutReducer,
    mainReducer
})