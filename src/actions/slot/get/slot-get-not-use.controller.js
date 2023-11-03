import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_SLOT_SELECT_COMPANY_SUCCESS,
    HTTP_SLOT_SELECT_COMPANY_CLEAR,
    HTTP_GET_SLOT_NOTUSE_SUCCESS,
    HTTP_GET_SLOT_NOTUSE_CLEAR
} from 'constants/constants.utils'
import {
    MESSAGE_COMPANYID_NOTFOUND
} from 'constants/message.constant'
import { MAIN_URL, GET_SLOT_NOT_USE_API } from 'constants/api-route'
import { httpClientGetMethodWithPost } from 'utils/httpClient.utils'

export const setSlotSelectCompanySuccess = (payload) => ({
    type: HTTP_SLOT_SELECT_COMPANY_SUCCESS,
    payload
})

export const setSlotClearSelectCompany = () => ({
    type: HTTP_SLOT_SELECT_COMPANY_CLEAR
})


export const setGetSlotNotUseAllSuccess = (payload) => ({
    type: HTTP_GET_SLOT_NOTUSE_SUCCESS,
    payload
})

export const setClearSlotAll = () => ({
    type: HTTP_GET_SLOT_NOTUSE_CLEAR,
})

export const GetSlotNotUseAllAction = (history, credential, authStore) => {
    return async dispatch => {
        if (getSlotNotUseMiddleware(history,credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${GET_SLOT_NOT_USE_API}`
            const valuesObj = { ...credential }
            const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning").then(() => {
                    history.goBack();
                });
            } else {
                if (result.result)
                    dispatch(setGetSlotNotUseAllSuccess(result.result));
                else
                    dispatch(setClearSlotAll([]));
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