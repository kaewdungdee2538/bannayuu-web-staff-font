import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_COMPANY_LIST_ALL_SUCCESS,
    HTTP_GET_COMPANY_LIST_CLEAR
} from 'constants/constants.utils'

import { MAIN_URL, GET_COMPANY_LIST_ALL_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'


export const setGetCompanyListAllSuccess = (payload) => ({
    type: HTTP_GET_COMPANY_LIST_ALL_SUCCESS,
    payload
})

export const setClearCompanyListAll = () => ({
    type: HTTP_GET_COMPANY_LIST_CLEAR,
})

export const GetCompanyListAllAction = (history,  authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_COMPANY_LIST_ALL_API}`
            const valuesObj = { }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                if (result.result)
                    dispatch(setGetCompanyListAllSuccess(result.result));
                else
                    dispatch(setGetCompanyListAllSuccess([]));
                dispatch(setSuccess());
            }
    }
}
