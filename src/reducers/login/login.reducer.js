import {
    HTTP_LOGIN_FETCHING,
    HTTP_LOGIN_SUCCESS,
    HTTP_LOGIN_FAILED,
    HTTP_LOGIN_CLEARVALUES,
    LOGIN_FAILED_MESSAGE,
    SUCCESS_MESSAGE
} from '../../constants/constants.utils'

const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    message: null
}

let globalState = {
    result: null,
    isFetching: false,
    isError: false,
    message: null
}

export default (state = initialState, { type, payload }) => {
    let localStr = null;
    let localStageReturn = state;
    switch (type) {
        case HTTP_LOGIN_FETCHING:
            return {
                result: null,
                isFetching: true,
                isError: false,
                message: null
            }
        case HTTP_LOGIN_SUCCESS:
            globalState = {
                result: payload,
                isFetching: false,
                isError: false,
                message: SUCCESS_MESSAGE,
            };
            localStorage.setItem('authStorage', JSON.stringify(globalState))
            return globalState
        case HTTP_LOGIN_FAILED:
            globalState = {
                result: null,
                isFetching: false,
                isError: true,
                message: LOGIN_FAILED_MESSAGE,
            };
            localStorage.setItem('authStorage', JSON.stringify(globalState))
            return globalState
        case HTTP_LOGIN_CLEARVALUES:
            localStorage.removeItem('authStorage')
            return {
                result: null,
                isFetching: false,
                isError: false,
                message: null,
            };
        default:
            localStr = localStorage.getItem('authStorage')
            localStageReturn = !localStr ? state : JSON.parse(localStr);
            return localStageReturn;
    }
}
