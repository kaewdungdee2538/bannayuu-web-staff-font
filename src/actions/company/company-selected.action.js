import {
    HTTP_SELECT_COMPANY_SUCCESS,
    HTTP_SELECT_COMPANY_CLEAR
} from 'constants/constants.utils'

export const setSelectCompanySuccess = (payload) => ({
    type: HTTP_SELECT_COMPANY_SUCCESS,
    payload
})

export const setClearSelectCompany = () => ({
    type: HTTP_SELECT_COMPANY_CLEAR,
})

