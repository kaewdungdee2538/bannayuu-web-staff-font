
// export const MAIN_URL = `${window.origin}/bannayuu/admin/api/v1` // production
// export const MAIN_URL = 'https://api-corporate-demo.bannayuu.com/cit_staff/bannayuu/admin/api/v1' // demo
// export const MAIN_URL = 'http://127.0.0.1:4501/bannayuu/admin/api/v1' // test
export var MAIN_URL = `${process.env.REACT_APP_API_BASE_URL}` // env

// export const WEB_USER_MANAGEMENT_RESET_PASSWORD_URL = 'https://web_management_demo.bannayuu.com/reset' // production
// export const WEB_USER_MANAGEMENT_RESET_PASSWORD_URL = 'https://web_management_demo.bannayuu.com/reset' // demo
export const WEB_USER_MANAGEMENT_RESET_PASSWORD_URL = `${process.env.REACT_APP_WEB_MANAGEMENT_PASSWORD_RESET_URL}` // env

export const LOGIN_API = '/authen/login'
export const CREATE_COMPANY_API = '/company/add'
export const GET_COMPANY_ALL_API = '/company/get-all'
export const GET_COMPANY_ALL_AND_NOT_CIT_COMPANY_API = '/company/get-companylist-all-not-cit-company'
export const GET_COMPANY_BYID_API = '/company/get-by-id'
export const EDIT_COMPANY_INFO_API = '/company/edit-info'
export const DISABLE_COMPANY_API = '/company/disable'
export const ENABLE_COMPANY_API = '/company/enable'
export const GET_COMPANY_LIST_ALL_API = '/company/get-companylist-all'
export const IMPORT_EXCEL_HOME_API = '/home/import-array'
export const GET_HOME_ALL_API = '/home/get-all'
export const IMPORT_EXCEL_VILLAGER_API = '/villager/import-array'
export const GET_VILLAGER_ALL_API = '/villager/get-all'
export const GET_PRIVILEGE_ALL_API = '/user/get-privilege'
export const CREATE_USER_API = '/user/create-user'
export const GET_USER_LIST_ALL_API = '/user/get-user'
export const GET_USER_IS_BELOW_MYSELF_ALL_API = '/user/get-user-is-below-myself'
export const GET_USER_BYID_API = '/user/get-userinfo-byid'
export const EDIT_USER_INFO_API = '/user/edit-userinfo'
export const RESET_PASSWORD_USER_API = '/user/reset-password'
export const CHANGE_PRIVILEGE_USER_API = '/user/change-privilege'
export const ADD_OR_DELETE_COMPANY_LIST_USER_API = '/user/addordelete-company-list'
export const CHANGE_MAIN_COMPANY_USER_API = '/user/change-main-company'
export const GET_SLOT_NOT_USE_API = '/slot/get/not-use'
export const GET_SLOT_MAX_API = '/slot/get/max'
export const ADD_SLOT_MANUAL_API = '/slot/add/manual'
export const DISABLE_VILLAGER_API = '/villager/disable'
export const ENABLE_VILLAGER_API = '/villager/enable'