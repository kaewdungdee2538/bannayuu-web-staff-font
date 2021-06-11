import {
    HTTP_VILLAGER_SELECT_COMPANY_SUCCESS,
    HTTP_VILLAGER_CLEAR_COMPANY,
    CLEAR_VALUE_MESSAGE,
    SUCCESS_MESSAGE
} from 'constants/constants.utils'
const initialState = {
    result: null,
    isFetching: false,
    isError: false,
    message: null,
    isReady: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case HTTP_VILLAGER_SELECT_COMPANY_SUCCESS:
            return {
                result: payload,
                isFetching: false,
                isError: false,
                message: SUCCESS_MESSAGE,
                isReady: true
            }
        case HTTP_VILLAGER_CLEAR_COMPANY:
            return { ...initialState, message: CLEAR_VALUE_MESSAGE }
        default:
            return state
    }
}

