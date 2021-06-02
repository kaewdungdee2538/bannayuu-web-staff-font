import { combineReducers } from "redux";
import loginReducer from 'reducers/login/login.reducer'
import logoutReducer from 'reducers/logout/logout.reducer'
import mainReducer from 'reducers/main/main.reducer'
import companyGetAllReducer from 'reducers/company/company-get-all.reducer'
export default combineReducers({
    loginReducer,
    logoutReducer,
    mainReducer,
    companyGetAllReducer
})