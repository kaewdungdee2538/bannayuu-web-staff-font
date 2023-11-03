import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_SLOT_MAX_SUCCESS,
    HTTP_GET_SLOT_MAX_CLEAR
} from 'constants/constants.utils'
import {
    MESSAGE_COMPANYID_NOTFOUND
} from 'constants/message.constant'
import { MAIN_URL, GET_SLOT_MAX_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'


export const setGetSlotMaxSuccess = (payload) => ({
    type: HTTP_GET_SLOT_MAX_SUCCESS,
    payload
})

export const setClearSlotMax = () => ({
    type: HTTP_GET_SLOT_MAX_CLEAR,
})

export const GetSlotMaxAction = (history, credential, authStore) => {
    return async dispatch => {
        if (getSlotNotUseMiddleware(history,credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_SLOT_MAX_API}`
            const valuesObj = { ...credential }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                if (result.result)
                    dispatch(setGetSlotMaxSuccess(result.result));
                else
                    dispatch(setClearSlotMax(null));
                dispatch(setSuccess());
            }
        }

    }
}

function getSlotNotUseMiddleware(history,valuesObj) {
    if (!valuesObj.company_id) {
        swal("Warning!", MESSAGE_COMPANYID_NOTFOUND, "warning");
        history.goBack();
    }
    return true
}