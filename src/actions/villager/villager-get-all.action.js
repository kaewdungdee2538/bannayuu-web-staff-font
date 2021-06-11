import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_VILLAGER_ALL_SUCCESS,
    HTTP_GET_VILLAGER_CLEAR
} from 'constants/constants.utils'
import {
    MESSAGE_COMPANYID_NOTFOUND
} from 'constants/message.constant'
import { MAIN_URL, GET_VILLAGER_ALL_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'


export const setGetVillagerAllSuccess = (payload) => ({
    type: HTTP_GET_VILLAGER_ALL_SUCCESS,
    payload
})

export const setClearVillagerAll = () => ({
    type: HTTP_GET_VILLAGER_CLEAR,
})

export const GetVillagerAllAction = (history, credential, authStore) => {
    return async dispatch => {
        if (getVillagerMiddleware(history,credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_VILLAGER_ALL_API}`
            const valuesObj = { ...credential }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                console.log(result)
                if (result.result)
                    dispatch(setGetVillagerAllSuccess(result.result));
                else
                    dispatch(setGetVillagerAllSuccess([]));
                dispatch(setSuccess());
            }
        }

    }
}

function getVillagerMiddleware(history,valuesObj) {
    if (!valuesObj.company_id) {
        swal("Warning!", MESSAGE_COMPANYID_NOTFOUND, "warning");
        history.goBack();
    }
    return true
}