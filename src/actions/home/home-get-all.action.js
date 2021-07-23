import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_HOME_ALL_SUCCESS,
    HTTP_GET_HOME_CLEAR
} from 'constants/constants.utils'
import {
    MESSAGE_COMPANYID_NOTFOUND
} from 'constants/message.constant'
import { MAIN_URL, GET_HOME_ALL_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'


export const setGetHomeAllSuccess = (payload) => ({
    type: HTTP_GET_HOME_ALL_SUCCESS,
    payload
})

export const setClearHomeAll = () => ({
    type: HTTP_GET_HOME_CLEAR,
})

export const GetHomeAllAction = (history, credential, authStore) => {
    return async dispatch => {
        if (getHomeMiddleware(history,credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_HOME_ALL_API}`
            const valuesObj = { ...credential }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                if (result.result)
                    dispatch(setGetHomeAllSuccess(result.result));
                else
                    dispatch(setGetHomeAllSuccess([]));
                dispatch(setSuccess());
            }
        }

    }
}

function getHomeMiddleware(history,valuesObj) {
    if (!valuesObj.company_id) {
        swal("Warning!", MESSAGE_COMPANYID_NOTFOUND, "warning");
        history.goBack();
    }
    return true
}