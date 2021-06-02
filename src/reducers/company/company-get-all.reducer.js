import {
    HTTP_GET_COMPANY_ALL_FETCHING,
    HTTP_GET_COMPANY_ALL_SUCCESS,
    HTTP_GET_COMPANY_ALL_FAILED,
    HTTP_GET_COMPANY_ALL_CLEARSTORE,
    HTTP_GET_COMPANY_ALL_GETDATASUCCESS,
    SUCCESS_MESSAGE,
    CLEAR_VALUE_MESSAGE,
    GET_DATA_SUCCESSFULLY
} from 'constants/constants.utils'
import {
    MESSAGE_GET_COMPANY_ALL_FAILED,

} from 'constants/message.constant'
const initialState = {
    result: [],
    isFetching: false,
    isError: false,
    message: null,
    isReady: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case HTTP_GET_COMPANY_ALL_FETCHING:
            return {
                result: [],
                isFetching: true,
                isError: false,
                message: null,
                isReady: false
            }
        case HTTP_GET_COMPANY_ALL_SUCCESS:
            return {
                result: payload,
                isFetching: false,
                isError: false,
                message: SUCCESS_MESSAGE,
                isReady: true
            }
        case HTTP_GET_COMPANY_ALL_FAILED:
            return {
                result: [],
                isFetching: false,
                isError: true,
                message: MESSAGE_GET_COMPANY_ALL_FAILED,
                isReady: false
            }
        case HTTP_GET_COMPANY_ALL_CLEARSTORE:
            return {
                result: [],
                isFetching: false,
                isError: false,
                message: CLEAR_VALUE_MESSAGE,
                isReady:false
            }
        case HTTP_GET_COMPANY_ALL_GETDATASUCCESS:
            return {
                result: [],
                isFetching: false,
                isError: false,
                message: GET_DATA_SUCCESSFULLY,
                isReady:false
            }
        default:
            return state
    }
}
