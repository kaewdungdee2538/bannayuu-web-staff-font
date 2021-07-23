import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_COMPANY_ALL_FETCHING,
    HTTP_GET_COMPANY_ALL_SUCCESS,
    HTTP_GET_COMPANY_ALL_FAILED
} from 'constants/constants.utils'

import { MAIN_URL, GET_COMPANY_ALL_AND_NOT_CIT_COMPANY_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'

export const setGetCompanyAllFetching = () => ({
    type: HTTP_GET_COMPANY_ALL_FETCHING
})

export const setGetCompanyAllSuccess = (payload) => ({
    type: HTTP_GET_COMPANY_ALL_SUCCESS,
    payload
})

export const setGetCompanyFailed = () => ({
    type: HTTP_GET_COMPANY_ALL_FAILED
})

export const GetCompanyListAndNotCitCompanyAllAction = (history, credential, authStore) => {
    return async dispatch => {
        dispatch(setFetching());
        const urlClient = `${MAIN_URL}${GET_COMPANY_ALL_AND_NOT_CIT_COMPANY_API}`
        const valuesObj = { ...credential }
        const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
        if (result.error) {
            dispatch(setFailed());
            swal("Warning!", result.message, "warning");
        } else {
            if (result.result)
                dispatch(setGetCompanyAllSuccess(result.result));
            else
                dispatch(setGetCompanyAllSuccess([]));
            dispatch(setSuccess());
        }
    }
}
