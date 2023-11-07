import { combineReducers } from "redux";
import loginReducer from 'reducers/login/login.reducer'
import logoutReducer from 'reducers/logout/logout.reducer'
import mainReducer from 'reducers/main/main.reducer'
import companySelectedReducer from 'reducers/company/company-selected.reducer'
import companyGetAllReducer from 'reducers/company/company-get-all.reducer'
import companyListGetAllReducer from 'reducers/company/company-list-get-all.recuder'
import homeImportExcelReducer from 'reducers/home/home-import-excel.reducer'
import homeGetAllReducer from 'reducers/home/home-get-all.reducer'
import villagerImportExcelReducer from 'reducers/villager/villager-import-excel.reducer'
import villagerGetAllReducer from 'reducers/villager/villager-get-all.reducer'
import privilegeGetAllReducer from 'reducers/privilege/privilege-get-all.reducer'
import userListGetAllReducer from 'reducers/user/user-list-get-all.reducer'
import userSelectReducer from 'reducers/user/user-select.reducer'
import slotMaxReducer from 'reducers/slot/slot-get-max.reducer'
import slotNotUseReducer from 'reducers/slot/slot-get-not-use.reducer'

export default combineReducers({
    loginReducer,
    logoutReducer,
    mainReducer,
    companySelectedReducer,
    companyGetAllReducer,
    companyListGetAllReducer,
    homeImportExcelReducer,
    homeGetAllReducer,
    villagerImportExcelReducer,
    villagerGetAllReducer,
    privilegeGetAllReducer,
    userListGetAllReducer,
    userSelectReducer,
    slotMaxReducer,
    slotNotUseReducer
})