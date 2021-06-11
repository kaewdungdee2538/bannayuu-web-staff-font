import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_GET_COMPANY_ALL_FETCHING,
    HTTP_GET_COMPANY_ALL_SUCCESS,
    HTTP_GET_COMPANY_ALL_FAILED,
    HTTP_GET_COMPANY_ALL_CLEARSTORE,
    HTTP_GET_COMPANY_ALL_GETDATASUCCESS,
} from 'constants/constants.utils'
import {
    MESSAGE_COMPANYCODE_NOTFOUND,
    MESSAGE_COMPANYNAME_NOTFOUND,
    MESSAGE_PRICEOFCARDLOST_NOTFOUND,
    MESSAGE_NOTSELECT_PRO_COMPANY,
    MESSAGE_NOTSELECTIMAGE,
    MESSAGE_REMARKNOTFOUND
} from 'constants/message.constant'
import { MAIN_URL, GET_COMPANY_ALL_API, GET_COMPANY_BYID_API, EDIT_COMPANY_INFO_API } from 'constants/api-route'
import { httpClientGetMethodWithPost, httpClientPOSTMethodFormData } from 'utils/httpClient.utils'

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

export const setGetCompanyAllClearStore = () => ({
    type: HTTP_GET_COMPANY_ALL_CLEARSTORE
})

export const setGetCompanyAllGetDataSuccess = () => ({
    type: HTTP_GET_COMPANY_ALL_GETDATASUCCESS
})


export const GetCompanyAllAction = (history, credential, authStore) => {
    return async dispatch => {
        dispatch(setFetching());
        dispatch(setGetCompanyAllFetching());
        const urlClient = `${MAIN_URL}${GET_COMPANY_ALL_API}`
        const valuesObj = { ...credential }
        const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
        if (result.error) {
            dispatch(setFailed());
            dispatch(setGetCompanyFailed());
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

export async function GetCompanyByID(dispatch, credential, authStore) {
    dispatch(setFetching());
    const urlClient = `${MAIN_URL}${GET_COMPANY_BYID_API}`
    const valuesObj = { ...credential }
    const result = await httpClientGetMethodWithPost({ urlClient, valuesObj, authStore })
    if (result.error) {
        dispatch(setFailed());
    } else
        dispatch(setSuccess());
    return result;
}

export const EditCompanyAction = (history, credential, authStore) => {
    return async dispatch => {
        if (editCompanyMiddleware(credential)) {
            dispatch(setFetching());
            const urlClient = `${MAIN_URL}${EDIT_COMPANY_INFO_API}`
            const valuesObj = { ...credential }
            const result = await httpClientPOSTMethodFormData({ urlClient, valuesObj, authStore })
            if (result.error) {
                dispatch(setFailed());
                swal("Warning!", result.message, "warning");
            } else {
                swal("Success", result.message, "success")
                    .then(() => {
                        refreshPage();
                        dispatch(setSuccess());
                    });
            }
        }
    }
}

function editCompanyMiddleware(valuesObj) {
    console.log(valuesObj)
    if (!valuesObj.company_code) {
        swal("Warning!", MESSAGE_COMPANYCODE_NOTFOUND, "warning");
        return false;
    } else if (!valuesObj.company_name) {
        swal("Warning!", MESSAGE_COMPANYNAME_NOTFOUND, "warning");
        return false;
    } else if (!valuesObj.price_of_cardloss) {
        swal("Warning!", MESSAGE_PRICEOFCARDLOST_NOTFOUND, "warning");
        return false;
    } else if (!valuesObj.company_promotion) {
        swal("Warning!", MESSAGE_NOTSELECT_PRO_COMPANY, "warning");
        return false;
    } else if (!valuesObj.image) {
        swal("Warning!", MESSAGE_NOTSELECTIMAGE, "warning");
        return false;
    } else if (!valuesObj.remark) {
        swal("Warning!", MESSAGE_REMARKNOTFOUND, "warning");
        return false;
    }
    return true;
}

function refreshPage() {
    window.location.reload(false);
}