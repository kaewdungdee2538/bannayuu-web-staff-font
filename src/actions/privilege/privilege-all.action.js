import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_PRIVILEGE_ALL_SUCCESS,
    HTTP_GET_PRIVILEGE_CLEAR
} from 'constants/constants.utils'

import { MAIN_URL, GET_PRIVILEGE_ALL_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'


export const setGetPrivilegeAllSuccess = (payload) => ({
    type: HTTP_GET_PRIVILEGE_ALL_SUCCESS,
    payload
})

export const setClearPrivilegeAll = () => ({
    type: HTTP_GET_PRIVILEGE_CLEAR,
})

export const GetPrivilegeAllAction = (history,  authStore) => {
    return async dispatch => {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_PRIVILEGE_ALL_API}`
            const valuesObj = { }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                console.log(result)
                if (result.result)
                    dispatch(setGetPrivilegeAllSuccess(result.result));
                else
                    dispatch(setGetPrivilegeAllSuccess([]));
                dispatch(setSuccess());
            }
    }
}
