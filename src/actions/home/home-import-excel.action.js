import swal from 'sweetalert';
import {
    setFetching,
    setSuccess,
    setFailed,
} from 'actions/main/main.action'
import {
    HTTP_HOME_SELECT_COMPANY_SUCCESS,
    HTTP_HOME_CLEAR_COMPANY,
} from 'constants/constants.utils'

import { MAIN_URL, IMPORT_EXCEL_HOME_API } from 'constants/api-route'
import { httpClientPOSTMethodVerifyAuth } from 'utils/httpClient.utils'

export const setSelectCompanySuccess = (payload) => ({
    type: HTTP_HOME_SELECT_COMPANY_SUCCESS,
    payload
})

export const setClearSelectCompany = () => ({
    type: HTTP_HOME_CLEAR_COMPANY
})

export const ImportExcelHomeAction = (history, credential, authStore) => {
    return async dispatch => {
        dispatch(setFetching());
        const urlClient = `${MAIN_URL}${IMPORT_EXCEL_HOME_API}`
        const newCredential = { ...credential }
        const items = newCredential.data;
        const newItems = items.map(item => {
            return {
                home_address: item[0].value,
                remark: item[1].value
            }
        })
        const valuesObj = {
            company_id: newCredential.company_id,
            data: newItems
        }
        console.log(valuesObj);
        const result = await httpClientPOSTMethodVerifyAuth({ urlClient, valuesObj, authStore })
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

function refreshPage() {
    window.location.reload(false);
}