import {
    HTTP_LOGOUT_FETCHING,
    HTTP_LOGOUT_SUCCESS,
    SUCCESS_MESSAGE
} from '../../constants/constants.utils'

const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    message: null
}

export default (state = initialState, { type }) => {
    switch (type) {
        case HTTP_LOGOUT_FETCHING:
            return {
                result: null,
                isFetching: true,
                isError: false,
                message: null
            }
        case HTTP_LOGOUT_SUCCESS:
            localStorage.setItem('authStorage', null)
            return {
                result: SUCCESS_MESSAGE,
                isFetching: false,
                isError: false,
                message: SUCCESS_MESSAGE
            }
        default:
            return state
    }
}
