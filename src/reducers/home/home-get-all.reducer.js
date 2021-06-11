import {
    HTTP_GET_HOME_ALL_SUCCESS,
    HTTP_GET_HOME_CLEAR,
    CLEAR_VALUE_MESSAGE,
    SUCCESS_MESSAGE
} from 'constants/constants.utils'
const initialState = {
    result: [],
    isFetching: false,
    isError: false,
    message: null,
    isReady: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case HTTP_GET_HOME_ALL_SUCCESS:
            return {
                result: payload,
                isFetching: false,
                isError: false,
                message: SUCCESS_MESSAGE,
                isReady: true
            }
        case HTTP_GET_HOME_CLEAR:
            return { ...initialState, message: CLEAR_VALUE_MESSAGE }
        default:
            return state
    }
}
