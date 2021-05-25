import {
    HTTP_FETCHING,
    HTTP_SUCCESS,
    HTTP_FAILED,
    SUCCESS_MESSAGE,
    FAILED_MESSAGE,
} from '../../constants/constants.utils'

const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    message: null
}

export default (state = initialState, { type }) => {
    switch (type) {
        case HTTP_FETCHING:
            return {
                result: null,
                isFetching: true,
                isError: false,
                message: null
            }
        case HTTP_SUCCESS:
            return {
                result: null,
                isFetching: false,
                isError: false,
                message: SUCCESS_MESSAGE
            }
        case HTTP_FAILED:
            return {
                result: null,
                isFetching: false,
                isError: false,
                message: FAILED_MESSAGE
            }
        default:
            return state
    }
}
