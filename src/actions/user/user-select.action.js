import {
    HTTP_SELECT_USER_SUCCESS,
    HTTP_SELECT_USER_CLEAR
} from 'constants/constants.utils'

export const setSelectUserSuccess = (payload) => ({
    type: HTTP_SELECT_USER_SUCCESS,
    payload
})

export const setClearSelectUser = () => ({
    type: HTTP_SELECT_USER_CLEAR,
})

