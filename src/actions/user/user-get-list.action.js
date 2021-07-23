import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_USER_LIST_ALL_SUCCESS,
    HTTP_GET_USER_LIST_CLEAR
} from 'constants/constants.utils'

import { MAIN_URL, GET_USER_IS_BELOW_MYSELF_ALL_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'


export const setGetUserListAllSuccess = (payload) => ({
    type: HTTP_GET_USER_LIST_ALL_SUCCESS,
    payload
})

export const setClearUserListAll = () => ({
    type: HTTP_GET_USER_LIST_CLEAR,
})

export const GetCompanyListAllAction = (history,credential,  authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_USER_IS_BELOW_MYSELF_ALL_API}`
            const valuesObj = { ...credential }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                if (result.result)
                    dispatch(setGetUserListAllSuccess(result.result));
                else
                    dispatch(setGetUserListAllSuccess([]));
                dispatch(setSuccess());
            }
    }
}
